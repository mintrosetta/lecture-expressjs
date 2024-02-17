const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        require: true,
        unique: true
    },
    password: {
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