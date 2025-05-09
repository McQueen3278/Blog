import { body } from "express-validator";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const courseValidator = [
    body("name").notEmpty().withMessage("El nombre del curso es obligatorio"),
    validateFields,
    deleteFileOnError,
    handleErrors,
]