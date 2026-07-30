const express = require('express');
const app = express();
const connectDB = require('./config/db')
const cors = require('cors')
const productroute = require('./routes/productroute');
const userroute = require('./routes/Userroutes');
const orderroutes = require('./routes/Orderroutes')
const cartroutes = require("./routes/Cartroutes");
const port = 4000;


connectDB();
app.use(cors());
app.use(express.json());
app.use('/flipkart' , productroute);
app.use('/user' , userroute);
app.use('/orders', orderroutes);
app.use("/flipkart", cartroutes);

app.get('/', (req, res)=>{
    res.send('Hello there')
})

app.listen(port);