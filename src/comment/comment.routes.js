import { Router } from "express";
import { addComment } from "./comment.controller.js";
import { commentValidator } from "../middlewares/comment-validator.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6471a3b8c5d9b5f6789e1234"
 *         author:
 *           type: string
 *           example: "Juan Pérez"
 *         content:
 *           type: string
 *           example: "Muy buen material, gracias!"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-05-21T12:30:00Z"
 *
 * /addComment/{postId}:
 *   post:
 *     summary: Añade un comentario a un post específico
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del post al que se añade el comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - content
 *             properties:
 *               author:
 *                 type: string
 *                 example: "Juan Pérez"
 *               content:
 *                 type: string
 *                 example: "Muy buen material, gracias!"
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Datos inválidos o faltantes
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/addComment/:postId", commentValidator, addComment);

export default router;
