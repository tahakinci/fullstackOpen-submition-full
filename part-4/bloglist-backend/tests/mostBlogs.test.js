const mostBlogs = require("../utils/list_helper").mostBlogs;

test("most blogs", () => {
  const blogList = [
    {
      author: "Robert C. Martin",
      blogs: 3,
    },
    {
      author: "test",
      blogs: 1,
    },
    {
      author: "testestron",
      blogs: 5,
    },
    {
      author: "testi",
      blogs: 4,
    },
    {
      author: "testo",
      blogs: 6,
    },
  ];

  expect(mostBlogs(blogList)).toEqual({ autor: "testo", blogs: 6 });
});
