require('dotenv').config();
const express = require('express');
const userRoute = require('./routes/user.route.js');
const {jwtAuthToken}  = require('./services/jwtAuth.service.js')
const passport = require('./services/passportAuth.service.js');
const houseRoute = require('./routes/house.route.js');
const filterRoute = require('./routes/filter.route.js');
const paymentRoute = require('./routes/payment.route.js');

const mongoose = require('mongoose');
const app  = express();
const path = require('path');
const PORT = process.env.PORT;
const cors = require('cors');

mongoose.connect(process.env.Local_MONGODB_URI).
then(() =>{
    console.log('mongodb connected successfully')
}).catch((error) =>{
 console.log(error)
})


app.use(passport.initialize());
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user', userRoute);
app.use('/house',houseRoute);
app.use('/filter', filterRoute);
app.use('/payment',paymentRoute);

var corsOptions = {
    origin: 'http://localhost:5173/',
    methods: "GET,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}


app.get('/', passport.authenticate('local',{session:false}),(req,res)=>{
    res.send("Welcome to Find your room");
})

app.listen(PORT,()=>{
    console.log(`server listen at port ${PORT}`);
})