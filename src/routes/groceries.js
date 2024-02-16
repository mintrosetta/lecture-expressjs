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

    // สร้าง cookie ขึ้นมาและส่งไปให้ client ถือ
    res.cookie("visited", true, {
        maxAge: 60000 // วันหมดอายุของ cookie, มิลลิวินาที
    });
    res.cookie("token", "620107030012", {
        maxAge: 60000
    });

    res.send(groceries);
    next();
}, () => {
    // ทำงานหลัง request ทำเสร็จ
    console.log("After Handing Request");
});

router.get("/:item", (req, res) => {
    const { item } = req.params;

    // ดึง cookie ที่เก็บอยู่ที่ฝั่ง client, โดยจะเป็นการดึง string มี่เก็บ cookie ทั้งหมด ต้องนำมาแยกเอง
    console.log(req.headers.cookie);

    // ดึง cookie ที่เก็บอยู่ที่ฝั่ง client, โดยใช้ cookie parser โดยมันจะแบกเป็น object ให้เรา
    console.log(req.cookies);

    res.send(groceries[item]);
});

router.post("", (req, res) => {
    console.log(req.body); // ดึงข้อมูลใน body
    groceries.push(req.body);

    res.send(201) // 201 created
});

module.exports = router;

//https://www.youtube.com/watch?v=isURb7HQkn8&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=9