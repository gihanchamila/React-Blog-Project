import { Routes, Route } from "react-router-dom";
import "react-toastify/ReactToastify.css"
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import PrivateLayout from "./components/layout/PrivateLayout";
import PublicLayout from "./components/layout/PublicLayout"
import CategoryList from "./pages/category/CategoryList"
import NewCategory from "./pages/category/NewCategory"
import UpdateCategory from "./pages/category/UpdateCategory";
import PostList from "./pages/post/PostList"
import NewPost from "./pages/post/NewPost"
import DetailPost from "./pages/post/DetailPost"
import UpdatePost from "./pages/post/UpdatePost"
import Profile from "./pages/Profile"
import Setting from "./pages/Setting"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import VerifyUser from "./pages/VerifyUser"
import ForgotPassword from "./pages/ForgotPassword"

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/new-category" element={<NewCategory />} />
          <Route path="categories/update-category/:id" element={<UpdateCategory />} />
          <Route path="posts" element={<PostList />} />
          <Route path="posts/new-post" element={<NewPost />} />
          <Route path="posts/detail-post/:id" element={<DetailPost />} />
          <Route path="posts/update-post/:id" element={<UpdatePost />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
          <Route path="verify-user" element={<VerifyUser/>} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />}/>
        </Route>
      </Routes>
      <ToastContainer />
    </>
    
  )
  
}

export default App;
