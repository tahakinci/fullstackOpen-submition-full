const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);
describe("When you use get method", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("number of blogs in database is match", async () => {
    const blogsInMongoDB = await helper.notesInDb();

    expect(blogsInMongoDB).toHaveLength(blogsInMongoDB.length);
  });

  test("api items has id property", async () => {
    const blogsInMongoDB = await helper.notesInDb();
    const result = blogsInMongoDB.every((item) => item.hasOwnProperty("id"));
    expect(result).toBe(true);
  });
});

describe("When you use POST method", () => {
  test("new blog successfully added", async () => {
    const blogInDBBefore = await helper.notesInDb();
    const newBlog = {
      title: "this is a test",
      author: "tester",
      url: "http://example.com",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogInDBAfter = await helper.notesInDb();

    await expect(blogInDBAfter).toHaveLength(blogInDBBefore.length + 1);
  });

  test("missing property of likes get value zero", async () => {
    const newBlog = {
      title: "this is a test",
      author: "tester",
      url: "http://example.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogInDBAfter = await helper.notesInDb();
    await expect(blogInDBAfter.at(-1).likes).toBe(0);
  });

  test("missing any of title, author, url properties caused 404 error", async () => {
    const newBlog = {
      title: "this is a test",
      url: "http://example.com",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("When you use DELETE or PUT Method", () => {
  test("the blog successfully deleted", async () => {
    const blogsAtStart = await helper.notesInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/notes/${blogToDelete.id}`).expect(204);
  });

  test("the blog successfully updated", async () => {
    const blogsAtStart = await helper.notesInDb();
    const blogToUpdate = blogsAtStart[0];
    await api.put(`/api/notes/${blogToUpdate.id}`).expect(200);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
