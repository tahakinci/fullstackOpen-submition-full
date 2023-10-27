const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!(decodedToken.id || req.token)) {
    return res.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      users: user.id,
    });
    if (!blog.likes) {
      blog.likes = 0;
    }
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    res.status(201).json(result);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const { id } = req.params;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: title,
        author: author,
        url: url,
        likes: likes,
      },
      { new: true, runValidators: true, context: "query" }
    );
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
