import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";
import { formatResponse } from "~/utils/formatResponse";

const createNew = async (req, res, next) => {
    try {
        const createdBoard = await boardService.createNew(req.body);
        const response = formatResponse(StatusCodes.OK, 'success', 'Create new board success', createdBoard);
        res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
        next(error);
    }
}

const getDetails = async (req, res, next) => {
    try {
        const boardId = req.params.id;
        const boardDetails = await boardService.getDetails(boardId);
        const response = formatResponse(StatusCodes.OK, 'success', 'Get board details success', boardDetails);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteBoard = async (req, res, next) => {
    try {
        const boardId = req.params.id;
        const updateDestroy = await boardService.deleteBoard(boardId);
        const response = formatResponse(StatusCodes.OK, 'success', `Delete board with title ${updateDestroy.title} success`, updateDestroy);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
}

const updateBoard = async (req, res, next) => {
    try {
        const boardId = req.params.id;
        const updatedBoard = await boardService.updateBoard(boardId, req.body);
        const response = formatResponse(StatusCodes.OK, 'success', `Update board  success`, updatedBoard);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
}

export const boardController = {
    createNew,
    getDetails,
    deleteBoard,
    updateBoard
}
