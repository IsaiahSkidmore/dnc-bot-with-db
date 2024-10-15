
export default (req, res, next) => {
    const { content } = req.body;
  
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content cannot be empty" });
    }
  
    next();
  };
  