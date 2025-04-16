import express from 'express';
import { userRoute } from './userRoute';

const Router = express.Router();

Router.use('/user', userRoute);

export const APIs_V1 = Router;
