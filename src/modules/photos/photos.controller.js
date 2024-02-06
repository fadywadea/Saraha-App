"use strict";

import { photoModel } from "../../../database/models/photo.model.js";
import { v2 as cloudinary } from "cloudinary";

// Get All Photos
export const getAllPhotos = async (req, res) => {
  const photos = await photoModel.find();
  res.json({ message: photos });
};

// Add New Single Photo to Database
export const singleFile = async (req, res) => {
  cloudinary.uploader.upload(req.file.path, async (error, result) => {
    req.body.img = result.secure_url;
    await photoModel.insertMany(req.body);
    res.json({ message: "success" });
  });
};

// Add New Array Of Photo to Database
export const arrayOfFiles = async (req, res) => {
  req.files.map(async (val) => {
    let results = await cloudinary.uploader.upload(val.path);
  });
  
  let secure_url = Object.values(results).map(img => img);
  console.log("Secure URL : ", secure_url);
  // req.body.images = secure_url;
  // await photoModel.insertMany(req.body);
  res.json({ message: "success" });
};

// const images = req.files.map(async (val) => {
//   const result = await cloudinary.uploader.upload(val.path);
//   const imagePaths = result.map((img) => img.path);
//   await photoModel.insertMany(imagePaths);
// });

// cloudinary.uploader.upload(images, async (error, result) => {
//   console.log(result);
//   res.json({ message: "success" });
// });

//

//   }).reduce((acc, curr) => acc.then(() => curr), Promise.resolve());

// images.then((results) => {
//   let arr = [];
//   results.forEach(el => arr.push(el.public_id));
//   req.body.images = arr;
//   const post = await photoModel.create(req.body);
//   res.status(201).json(post);
// }, err => {
//   console.log("Error in uploading image", err);
//   res.status(500).send(err);
// });
// }
// req.body.images = images;

// Add New Single Photo to Database
export const fieldsOfFiles = async (req, res) => {
  req.body.img = req.files.img[0].filename;
  let images = req.files.images.map((val) => val.filename);
  req.body.images = images;
  await photoModel.insertMany(req.body);
  res.json({ message: "success" });
};

// Delete Photo
