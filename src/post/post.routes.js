import { Router } from "express";
import { createPost, getPostWithComments } from "./post.controller.js";
import { postValidator } from "../middlewares/post-validator.js";
import { uploadCourseDocument } from "../middlewares/multer-upload.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Gestión de publicaciones de cursos
 *
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único de la publicación
 *           example: "6452f3a9d3b9c9a8f4e4a1d2"
 *         title:
 *           type: string
 *           example: "Introducción a Node.js"
 *         description:
 *           type: string
 *           example: "Esta publicación contiene recursos para aprender Node.js"
 *         course:
 *           type: string
 *           description: ID del curso asociado
 *           example: "6650c0f7e1b2c8a1f8e4d123"
 *         documentUrl:
 *           type: string
 *           format: uri
 *           description: URL del documento subido
 *           example: "https://example.com/uploads/documents/nodejs-intro.pdf"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-05-20T14:28:23.382Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-05-20T15:00:00.000Z"
 *
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear una nueva publicación en un curso
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - course
 *               - document
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la publicación
 *                 example: "Guía básica para React"
 *               description:
 *                 type: string
 *                 description: Descripción breve del post
 *                 example: "Documentos y ejemplos para empezar con React"
 *               course:
 *                 type: string
 *                 description: ID del curso al que pertenece la publicación
 *                 example: "6650c0f7e1b2c8a1f8e4d123"
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Documento adjunto para la publicación
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Publicación creada correctamente"
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Datos inválidos o falta de documento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "El campo 'title' es obligatorio."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "No se pudo crear la publicación."
 */
router.post("/posts", uploadCourseDocument.single("document"), postValidator, createPost);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtener una publicación y sus comentarios por ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID único de la publicación
 *         required: true
 *         schema:
 *           type: string
 *           example: "6452f3a9d3b9c9a8f4e4a1d2"
 *     responses:
 *       200:
 *         description: Publicación encontrada con comentarios incluidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *                 comments:
 *                   type: array
 *                   description: Lista de comentarios asociados a la publicación
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6471a3b8c5d9b5f6789e1234"
 *                       author:
 *                         type: string
 *                         example: "Juan Pérez"
 *                       content:
 *                         type: string
 *                         example: "Muy buen material, gracias!"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-05-21T12:30:00Z"
 *       404:
 *         description: Publicación no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "No se encontró la publicación con el ID proporcionado."
 *       500:
 *         description: Error al obtener la publicación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Error del servidor al recuperar la publicación."
 */
router.get("/getPostWithComments/:id", getPostWithComments);

export default router;
