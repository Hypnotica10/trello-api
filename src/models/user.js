import mongoose from 'mongoose';
import { USER_COLLECTION_NAME } from '~/utils/const';

const userSchema = new mongoose.Schema({
    name: String
}, {
    versionKey: false
});

export const User = mongoose.model(USER_COLLECTION_NAME, userSchema);
