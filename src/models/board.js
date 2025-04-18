import Joi from "joi";
import mongoose from "mongoose";
import { BOARD_COLLECTION_NAME, BOARD_TYPE, COLUMN_COLLECTION_NAME, OBJECT_ID_MESSAGE, OBJECT_ID_RULE } from "~/utils/const";

export const BOARD_COLLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().min(3).strict(),
    description: Joi.string().max(255).trim().strict().default(""),
    type: Joi.string().valid(BOARD_TYPE.PRIVATE, BOARD_TYPE.PUBLIC).required(),
    // ownerIds:
    // memberIds:
    columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_MESSAGE)).default([]),
    createdAt: Joi.date().timestamp('javascript').default(Date.now()),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})
const boardSchema = new mongoose.Schema({
    title: String,
    slug: String,
    description: String,
    type: String,
    columnOrderIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: COLUMN_COLLECTION_NAME
    },
    createdAt: Number,
    updatedAt: Number,
    _destroy: Boolean
}, {
    versionKey: false
});

export const Board = mongoose.model(BOARD_COLLECTION_NAME, boardSchema);
