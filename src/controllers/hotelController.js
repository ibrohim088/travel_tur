// import Hotel from '../schema/Hotel.js'
import { read, write } from '../io/index.js'

const getAllHotels = async (req, res) => {
  try {
    // const hotels = await User.find()

    const hotels = await read('hotels.json')

    res.status(200).json(hotels)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getOneHotel = async (req, res) => {
  try {
    const hotelId = req.paramas.id
    // const findOneHotel = await User.findById(id)

    const hotels = await read('hotels.json')

    const findOneHotel = hotels.find(hotel => hotel.hotelId === hotelId)

    if (!findOneHotel) {
      return res.status(404).json({ msg: 'Hotel not found' })
    }


    res.status(200).json(findOneHotel)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export { getAllHotels, getOneHotel }