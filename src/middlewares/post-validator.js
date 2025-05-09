import { body } from "express-validator";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const postValidator = [
    body("title").notEmpty().withMessage("El título es obligatorio"),
    body("description").notEmpty().withMessage("El la descripcion es obligatoria"),
    validateFields,
    deleteFileOnError,
    handleErrors,
]