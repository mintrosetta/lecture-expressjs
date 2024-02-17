const { Router } = require("express");
const User = require("../database/schemas/user");

const routers = Router();

routers.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        if (req.session.user) {
            res.send(req.session.user);
        } else {
            req.session.user = {
                username
            }

            res.send(req.session);
        }
    } else {
        res.send(401);
    }
});

routers.post("/register", async (req, res) => {
    const { username, password, email } = req.body;

    if (!username && !password && !email) return res.send(400); 

    const user = await User.findOne({ $or: [{username}, {email}] });
    if (user) {
        res.status(400).send({
            success: false,
            message: "User already exists.",
            data: null
        });
    } else {
        const newUser = await User.create({
            username: username,
            password: password,
            email: email
        });
        newUser.save();

        res.status(201).send({
            success: true,
            message: "Successful.",
            data: null
        })
    }
});

module.exports = routers;