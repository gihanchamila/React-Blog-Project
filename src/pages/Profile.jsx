import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance"
import { toast } from "react-toastify";
import profileValidator from "../validators/profileValidator";

const initialFormData = {name: "", email: ""};
const initialFormError = {name: "", email: ""}


const Profile = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [formError, setFormError] = useState(initialFormError)
  const [oldEmail, setOldEmail] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      try {
        // api request
        const response = await axios.get(`/auth/current-user`);
        const data = response.data.data;
        setFormData({name: data.user.name, email: data.user.email})
      } catch (error) {
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    };

    getUser();
  }, []);


  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = profileValidator(
      { 
        name: formData.name,
        email: formData.email, 
      }
    )

    if(errors.name || errors.email){
      setFormError(errors)
    }else {

      try{
        setLoading(true)

        //api request

        const response = await axios.put("/auth/update-profile", formData)
        const data = response.data 
        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        })
        setFormError(initialFormError)
        setLoading(false)

        if(oldEmail !== formData.email){
          window.localStorage.removeItem("blogData")
          navigate("/login")
        }
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
          <h2 className="form-title">Update profile</h2>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Jhon Doe"
              value={formData.name}
              onChange={handleChange}
            />
            {formError.name && <p className="error">{formError.name}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="doe@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
            {formError.email && <p className="error">{formError.email}</p>}
          </div>

          <div className="form-group">
            <input className="button" type="submit" value="Update" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
