"use strict"

// catch error when type 
process.on('uncaughtException', (error) => { console.log('Error:', error); });

import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import userRouter from './src/modules/users/user.routes.js'
import messageRouter from './src/modules/messages/message.routes.js';
import { appError } from './src/utils/appError.js';
import { globalError } from './src/middleware/globalErrorMiddleware.js';
import dotenv from 'dotenv';
import photoRouter from './src/modules/photos/photos.routes.js';

// Config For File dotenv
dotenv.config();

const app = express();
const port = 3000

// Database connection
dbConnection();

// Static Middlewares
app.use('/', express.static('uploads'));

// JSON Middlewares
app.use(express.json());

app.use('/api/v1', userRouter);
app.use('/api/v1', messageRouter);
app.use('/api/v1', photoRouter);

// Error messages if there are any errors in the routes
app.use('*', (req, res, next) => { next(new appError(`Not found endPoint: ${req.originalUrl}`, 404)); });

// Global Error Handle
app.use(globalError);


process.on('unhandledRejection', (error) => { console.log('Error:', error); });

// Server Running....
app.listen(port, () => console.log(`App listening on port ${port}!`));