import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const IMAGE_MIMETYPES = ["image/jpeg", "image/png", "image/jpg"];
const DOCUMENT_MIMETYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const MAX_SIZE = 100000000;

const createMulterConfig = (destinationPath, validMimetypes) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const fullPath = join(CURRENT_DIR, destinationPath);
                req.filePath = fullPath; 
                cb(null, fullPath); 
            },
            filename: (req, file, cb) => {
                const fileExtension = extname(file.originalname); 
                const fileName = file.originalname.split(fileExtension)[0];
                cb(null, `${fileName}-${Date.now()}${fileExtension}`);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (validMimetypes.includes(file.mimetype)) {
                cb(null, true); // Acepta el archivo
            } else {
                cb(new Error(`Solamente se aceptan archivos de los siguientes tipos: ${validMimetypes.join(", ")}`));
            }
        },
        limits: {
            fileSize: MAX_SIZE 
        }
    });
};


export const uploadCourseImage = createMulterConfig("../../public/uploads/course-images", IMAGE_MIMETYPES);
export const uploadCourseDocument = createMulterConfig("../../public/uploads/course-documents", DOCUMENT_MIMETYPES);