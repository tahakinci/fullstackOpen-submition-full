import { useState } from "react";

export const Blog = ({ blog, handleLikes, handleDelete, user }) => {
  const [display, setDisplay] = useState(false);
  const activeUser = localStorage.getItem("loggedBlogappUser");
  return (
    <div className="blog-container">
      <p>
        {blog.title} {blog.author}
        <button onClick={() => setDisplay(!display)}>
          {display ? "hide" : "view"}
        </button>
      </p>
      {display ? (
        <div className="toggle-content">
          <a href={blog.url}>{blog.url}</a>
          <div>
            <span className="like-amount">{blog.likes} </span>
            <button onClick={() => handleLikes(blog.id)}>like</button>
          </div>
        </div>
      ) : null}
      <button
        className={activeUser.includes(user.name) ? "" : "hidden"}
        onClick={() => handleDelete(blog.id)}
      >
        delete
      </button>
    </div>
  );
};
