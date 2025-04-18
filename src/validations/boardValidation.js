import { StatusCodes } from "http-status-codes";
import Joi from "joi"
import ApiError from "~/utils/ApiError";
import { BOARD_TYPE } from "~/utils/const";

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title cannot be an empty field',
            'string.min': 'Title min 3 characters',
            'string.max': 'Title max 50 characters'
        }),
        type: Joi.string().valid(BOARD_TYPE.PRIVATE, BOARD_TYPE.PUBLIC).required().messages({
            'any.required': 'Type is required'
        })
    });
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
    }
}

const updateBoard = async (req, res, next) => {
    const correctCondition = Joi.object({
        name: Joi.string().trim().strict(),
        description: Joi.string().trim().max(255).strict(),
        type: Joi.string().valid(BOARD_TYPE.PRIVATE, BOARD_TYPE.PUBLIC)
    });
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true });

        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
    }
}

export const boardValidation = {
    createNew,
    updateBoard
}
