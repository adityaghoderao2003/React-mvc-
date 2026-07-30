const express = require('express');
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const {createProduct , getproducts , getsingleproduct , updateproduct , deleteproduct} = require('../controllers/Productcontroller');

router.get('/viewproduct', verifyToken , getproducts);
router.get("/viewproduct/:id", verifyToken, getsingleproduct);
router.post('/createproduct', verifyToken, createProduct);
router.put('/updateproduct/:id', verifyToken, updateproduct);
router.delete('/deleteproduct/:id', verifyToken , deleteproduct);

module.exports = router;