import { useNavigate } from "react-router-dom";
const UpdatePost = () => {
  const navigate = useNavigate()
  return (
    <div>
      <button className="button button-block" onClick={() => {navigate(-1)}}>Go Back</button>
      <div className="form-container">
        <form className="inner-container">
          <h2 className="form-title">Update Post</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="React blog post"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              name="desc"
              placeholder="Lorem ipsum"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Select an image</label>
            <input
              className="form-control"
              type="file"
              name="file"
              placeholder="Lorem ipsum"
            />
          </div>

          <div className="form-group">
            <label>Select a category</label>
            <select className="form-control" name="category">
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
          </div>

          <div className="form-group">
            <input className="button" type="submit" value="Update" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
