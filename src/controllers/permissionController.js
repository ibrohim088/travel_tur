// controllers/adminController.js
export const getFinanceReports = async (req, res) => {
  try {
    // тут потом будет логика: отчёты, агрегации, DB и т.д.
    res.json({ msg: "Welcome to Finance Department" })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}