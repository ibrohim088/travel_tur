import Tour from "../schema/Tour.js"

const getAllTour = async (req, res) => {
  try {
    const allTour = await Tour.find().populate([{
      path: 'tourHotel',
      select: 'hotelName hotelRating hotelFeatures cityId',
      populate: {
        path: 'cityId',
        select: 'cityName countryId',
        populate: { path: 'countryId', select: 'countryName' }
      }
    },
    { path: 'tourCity', select: '_id cityName' },
    { path: 'tourCountry', select: '_id countryName' }
    ])

    res.status(200).json(allTour)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getOneTour = async (req, res) => {
  try {
    const { id } = req.params
    const findTour = await Tour.findById(id).populate([{
      path: 'tourHotel',
      select: 'hotelName hotelRating hotelFeatures cityId',
      populate: {
        path: 'cityId',
        select: 'cityName countryId',
        populate: { path: 'countryId', select: 'countryName' }
      }
    },
    { path: 'tourCity', select: '_id cityName' },
    { path: 'tourCountry', select: '_id countryName' }
    ])

    if (!findTour) return res.status(404).json({ msg: "Tour not found" })

    res.status(200).json(findTour)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)

    res.status(201).json({
      msg: "Successfuly created new Tour",
      data: newTour
    })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const updateTour = async (req, res) => {
  try {
    const { id } = req.params

    const update = await Tour.findByIdAndUpdate(id, req.body, { new: true })

    if (!update) return res.status(404).json({ msg: "Tour not found" })

    res.status(200).json(update)

  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deleteTour = async (req, res) => {
  try {
    const { id } = req.params

    const delTour = await Tour.findByIdAndDelete(id)

    if (!delTour) return res.status(404).json({ msg: "Tour not found" })

    res.status(200).json({ msg: "Successfuly delete tour", data: delTour })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}


export { getAllTour, getOneTour, createTour, updateTour, deleteTour, }