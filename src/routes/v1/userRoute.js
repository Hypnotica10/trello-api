import express from 'express';
import { StatusCodes } from 'http-status-codes';

export const userRoute = express.Router();

userRoute.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ message: 'Call api get user success' })
    })
