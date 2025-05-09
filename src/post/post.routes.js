import { Router } from "express";
import { createPost } from "./post.controller.js";
import { postValidator } from "../middlewares/post-validator.js";
import { uploadCourseDocument } from "../middlewares/multer-upload.js";

const router = Router();

router.post("/addPost", uploadCourseDocument.single("document"), postValidator, createPost);

export default router;