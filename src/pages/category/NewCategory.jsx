import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance"
import addCategoryValidator from "../../validators/addCategoryValidator";

const initialFormData = {title: "", description: ""};
const initialFormError = {title: ""}


const NewCategory = () => {

  const [formData, setFormData] = useState(initialFormData)
  const [formError, setFormError] = useState(initialFormError)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = addCategoryValidator({title: formData.title})
    if(errors.title){
      setFormError(errors)
    }else {
      try{
        setLoading(true)

        //api request

        const response = await axios.post("/category", formData)
        const data = response.data 

        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        })

        setFormData(initialFormData)
        setFormError(initialFormError)
        setLoading(false)
        navigate("/categories")
        
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
  }

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>Go Back</button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">New Category</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Technology"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              placeholder="Lorem ipsum"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            {formError.description && <p className="error">{formError.description}</p>}
          </div>

          <div className="form-group">
            <input className="button" type="submit" value={`${loading ? "adding" : "add"}`} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategory;
