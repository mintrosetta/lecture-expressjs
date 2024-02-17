const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/lecture_expressjs")
    .then(() => {
        console.log("connect to database");
    })
    .catch((err) => console.log(err));