import placeImage from "../../assets/images/place.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";

const DetailPost = () => {
  const navigate = useNavigate()
  const params = useParams()
  const postId = params.id

  const [post, setPost] = useState([])
  const [fileUrl, setFileUrl] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if(postId){
      const getPost = async() => {
        try{
          //api request
          const response = await axios.get(`/posts/${postId}`)
          const data = response.data.data
          console.log(data)
          toast.success(data.message,  {
            position: "top-right",
            autoClose: true,
          });  
          setPost(data.post)
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
    if(post && post?.file){
      const getFile = async () => {
        try{
          //api request
          const response = await axios.get(`/file/signed-url?key=${post.file.key}`)
          const data = response.data.data
          console.log(data)
          setFileUrl(data.url)
        }catch(error){
          const response = error.response
          const data = response.data
          toast.error(data.message,  {
            position: "top-right",
            autoClose: true,
          });
        }
      }
      getFile()
    }
  }, [post])

  const handleDelete = async () => {
    try{
      const response = await axios.delete(`/posts/${postId}`);
      setShowModal(false)
      const data = response.data
      toast.success(data.message,  {
        position: "top-right",
        autoClose: true,
      });

      navigate("/posts")

    }catch(error){
      setShowModal(false)
      const response = error.response
      const data = response.data
      toast.error(data.message,  {
        position: "top-right",
        autoClose: true,
    });
    }
  }


  return (
    <div>
      <button className="button button-block" onClick={() => {navigate(-1)}}>Go Back</button>
      <button className="button button-block" onClick={() => {navigate(`/posts/update-post/${postId}`)}}>Update Post</button>
      <button className="button button-block" onClick={() => setShowModal(true) }>Delete Post</button>
      <div className="detail-container">
        <h2 className="post-title">{post?.title}</h2>
        <h5 className="post-category">Category: {post?.category?.title}</h5>
        <h5 className="post-category">Created at:{moment(post?.createdAt).format("YYYY-MM-DD HH:mm:ss")}</h5>
        <h5 className="post-category">Updated at:{moment(post?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</h5>
        <p className="post-desc">
          {post?.description}
        </p>
        <img src={fileUrl} alt="mern" />
      </div>
      <Modal show={showModal} onHide={() => {
        setShowModal(false)
        }}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div style={{margin : "0"}}> 
            <Button className="no-button" onClick={() => {
              setShowModal(false)
              }}>No</Button>
            <Button className="yes-button" onClick={handleDelete}>Yes</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailPost;
