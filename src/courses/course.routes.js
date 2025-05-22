import { Router } from "express";
import { createCourse , getCourses, getCourseById} from "./course.controller.js";
import { courseValidator } from "../middlewares/course-validator.js";
import { uploadCourseImage } from "../middlewares/multer-upload.js";

const router = Router();

/**
 * @swagger
 * /addCourse:
 *   post:
 *     summary: Crea un nuevo curso
 *     tags:
 *       - Cursos
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - professor
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Matemáticas"
 *               professor:
 *                 type: string
 *                 example: "Juan Pérez"
 *               description:
 *                 type: string
 *                 example: "Curso básico de matemáticas"
 *               courseImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Curso creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 course:
 *                   $ref: '#/components/schemas/Course'
 *       500:
 *         description: Error al crear el curso
 */
router.post("/addCourse", uploadCourseImage.single("courseImage"), courseValidator, createCourse);

/**
 * @swagger
 * /getCourses:
 *   get:
 *     summary: Obtiene todos los cursos
 *     tags:
 *       - Cursos
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número máximo de cursos a devolver
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Número de cursos a saltar
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 total:
 *                   type: integer
 *                 courses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *       500:
 *         description: Error al obtener los cursos
 */
router.get("/getCourses", getCourses);

/**
 * @swagger
 * /getCourse/{id}:
 *   get:
 *     summary: Obtiene un curso por su ID
 *     tags:
 *       - Cursos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 course:
 *                   $ref: '#/components/schemas/Course'
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error al obtener el curso
 */
router.get("/getCourse/:id", getCourseById);

export default router;