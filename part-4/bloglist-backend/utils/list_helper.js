const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0);
};

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });

  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  const mostBlogs = blogs.reduce((prev, current) => {
    return prev.blogs > current.blogs ? prev : current;
  });
  return mostBlogs;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
