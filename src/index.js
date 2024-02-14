const express = require("express");

const app = express();

// ทุก ๆ request จะเข้ามาที่ use, ใช้สำหรับสร้าง middleware
// middleware ฟังชันก์ที่จะถูกเรียกใช้เมื่อมี request เข้ามา
app.use(express.json()); // ทำให้สามารถอ่าน json object จาก body ได้
app.use((req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Running nodejs server at http://localhost:${PORT}`);
});

const groceries = [
    {
        item: 'milk',
        qty: 2
    },
    {
        item: 'egg',
        qty: 10
    }
];

app.get("/groceries", (req, res, next) => {
    // ถูกเรียกใช้งานก่อนเข้าไปทำ request
    console.log("Before Handing Request");
    next();
}, (req, res, next) => {
    /* 
        get
            ใช้สำหรับการร้องขอข้อมูล

        request
            ใช้ดูรายละเอียดคำขอที่ถูกส่งข้อมาที่ server
        response
            ใช้จัดการกับการตอบกลับไปที่ client
        next
            ทำให้เราทำ request ต่อไป
    */

    res.send(groceries);
    next();
}, () => {
    // ทำงานหลัง request ทำเสร็จ
    console.log("After Handing Request");
});

app.post("/groceries", (req, res) => {
    console.log(req.body); // ดึงข้อมูลใน body
    groceries.push(req.body);

    res.send(201) // 201 created
});