const favoriteBlog = require("../utils/list_helper").favoriteBlog;

test("is favorite", () => {
  const list = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
    {
      title: "some blog",
      author: "some guy",
      likes: 5,
    },
    {
      title: "other blog",
      author: "other guy",
      likes: 3,
    },
  ];

  expect(favoriteBlog(list)).toEqual({
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
  });
});
