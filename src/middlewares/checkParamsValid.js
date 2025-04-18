import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE } from "~/utils/const";

export const checkParamsValid = (req, res, next) => {
    const { id } = req.params;
    const isValid = id.match(OBJECT_ID_RULE);
    if (!isValid) {
        next(new ApiError(StatusCodes.BAD_REQUEST, 'Invalid ID or ID does not exist!'));
    }
    next();
}