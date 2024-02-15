"use strict";

import multer from "multer";
import { appError } from "../utils/appError.js";

// file upload
const fileUpload = () => {
  const storage = multer.diskStorage({});
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new appError("image only", 400), false);
    }
  }
  const upload = multer({ storage, fileFilter });
  return upload;
};

// upload single photo
export const uploadSingleFile = (fieldName) => fileUpload().single(fieldName);

// upload array of photo
export const uploadArrayOfFile = (fieldName) => fileUpload().array(fieldName);

// upload fields of files
export const uploadFieldsOfFiles = (fieldName) => fileUpload().fields([
  { name: "img", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

// import { v4 as uuidv4 } from 'uuid'
// create unique id
// destination: (req, file, cb) => {
//   cb(null, 'uploads/');
// },
// filename: (req, file, cb) => {
//   cb(null, uuidv4() + file.originalname);
// }
