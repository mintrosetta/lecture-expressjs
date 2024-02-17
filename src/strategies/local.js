const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../database/schemas/user");
const { comparePassword } = require("../utils/helper");

passport.use(new Strategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        if (!email || !password) throw new Error("Email and Password is required.");

        // user should be found on database
        const user = await User.findOne({ email });
        if (!user) throw new Error("Username or Password is invalid.");
    
        // password should be valid
        const passwordIsValid = comparePassword(password, user.password);
        if (!passwordIsValid) throw new Error("Username or Password is invalid.");
    
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

// https://www.youtube.com/watch?v=wbylpKRkOD0&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=16