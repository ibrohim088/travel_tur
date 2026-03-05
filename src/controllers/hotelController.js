import Hotel from '../schema/Hotel.js'

const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()

    if (!hotels) {
      return res.status(404).json({ msg: 'Hotels not found!' })
    }

    res.status(200).json(hotels)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getOneHotel = async (req, res) => {
  try {
    const { id } = req.paramas
    const findOneHotel = await Hotel.findById(id)

    if (!findOneHotel) {
      return res.status(404).json({ msg: 'Hotel not found' })
    }

    res.status(200).json(findOneHotel)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const createHotel = async (req, res) => {
  try {
    const newHotel = new Hotel(req.body)
    await newHotel.save()

    res.status(201).json({ msg: "Successfuly created Hotel!", data: newHotel })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const updateHotel = async (req, res) => {
  try {
    const { id } = req.params

    const updateHotel = await Hotel.findByIdAndUpdate(id, req.body)

    if (!updateHotel) {
      return res.status(404).json({ msg: "Hotel not found" })
    }

    res.status(201).json(updateHotel)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deleteHotel = async (req, res) => {
  try {
    const { id } = req.pramas
    const deletedHotel = await Hotel.findByIdAndDelete(id)

    if (!deletedHotel) {
      return res.status(404).json({ msg: "Hotel not found" })
    }

    res.status(200).json({ msg: "Successfuly delete Hotel" })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}


export { getAllHotels, getOneHotel, createHotel, updateHotel, deleteHotel }