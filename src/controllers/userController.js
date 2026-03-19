import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../schema/User.js'
import config from '../shared/config.js'
import generateToken from '../utilities/createToken.js'

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')

    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({ msg: e.message })
  }
}

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params
    const findOneUser = await User.findById(id).select('-password')

    if (!findOneUser) {
      return res.status(404).json({ msg: 'User not found' })
    }

    res.status(200).json(findOneUser)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const registerUserOrAdmin = async (req, res) => {
  try {
    const { name, lastname, password, phone, email, role, walletBalance } = req.body

    if (![name, lastname, password, phone, email].every(Boolean)) {
      return res.status(400).json({ msg: 'Required fields missing' })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({ msg: 'User alredy exist' })
    }

    const hashedPass = await bcrypt.hash(password, 10)

    const payload = {
      name,
      lastname,
      password: hashedPass,
      phone,
      email,
      walletBalance
    }

    if (role) payload.role = role
    if (role === "admin") {
      payload.permissions = {
        watchAllUsers: true,
        finance: true,
        report: true,
        tourPackage: true,
        hotels: true,
        bookings: true
      };
    }

    const createdUser = await User.create(payload)
    const token = generateToken(createdUser)

    const { password: _, ...userWithoutPassword } = createdUser.toObject()

    res.status(201).json({
      token,
      user: userWithoutPassword,
      msg: "Successfully registered!"
    });
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const logInUserOrAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!password || (!email)) {
      return res.status(400).json({ msg: 'Email/phone and password are required' })
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credetionals' })
    }

    const token = jwt.sign({ id: user._id, email: user.email, user: user.role }, config.JWT_SECRET, { expiresIn: '30d' })

    const { password: _, ...userWithoutPassword } = user.toObject()
    res.status(201).json({ token, user: userWithoutPassword })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const updateUserOrAdmin = async (req, res) => {
  try {
    const { id } = req.params
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true }).select('-password')

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" })
    }

    res.status(200).json({ data: updatedUser })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deleteUserOrAdmin = async (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(404).json({ msg: 'User not found' })
    }

    res.json({ success: true, deletedUser });
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

// ? PERMISSIONS - ==================================================================================
// ? PERMISSIONS - ==================================================================================

const VALID_PERMISSIONS = ['watchAllUsers', 'tourPackage', 'hotels', 'bookings']

const getAllUsersPermissions = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({ total: users.length, users })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getUserPermissions = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ msg: 'User not found' })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const updateUserPermissions = async (req, res) => {
  try {
    const { permissions } = req.body

    if (!permissions || typeof permissions !== 'object') {
      return res.status(400).json({ msg: 'permissions obyekti yuborilishi shart' })
    }

    const invalidKeys = Object.keys(permissions).filter((key) => !VALID_PERMISSIONS.includes(key))

    if (invalidKeys.length > 0) {
      return res.status(400).json({
        msg: `Noto'g'ri kalit(lar): ${invalidKeys.join(', ')}`,
        validKeys: VALID_PERMISSIONS,
      })
    }

    const updateFields = {}
    Object.keys(permissions).forEach((key) => {
      updateFields[`permissions.${key}`] = permissions[key]
    })

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    )

    if (!user) return res.status(404).json({ msg: 'User not found' })
    res.status(200).json({ msg: 'Permissionlar yangilandi', user })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const revokeAllPermissions = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          'permissions.watchAllUsers': false,
          'permissions.tourPackage': false,
          'permissions.hotels': false,
          'permissions.bookings': false,
        },
      },
      { new: true }
    )

    if (!user) return res.status(404).json({ msg: 'User not found' })
    res.status(200).json({ msg: 'Barcha permissionlar olib tashlandi', user })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export {
  getAllUsers,
  getOneUser,
  registerUserOrAdmin,
  logInUserOrAdmin,
  updateUserOrAdmin,
  deleteUserOrAdmin,
  getAllUsersPermissions,
  getUserPermissions,
  updateUserPermissions,
  revokeAllPermissions,
}