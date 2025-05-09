import { Router } from "express";
import { createPost, getPostWithComments } from "./post.controller.js";
import { postValidator } from "../middlewares/post-validator.js";
import { uploadCourseDocument } from "../middlewares/multer-upload.js";

const router = Router();

router.post("/addPost", uploadCourseDocument.single("document"), postValidator, createPost);

router.get("/getPostWithComments/:id", getPostWithComments);

export default router;