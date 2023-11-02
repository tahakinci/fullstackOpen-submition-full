const Blogs = require("../models/blog");

const notesInDb = async () => {
  const blogs = await Blogs.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { notesInDb };
