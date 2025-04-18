import express from "express";
import { boardController } from "~/controllers/boardController";
import { checkParamsValid } from "~/middlewares/checkParamsValid";
import { methodNotAllowed } from "~/middlewares/globalError";
import { boardValidation } from "~/validations/boardValidation";

export const boardRoute = express.Router();

boardRoute.route('/')
    .post(boardValidation.createNew, boardController.createNew)
    .all(methodNotAllowed)

boardRoute.route('/:id')
    .get(checkParamsValid, boardController.getDetails)
    .delete(checkParamsValid, boardController.deleteBoard)
    .put(checkParamsValid, boardValidation.updateBoard, boardController.updateBoard)
