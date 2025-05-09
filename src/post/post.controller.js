import Post from "./post.model.js"
import Course from "../courses/course.model.js"

export const createPost = async (req, res) => {
  try {
    const { title, description, course } = req.body;


    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Debes subir un documento.',
      });
    }

    const document = `/uploads/course-documents/${req.file.filename}`;

    const newPost = new Post({
      title,
      description,
      course,
      document: document,
    });

    const savedPost = await newPost.save();

    await Course.findByIdAndUpdate(course, {
        $push: { documents: savedPost._id }
      });

    res.status(201).json({
      success: true,
      message: 'Publicación creada correctamente.',
      post: savedPost,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ocurrió un error al guardar la publicación.',
      error: error.message,
    });
  }
};



export const getPostWithComments = async (req, res) => {
    try {
      const { id } = req.params;
  
      const post = await Post.findById(id)
        .populate({
          path: 'comments',
          model: 'Comment',
          select: 'username content createdAt',
        });
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post no encontrado.',
        });
      }
  
      return res.status(200).json({
        success: true,
        post,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el post.',
        error: error.message,
      });
    }
  };