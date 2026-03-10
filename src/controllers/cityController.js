import City from '../schema/City.js'
import Country from '../schema/Country.js'

const getAllCity = async (req, res) => {
  try {
    const cities = await City.find().populate('hotels');

    res.status(200).json(cities)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getOneCity = async (req, res) => {
  try {
    const { id } = req.params
    const city = await City.findById(id).populate('hotels');

    if (!city) return res.status(404).json({ msg: "City not found" })
    res.status(200).json(city)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const createNewCity = async (req, res) => {
  try {
    const newCity = new City(req.body)
    await newCity.save()

    if (req.body.countryId) {
      await Country.findByIdAndUpdate(
        req.body.countryId,
        { $push: { regions: newCity._id } }
      )
    }

    res.status(201).json({ msg: "Successfuly created city", data: newCity })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const updateCity = async (req, res) => {
  try {
    const { id } = req.params

    const findUpdateCity = await City.findByIdAndUpdate(id, req.body)

    if (!findUpdateCity) {
      return res.status(404).json({ msg: "City not found" })
    }

    res.status(201).json(findUpdateCity)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deleteCity = async (req, res) => {
  try {
    const { id } = req.params
    const deletedCity = await City.findByIdAndDelete(id)

    if (!deletedCity) {
      return res.status(404).json({ msg: "City not found" })
    }

    res.status(200).json({ msg: "Successfuly delete City" })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export { getAllCity, getOneCity, createNewCity, updateCity, deleteCity, }