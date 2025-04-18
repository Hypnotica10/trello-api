import { StatusCodes } from "http-status-codes";
import { Board, BOARD_COLLECTION_SCHEMA } from "~/models/board"
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatter"

const validateBeforeCreate = async (data) => {
    return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
}

const checkBoardActive = async (id) => {
    const boardActive = await Board.find({ _id: id, _destroy: false }).countDocuments();
    return boardActive;
}

const createNew = async (reqBody) => {
    const newBoard = {
        ...reqBody,
        slug: slugify(reqBody.title)
    };
    const validData = await validateBeforeCreate(newBoard);
    const savedBoard = await Board.create(validData);
    return savedBoard;
}

const getDetails = async (boardId) => {
    const boardDetail = await Board.find({ _id: boardId, _destroy: false }).populate({
        path: 'columns',
        strictPopulate: false,
        populate: {
            path: 'cards'
        }
    });
    if (!boardDetail.length) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found or has been deleted');
    }
    return boardDetail;
}

const deleteBoard = async (boardId) => {
    const boardActive = await checkBoardActive(boardId);
    if (!boardActive) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found or has been deleted');
    }
    const updateDestroy = await Board.findByIdAndUpdate(boardId, { _destroy: true }, { new: true });
    return updateDestroy;
}

const updateBoard = async (id, reqBody) => {
    const boardActive = await checkBoardActive(id);
    if (!boardActive) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found or has been deleted');
    }
    const updateData = reqBody.title ? {
        ...reqBody,
        slug: slugify(reqBody.title),
        updatedAt: Date.now()
    } : {
        ...reqBody,
        updatedAt: Date.now()
    }
    const updatedData = await Board.findByIdAndUpdate(id, updateData, { new: true });
    return updatedData;
}

export const boardService = {
    createNew,
    getDetails,
    deleteBoard,
    updateBoard
}
