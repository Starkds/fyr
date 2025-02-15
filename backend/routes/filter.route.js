const express = require("express");
const House = require("../models/house.model.js");
const { parse } = require("dotenv");

const router = express.Router();

router.get('/filteredhouse',async (req,res) =>{
  const { houseType, price,restrictions ,  facilities ,sort,search}  = req.query;

  const query = {};

  if(houseType){
    query.houseType = houseType;
  }

  if(search){
    query.name = {$regex:search,$options:'i'};
  }
  if(restrictions){
    query.restrictions = restrictions;
  }

  if(facilities){
    query.facilities = facilities;
  }


  if(price){
    const [min,max] = price.split('-');
      query.price = {$gte:Number(min), $lte:Number(max)};
  }


  let  sortOptions = {};
  if(sort === 'priceAsc'){
    sortOptions.price = 1;
     }else if(sort === 'priceDesc'){
      sortOptions.price  = -1;
     }


    try {
      const products = await  House.find(query).sort(sortOptions);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({message:'Error fetching products', error});
    }

})

module.exports = router;
