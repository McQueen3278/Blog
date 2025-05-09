import { Router } from "express";
import { createComment } from "./comment.controller.js";
import { commentValidator } from "../middlewares/comment-validator.js";

const router = Router();  

router.post("/addComment", commentValidator, createComment);

export default router;