import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../schema/User.js'
import config from '../shared/config.js'
import generateToken from '../utilities/createToken.js'

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({ msg: e.message })
  }
}

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params
    const findOneUser = await User.findById(id)

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
    const { name, lastname, password, phone, email, role } = req.body

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
    }

    if (role) payload.role = role
    if (role === "admin") {
      payload.permissions = { watchAllUsers: true, finance: true, report: true, tourPackage: true, };
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
    const { email, phone, password } = req.body

    if (!password || (!email && !phone)) {
      return res.status(400).json({ msg: 'Email/phone and password are required' })
    }

    const query = email ? { email } : { phone }
    const user = await User.findOne(query)

    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credetionals' })
    }

    const token = jwt.sign({ id: user._id, email: user.email }, config.JWT_SECRET, { expiresIn: '30d' })

    const { password: _, ...userWithoutPassword } = user.toObject()
    res.status(201).json({ token, user: userWithoutPassword })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const updateUserOrAdmin = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }

    user.set(req.body)
    const updatedUser = await user.save()

    res.status(201).json({ data: updatedUser })
  } catch (error) {

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

export {
  getAllUsers,
  getOneUser,
  registerUserOrAdmin,
  logInUserOrAdmin,
  updateUserOrAdmin,
  deleteUserOrAdmin,
}