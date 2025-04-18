import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

// Handle Method Not Allowed
export const methodNotAllowed = (req, res, next) => {
    next(new ApiError(StatusCodes.METHOD_NOT_ALLOWED, 'Method Not Allowed!'));
}

// Handle No Resource Found
export const noResourceFound = (req, res, next) => {
    next(new ApiError(StatusCodes.NOT_FOUND, 'Resource Not Found!'));
}
