import Course from "./course.model.js"

export const createCourse = async (req, res) => {
    try {
        const data = req.body;

        const courseImage = req.file ? req.file.filename : null;
        if (courseImage) {
            data.courseImage = courseImage;
        }

        const course = await Course.create(data);

        return res.status(201).json({
            message: 'Curso creado correctamente',
            course,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error al crear el curso',
            error: err.message,
        });
    }
};