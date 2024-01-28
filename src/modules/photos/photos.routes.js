"use strict"

import express from 'express'
import { arrayOfFiles, fieldsOfFiles, getAllPhotos, singleFile } from './photos.controller.js';
import { uploadArrayOfFile, uploadFieldsOfFiles, uploadSingleFile } from '../../fileUpload/uploads.js';

const photoRouter = express.Router();

// Get All Photos
photoRouter.get('/photos', getAllPhotos);

// Add Photo
photoRouter.post('/photo', uploadSingleFile('img'), singleFile);

// Add Photos
photoRouter.post('/photos', uploadArrayOfFile('img'), arrayOfFiles);

// Add fields
photoRouter.post('/fields', uploadFieldsOfFiles('img'), fieldsOfFiles);

export default photoRouter;