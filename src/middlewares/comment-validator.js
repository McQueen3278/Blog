import { body } from "express-validator";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const commentValidator = [

    validateFields,
    deleteFileOnError,
    handleErrors,
]