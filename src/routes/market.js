const { Router } = require("express");

const router = Router();
const superMarkets = [
    { store: "Whole Foods" },
    { store: "Trader Joe" },
    { store: "Albert" }
];

router.get("", (req, res) => {
    res.send(superMarkets);
});

module.exports = router;