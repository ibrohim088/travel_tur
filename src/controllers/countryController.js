import Country from '../schema/Country.js'

const getAllCountry = async (req, res) => {
  try {
    const countries = await Country.find().populate({
      path: 'regions',
      populate: {
        path: 'hotels'
      }
    });
    res.status(200).json(countries)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getOneCountry = async (req, res) => {

  try {
    const { id } = req.params
    const country = await Country.findById(id).populate({
      path: 'regions',
      populate: { path: 'hotels' }
    });
    if (!country) return res.status(404).json({ msg: "Country not found" })
    res.status(200).json(country)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const createNewCountry = async (req, res) => {
  try {
    const newCountry = new Country(req.body)
    await newCountry.save()

    res.status(201).json({ msg: "Successfuly created Country!", data: newCountry })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const updateCountry = async (req, res) => {
  try {
    const { id } = req.params

    const updateCountry = await Country.findByIdAndUpdate(id, req.body)

    if (!updateCountry) {
      return res.status(404).json({ msg: "Country not found" })
    }

    res.status(201).json(updateCountry)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params
    const deletedCountry = await Country.findByIdAndDelete(id)

    if (!deletedCountry) {
      return res.status(404).json({ msg: "Country not found" })
    }

    res.status(200).json({ msg: "Successfuly delete Country" })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}


export { getAllCountry, getOneCountry, createNewCountry, updateCountry, deleteCountry, }