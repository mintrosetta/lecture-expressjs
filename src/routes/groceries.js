const { Router } = require("express");

const router = Router();

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

router.get("", (req, res, next) => {
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

router.get("/:item", (req, res) => {
    const { item } = req.params;

    res.send(groceries[item]);
});

router.post("", (req, res) => {
    console.log(req.body); // ดึงข้อมูลใน body
    groceries.push(req.body);

    res.send(201) // 201 created
});

module.exports = router;

// https://www.youtube.com/watch?v=SqJqtXjkBts&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=8