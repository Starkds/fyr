const express = require("express");
const router = express.Router();
const House = require("../models/house.model.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.fields ([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        houseName,
        houseType,
        price,
        description,
        street,
        city,
        state,
        pincode,
      } = req.body;

      const house = await House.create({
        houseName,
        houseType,
        price,
        street,
        city,
        state,
        pincode,
        description,
        restrictions: JSON.parse(req.body.restrictions) || [],
        facilities: JSON.parse(req.body.facilities) || [],

        images: req.files.images
          ? req.files.images.map((file) => `/uploads/${file.filename}`)
          : [],
        videos: req.files.videos
          ? req.files.videos.map((file) => `/uploads/${file.filename}`)
          : [],
      });
      
      res.status(200).json({ message: "Upload successful", house }); 
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "internal server error" });
    }
  }
);

router.get("/showallhouses", async (req, res) => {
  const {limit, houseType} = req.query;
  const query = houseType ? houseType : {};
  
  try {
    const house = await House.find(query).limit(Number(limit)  || 10);
    
    return res.status(200).json(house);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:houseid", async (req, res) => {
  try {
    const houseid = req.params.houseid;
    const house = await House.findById(houseid);

    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }

    return res.status(200).json(house);
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
