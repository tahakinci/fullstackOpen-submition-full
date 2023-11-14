import { useState, useEffect, useRef } from "react";
import { Blog } from "./components/Blog";
import { setToken, getAll, create, update, erase } from "./services/blogs";
import { login } from "./services/login";
import { Login } from "./components/Login";
import { NewBlogForm } from "./components/NewBlogForm";
import { Notification } from "./components/Notification";
import { Togglable } from "./components/Togglable";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const blogFormRef = useRef();

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  // useEffect(() => {
  //   function compareByLikes(a, b) {
  //     if (a.likes > b.likes) return 1;
  //     else if (a.likes < b.likes) -1;
  //     return 0;
  //   }

  //   setBlogs(blogs.sort(compareByLikes));
  // }, [blogs]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification(["success", `${user.username} has succesfully loged in`]);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification(["error", "Wrong username or password"]);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibilty;
    try {
      const response = await create(blogObject);
      setBlogs([...blogs, response]);
      setNotification([
        "success",
        `a new blog "${blogObject.title}" by ${blogObject.author} added`,
      ]);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification(["error", `An error occurred while creating a new blog`]);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleLikes = async (id) => {
    try {
      const blog = blogs.find((blog) => id === blog.id);
      const newObj = { ...blog, likes: blog.likes + 1 };
      const response = await update(id, newObj);
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== newObj.id ? blog : response
      );
      setBlogs(updatedBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    await erase(id);
    const newArray = blogs.filter((blog) => blog.id !== id);
    setBlogs(newArray);
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: !loginVisible ? "none " : "" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <h2>Login to Application</h2>
          <Login
            username={username}
            password={password}
            handleLogin={handleLogin}
            handlePasswordChange={(e) => setPassword(e.target.value)}
            handleUsernameChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const noteForm = () => (
    <Togglable buttonLabel={"new blog"} ref={blogFormRef}>
      <NewBlogForm createBlog={addBlog} />
    </Togglable>
  );

  return (
    <div>
      <Notification message={notification} />
      <h2>blogs</h2>
      {user ? (
        <div>
          <span>{user.name} logged in</span>{" "}
          <button onClick={handleLogout}>logout</button>
          {noteForm()}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={blog.user}
              handleDelete={handleDelete}
              handleLikes={handleLikes}
            />
          ))}
        </div>
      ) : (
        loginForm()
      )}
    </div>
  );
};

export default App;
