const express = require('express');
const Razorpay = require('razorpay');
const House = require('../models/house.model');
const crypto = require('crypto');
const Payment = require('../models/payment.model');

const router = express.Router();

const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID ,
    key_secret:process.env.RAZORPAY_SECRET
})


router.post('/order',async (req ,res) =>{

    const {houseId ,price} = req.body;
    

    try {

    const particularHouse = await House.findById(houseId);

    if(!particularHouse)  return res.status(404).json({message:"House not found"});

        const options = {
            amount : Math.round(particularHouse.price*100),
            currency:"INR",
            receipt:crypto.randomBytes(10).toString("hex"),
        }
  
          razorpayInstance.orders.create(options, (error,order) =>{
            if(error){
                console.log(error);
                return res.status(500).json({message:"Something went Wrong!"});
            }
            res.status(200).json({data:order});
            console.log(order);
          })

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error!"});
    }
})

router.post('/verify_order', async (req,res) =>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

    try {
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        
        const expectedSign = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(sign.toString()).digest("hex");


        const isAuthentic = razorpay_signature === expectedSign ;
       
        console.log(isAuthentic);

        if(isAuthentic){
            const payment = await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });


            res.status(200).json({message:"Payment done successfully", payment});
       }


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error",error});
    }
})

module.exports = router;