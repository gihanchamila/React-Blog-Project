import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance"
import addPostValidator from "../../validators/addPostValidator"

const initialFormData = {title: "", description: "", category: ""};
const initialFormError = {title: "", category: ""}

const UpdatePost = () => {
  const navigate = useNavigate()
  const params = useParams()
  const postId = params.id

  const [formData, setFormData] = useState(initialFormData)
  const [formError, setFormError] = useState(initialFormError)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [isDisable, setIsDisable] = useState(false)
  const [fileId, setFileId] = useState(null)
  const [extensionError, setExtensionError] = useState(null)

  useEffect(() => {
    if(postId){
      const getPost = async() => {
      try{
        const response = await axios.get(`/posts/${postId}`)
        const data = response.data.data

        setFormData({
            title : data.post.title, 
            description : data.post.description,
            file : data.post?.file?._id,
            category : data.post.category._id
        })
      }catch(error){
        const response = error.response
        const data = response.data
        toast.error(data.message,  {
          position: "top-right",
          autoClose: true,
        });
      }
      }
      getPost()
    }
  }, [postId])

  useEffect(() => {
    const getCategories = async () => {
      try {
        // api request
        const response = await axios.get(`/category`);
        const data = response.data.data;
        setCategories(data.categories);
      } catch (error) {
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    };

    getCategories();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = addPostValidator({title: formData.title, description: formData.description, category : formData.category})
    if(errors.title || errors.category){
      setFormError(errors)
    }else {
      try{
        setLoading(true)
        let input = formData

        if(fileId){
          input = {...input, file : fileId}
        }
        //api request

        const response = await axios.put(`/posts/${postId}`, input)
        const data = response.data 

        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        })

        setFormData(initialFormData)
        setFormError(initialFormError)
        setLoading(false)
        navigate(`/posts/detail-post/${postId}`)
        
      }catch(error){
        setLoading(false)
        const response = error.response
        const data = response.data
        toast.error(data.message,  {
          position: "top-right",
          autoClose: true,
        });
      }
    }
  };

  const handleFileChange = async (e) => {
    const formInput = new FormData();
    formInput.append("image", e.target.files[0]);

    const type = e.target.files[0].type;

    if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
      setExtensionError(null);

      try {
        setIsDisable(true);
        // api request
        const response = await axios.post("/file/upload", formInput);
        const data = response.data;
        setFileId(data.data.id);
        console.log(data)
        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        setIsDisable(false);
      } catch (error) {
        setLoading(false)
        setIsDisable(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    } else {
      setExtensionError("Only .png or .jpg or .jpeg file allowed");
    }
  };

  return (
    <div>
      <button className="button button-block" onClick={() => {navigate(-1)}}>Go Back</button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Update Post</h2>

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
            {formError.title && <p className="error">{formError.title}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              name="description"
              placeholder="Lorem ipsum"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            {formError.description && <p className="error">{formError.description}</p>}
          </div>

          <div className="form-group">
            <label>Select an image</label>
            <input
              className="form-control"
              type="file"
              name="file"
              placeholder="Lorem ipsum"
              value={formData.file}
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <label>Select a category</label>
            <select 
            className="form-control" 
            name="category" 
            value={formData.category}
            onChange={handleChange}>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.title}</option>
              ))}
            </select>
            {formError.category && <p className="error">{formError.category}</p>}
          </div>

          <div className="form-group">
            <input className="button" type="submit"  value={`${loading ? "updating..." : "update"}`}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
