const express = require('express');
const app  = express();

const mongoose = require('mongoose');

require('dotenv').config();

app.use(express.json());

app.use(express.static("controllers/"));
app.use(express.urlencoded({ extended: false }));

const userRouter = require('./routes/user');

app.use(userRouter);

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("CONNECTED TO MONGODB");
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on Port: " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });