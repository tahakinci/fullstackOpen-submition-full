const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      likes: 1,
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  const isUsernameUsed = await User.find({ username });
  console.log(isUsernameUsed);

  if (!(username && password)) {
    return res.status(400).json({ error: "username and password required" });
  }
  if (isUsernameUsed.length) {
    return res.status(400).json({ error: `'${username}' has already taken` });
  }
  if (username.length < 3 || password.length < 3) {
    return res
      .status(400)
      .json({ error: `username and password must have atleast 3 character` });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;
