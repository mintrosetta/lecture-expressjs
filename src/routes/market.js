const { Router } = require("express");

const router = Router();
const superMarkets = [
    { id: 1, store: "Whole Foods", miles: 0.6 },
    { id: 2, store: "Trader Joe", miles: 2.5 },
    { id: 3, store: "Albert", miles: 2.8 },
    { id: 4, store: "Trader Joes", miles: 3.5 },
];

router.get("", (req, res) => {
    // ดึง query parameter ออกมา
    // console.log(req.query);

    const { miles } = req.query;

    const parsedMiles = parseFloat(miles);
    console.log(parsedMiles);
    if (!isNaN(parsedMiles)) {
        const filteredStores = superMarkets.filter((item) => item.miles <= parsedMiles);
        res.send(filteredStores);
    } else {
        res.send(superMarkets);
    }
});

module.exports = router;