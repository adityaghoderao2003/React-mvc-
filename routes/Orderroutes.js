const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
    placeOrder,
    viewOrders,
    cancelOrder
} = require("../controllers/Ordercontroller");

router.post("/placeorder", verifyToken, placeOrder);

router.put("/cancelorder/:id", verifyToken, cancelOrder);
router.get("/vieworders", verifyToken, viewOrders);

router.put("/cancelorder/:id", verifyToken, cancelOrder);

module.exports = router;