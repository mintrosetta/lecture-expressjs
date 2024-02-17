const express = require("express");
require("./database/index");
require("./strategies/local");

// routers
const groceriesRoute = require("./routes/groceries");
const marketRoute = require("./routes/market");
const authRoute = require("./routes/auth");

const app = express();

// ทุก ๆ request จะเข้ามาที่ use, ใช้สำหรับสร้าง middleware
// middleware ฟังชันก์ที่จะถูกเรียกใช้เมื่อมี request เข้ามา
app.use(express.json()); // ทำให้สามารถอ่าน json object จาก body ได้
app.use((req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
});
app.use(require("cookie-parser")());
app.use(require("express-session")({
    secret: "MintRosetta", // ใช้สำหรับเข้ารหัส session ของเรา
    resave: false,
    saveUninitialized: false,
}));
app.use(require("passport").initialize()); // เริ่มต้น passport
app.use(require("passport").session()); // เปิดใช้งาน session ให้กับ passport

app.use("/api/auth", authRoute);
app.use("/api/groceries", groceriesRoute);
app.use("/api/markets", marketRoute);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Running nodejs server at http://localhost:${PORT}`);
});

// https://www.youtube.com/watch?v=o1g7ihFunxQ&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=11



