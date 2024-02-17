const { Router } = require("express");
const User = require("../database/schemas/user");
const { hashPassword, comparePassword } = require("../utils/helper");
const passport = require("passport");

const routers = Router();

// routers.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     // email and password should not be empty
//     if (!email || !password) return res.status(400).send({
//         success: false,
//         message: "Email and Password is required.",
//         data: null
//     });

//     // user should be found on database
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).send({
//         success: false,
//         message: "Username or Password is invalid.",
//         data: null
//     });

//     // password should be valid
//     const passwordIsValid = comparePassword(password, user.password);
//     if (!passwordIsValid) return res.status(401).send({
//         success: false,
//         message: "Username or Password is invalid.",
//         data: null
//     });

//     // create user session
//     req.session.user = user;

//     return res.status(200).send({
//         success: true,
//         message: "Successful.",
//         data: null
//     });
// });

routers.post("/login", passport.authenticate("local"), (req, res) => {
    console.log("Logged In");
    return res.send(200);
});

routers.post("/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({
        success: false,
        message: "Email and Password is required.",
        data: null
    });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({
        success: false,
        message: "User already exists.",
        data: null
    });

    const passwordHashed = hashPassword(password);
    const newUser = await User.create({
        email: email,
        password: passwordHashed,
    });
    newUser.save();

    return res.status(201).send({
        success: true,
        message: "Successful.",
        data: null
    });
});

module.exports = routers;