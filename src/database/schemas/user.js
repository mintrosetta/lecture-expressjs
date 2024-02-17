const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        require: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        require: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        require: true
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        require: true,
        default: new Date()
    }
});

module.exports = mongoose.model("users", UserSchema);