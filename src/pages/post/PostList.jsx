import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance"

const PostList = () => {

  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState([])
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {

    const getPosts = async () => {

      try{

        setLoading(true)

        // api request
        const response = await axios.get(`/posts?page=${currentPage}&q=${searchValue}`)
        const data = response.data.data
        setPosts(data.posts)
        setTotalPage(data.pages)
        setLoading(false)
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
    getPosts()

  }, [currentPage]);

  useEffect(() => {
    if(totalPage > 1){
      let tempPageCount = [];

      for(let i = 1; i <= totalPage; i++){
        tempPageCount = [...tempPageCount, i];
      }
      setPageCount(tempPageCount)
    }else{
      setPageCount([])
    }
  }, [totalPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1)
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1)
  };

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  const handleSearch = async(e) => {
    try{

      const input = e.target.value
      setSearchValue(input);

      const response = await axios.get(`/category?q=${input}&page=${currentPage}`)
      const data = response.data.data
      console.log(data)

      setPosts(data.categories)
      setTotalPage(data.pages)
    }catch(error){
      const response = error.response
      const data = response.data
      toast.error(data.message,  {
        position: "top-right",
        autoClose: true,
      });
    }
  };


  const navigate = useNavigate()
  return (
    <div>
      <button className="button button-block" onClick={() => {navigate("new-post")}}>Add New Post</button>
      <h2 className="table-title">Post list</h2>

      <input
        className="saerch-input"
        type="text"
        name="search"
        placeholder="Search here"
        onChange={handleSearch}
      />

      <div className="flexbox-container wrap">
        {loading ? "Loading" : 
          posts.map((post) => (
            <div key={post._id} className="post-card" onClick={() => {navigate(`detail-post/${post._id}`)}}>
            <h4 className="card-title">{post.title}</h4>
            <p className="card-desc">
              {post.description.substring(0, 2)}
            </p>
          </div>
          ))
        }
      </div>
      {pageCount.length > 0 && (
        <div className="pag-container">
        <button className="pag-button" onClick={handlePrev} disabled={currentPage === 1}>prev</button>
        {pageCount.map((pageNumber, index) => (
          <button className="pag-button" key={index} onClick={() => handlePage(pageNumber)} style={{backgroundColor : currentPage === pageNumber ? "#ccc" : ""}}>{pageNumber}</button>
        ))}
        <button className="pag-button" onClick={handleNext} disabled={currentPage === totalPage}>next</button>
      </div>
      )}
    </div>
  );
};

export default PostList;
