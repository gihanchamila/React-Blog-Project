import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance"
import { toast } from "react-toastify";
import changePasswordValidator from "../validators/changePasswordValidator";

const initialFormData = {oldPassword: "", newPassword: ""};
const initialFormError = {oldPassword: "", newPassword: ""}

const Setting = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData)
  const [formError, setFormError] = useState(initialFormError)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = changePasswordValidator(
      { 
        oldPassword: formData.oldPassword, 
        newPassword: formData. newPassword, 
      }
    )

    if(errors.oldPassword || errors.newPassword){
      setFormError(errors)
    }else {

      try{
        setLoading(true)

        //api request

        const response = await axios.put("/auth/change-password", formData)
        const data = response.data 

        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        })

        setFormData(initialFormData)
        setFormError(initialFormError)
        setLoading(false)
        
      }catch(error){
        setLoading(false)
        setFormError(initialFormError)
        const response = error.response
        const data = response.data
        toast.error(data.message,  {
          position: "top-right",
          autoClose: true,
        });
      }
    }

    console.log(formData)
  }

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>Go Back</button>
      <button className="button button-block" onClick={() => navigate("/verify-user")}>Verify user</button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Change Password</h2>
          <div className="form-group">
            <label>Old password</label>
            <input
              className="form-control"
              type="password"
              name="oldPassword"
              placeholder="***********"
              value={formData.oldPassword}
              onChange={handleChange}
            />
            {formError.oldPassword && <p className="error">{formError.oldPassword}</p>}
          </div>

          <div className="form-group">
            <label>New password</label>
            <input
              className="form-control"
              type="password"
              name="newPassword"
              placeholder="***********"
              value={formData.newPassword}
              onChange={handleChange}
            />
             {formError.newPassword && <p className="error">{formError.newPassword}</p>}
          </div>

          <div className="form-group">
            <input className="button" type="submit" value={`${loading ? `changing..` : `change`}`} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
