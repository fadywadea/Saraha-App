"use strict";

import { photoModel } from "../../../database/models/photo.model.js";
import { v2 as cloudinary } from "cloudinary";
import { catchError } from "../../middleware/catchError.js";

// Get All Photos
export const getAllPhotos = catchError(async (req, res) => {
  const photos = await photoModel.find();
  res.json({ message: photos });
});

// Add New Single Photo to Database
export const singleFile = catchError(async (req, res) => {
  await cloudinary.uploader.upload(req.file.path, async (error, result) => {
    req.body.img = result.secure_url;
    await photoModel.insertMany(req.body);
    res.json({ message: "success" });
  });
});

// Add New Array Of Photo to Database
export const arrayOfFiles = catchError(async (req, res) => {
  const uploadedUrls = [];
  for (const file of req.files) {
    const result = await cloudinary.uploader.upload(file.path);
    const secureUrl = result.secure_url;
    uploadedUrls.push(secureUrl);
  }
  await photoModel.insertMany({ images: uploadedUrls });
  res.json({ message: "success", uploadedUrls });
});

// Add New Single Photo to Database
export const fieldsOfFiles = catchError(async (req, res) => {
  req.body.img = req.files.img[0].filename;
  let images = req.files.images.map((val) => val.filename);
  req.body.images = images;
  await photoModel.insertMany(req.body);
  res.json({ message: "success" });
});

