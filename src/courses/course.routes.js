import { Router } from "express";
import { createCourse , getCourses, getCourseById} from "./course.controller.js";
import { courseValidator } from "../middlewares/course-validator.js";
import { uploadCourseImage } from "../middlewares/multer-upload.js";

const router = Router();

router.post("/addCourse", uploadCourseImage.single("courseImage"), courseValidator, createCourse);

router.get("/getCourses", getCourses);

router.get("/getCourse/:id", getCourseById);


export default router;

