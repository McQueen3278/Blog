import Course from "./course.model.js"

export const createCourse = async (req, res) => {
    try {
        const data = req.body;

        let courseImage = req.file ? req.file.filename : null;
        data.courseImage = courseImage;
        

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

export const getCourses = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, courses ] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .select("-status -_id")
        ])

        return res.status(200).json({
            success: true,
            total,
            courses
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: err.message
        })
    }
}