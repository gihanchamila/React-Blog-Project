import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance"

onst initialFormData = {title: "", description: "", category: ""};
const initialFormError = {title: "", category: ""}


const NewPost = () => {

  const [formData, setFormData] = useState(initialFormData)
  const [formError, setFormError] = useState(initialFormError)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  return (
    <div>
      <button className="button button-block" onClick={() => {navigate(-1)}}>Go Back</button>
      <div className="form-container">
        <form className="inner-container">
          <h2 className="form-title">New Post</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="React blog post"
              value={formData.title}
              onChange={handleChange}
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
            <input className="button" type="submit" value="Add" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
