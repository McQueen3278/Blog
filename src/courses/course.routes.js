import { Router } from "express";
import { createCourse } from "./course.controller.js";
import { courseValidator } from "../middlewares/course-validator.js";
import { uploadCourseImage } from "../middlewares/multer-upload.js";

const router = Router();

router.post("/addCourse", uploadCourseImage.single("courseImage"), courseValidator, createCourse);

export default router;

