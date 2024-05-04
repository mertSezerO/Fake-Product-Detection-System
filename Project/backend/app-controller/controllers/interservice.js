const User = require("../models/user")

exports.matchAddress = async (req, res, next) => {
  const { companyName } = req.body

  try {
    const user = await User.findOne({ companyName: companyName })

    if (user) {
      return res.status(200).json({
        address: user.address,
      })
    } else {
      return res
        .status(404)
        .json({ errorMessage: "User with given address doesn't exist" })
    }
  } catch (error) {
    return res.status(500).json({ errorMessage: "Error finding user" })
  }
}
