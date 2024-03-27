const express = require('express');
const app  = express();

require('dotenv').config();

app.use(express.json());

app.use(express.static("controllers/"));
app.use(express.urlencoded({ extended: false }));

const userRouter = require('./routes/user');

app.use(userRouter);

app.listen(process.env.PORT, () => {
    console.log("Listening on Port: " + process.env.PORT);
});