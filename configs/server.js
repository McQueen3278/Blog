"use strict"

import express from 'express'
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from './mongo.js'
import apiLimiter from '../src/middlewares/request-limit.js'
import { swaggerDocs, swaggerUI } from "./swagger.js";
import { deleteFileOnError } from '../src/middlewares/delete-file-on-error.js'
import courseRoutes from "../src/courses/course.routes.js"
import postRoutes from "../src/post/post.routes.js"
import commentRoutes from "../src/comment/comment.routes.js"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const middlewares = (app) => {
    app.use('/uploads/course-images', express.static(path.join(__dirname, '../public/uploads/course-images')));
app.use('/public/uploads/course-documents', express.static(path.join(__dirname, 'uploads/course-documents')));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.use(helmet({
    frameguard: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "http://localhost:5173"],
        scriptSrc: ["'self'", "'unsafe-inline'", "http://localhost:5173"],
        connectSrc: ["'self'", "http://localhost:5173"],
        imgSrc: ["'self'", "data:", "http://localhost:5173"],
        styleSrc: ["'self'", "'unsafe-inline'", "http://localhost:5173"]
      }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    referrerPolicy: { policy: "no-referrer" }
}));

    app.use(morgan("dev"));
    app.use(apiLimiter);
    app.use(deleteFileOnError);
}

const routes = (app) => {
    app.use("/blog/v1/course", courseRoutes);
    app.use("/blog/v1/post", postRoutes);
    app.use("/blog/v1/comment", commentRoutes);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
}

const conectarDB = async () =>{
    try{
        await dbConnection();
    }catch(err){
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
}

export const initServer = () => {
    const app = express();
    try{
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(process.env.PORT);
        console.log(`Server running on port ${process.env.PORT}`);
    }catch(err){
        console.log(`Server init failed: ${err}`);
    }
}
