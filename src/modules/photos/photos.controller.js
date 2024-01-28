"use strict";

// import express from 'express'
import { photoModel } from "../../../database/models/photo.model.js";

// Get All Photos
export const getAllPhotos = async (req, res) => {
  const photos = await photoModel.find();
  res.json({ message: photos });
};

// Add New Single Photo to Database
export const singleFile = async (req, res) => {
  req.body.img = req.file.filename;
  await photoModel.insertMany(req.body);
  res.json({ message: "success" });
};

// Add New Single Photo to Database
export const arrayOfFiles = async (req, res) => {
  let images = req.files.map((val) => val.filename);
  req.body.images = images;
  await photoModel.insertMany(req.body);
  res.json({ message: "success" });
};

// Add New Single Photo to Database
export const fieldsOfFiles = async (req, res) => {
  req.body.img = req.files.img[0].filename;
  let images = req.files.images.map((val) => val.filename);
  req.body.images = images;
  await photoModel.insertMany(req.body);
  res.json({ message: "success" });
};