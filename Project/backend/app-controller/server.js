const express = require("express")
const app = express()

const mongoose = require("mongoose")

const cors = require("cors")
const CORS = cors({
  origin: "*",
})

require("dotenv").config()

app.use(CORS)
app.use(express.json())

const userRouter = require("./routes/user")

app.use(userRouter)

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("CONNECTED TO MONGODB")
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on Port: " + process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })
