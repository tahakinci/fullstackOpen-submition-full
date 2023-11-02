export const NewBlogForm = ({ createBlog }) => {
  const addBlog = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = {
      title: formData.get("form-title"),
      author: formData.get("form-author"),
      url: formData.get("form-url"),
    };
    createBlog(obj);
  };

  return (
    <form onSubmit={addBlog}>
      <label htmlFor="form-title">Title</label>
      <input type="text" id="form-title" name="form-title" />
      <label htmlFor="form-author">Author</label>
      <input type="text" id="form-author" name="form-author" />
      <label htmlFor="form-url">Url</label>
      <input type="text" id="form-url" name="form-url" />
      <button type="submit">create</button>
    </form>
  );
};
