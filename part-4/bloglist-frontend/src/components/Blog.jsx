import { useState } from "react";

export const Blog = ({ blog, handleLikes, handleDelete }) => {
  const [display, setDisplay] = useState(false);

  return (
    <div className="border">
      <p>
        {blog.title} {blog.author}
        <button onClick={() => setDisplay(!display)}>
          {display ? "hide" : "view"}
        </button>
      </p>
      {display ? (
        <div className="toggle-content">
          <a href={blog.url}>{blog.url}</a>
          <p>
            {blog.likes}{" "}
            <button onClick={() => handleLikes(blog.id)}>like</button>
          </p>
        </div>
      ) : null}
      <button onClick={() => handleDelete(blog.id)}>delete</button>
    </div>
  );
};
