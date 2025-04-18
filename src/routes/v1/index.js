import express from 'express';
import { userRoute } from './userRoute';
import { boardRoute } from './boardRoute';

const Router = express.Router();

Router.use('/user', userRoute);
Router.use('/board', boardRoute);

export const APIs_V1 = Router;
