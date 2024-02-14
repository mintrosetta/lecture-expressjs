const express = require("express");

const app = express();

// ทุก ๆ request จะเข้ามาที่ use, ใช้สำหรับสร้าง middleware
// middleware ฟังชันก์ที่จะถูกเรียกใช้เมื่อมี request เข้ามา
app.use(express.json()); // ทำให้สามารถอ่าน json object จาก body ได้

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

app.get("/groceries", (req, res) => {
    /* 
        get
            ใช้สำหรับการร้องขอข้อมูล

        request
            ใช้ดูรายละเอียดคำขอที่ถูกส่งข้อมาที่ server
        response
            ใช้จัดการกับการตอบกลับไปที่ client
    */
    res.send(groceries);
});

app.post("/groceries", (req, res) => {
    console.log(req.body); // ดึงข้อมูลใน body
    groceries.push(req.body);

    res.send(201) // 201 created
});

// https://www.youtube.com/watch?v=o4RLiTIOfhQ&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=5