import Comment from './comment.model.js';
import Post from '../post/post.model.js';

export const createComment = async (req, res) => {
    try {
      const {postId} = req.params;
      const { username, content } = req.body;
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post no encontrado.',
        });
      }
  
      const newComment = new Comment({
        username,
        content,
        post: postId,
      });
  
      const savedComment = await newComment.save();
  

      post.comments.push(savedComment._id);
      await post.save();
  
      return res.status(201).json({
        success: true,
        message: 'Comentario creado correctamente.',
        comment: savedComment,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Ocurrió un error al guardar el comentario.',
        error: error.message,
      });
    }
  };

