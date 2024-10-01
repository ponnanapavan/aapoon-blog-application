import LoginAuth from "./component/auth/LoginAuth"
import SignUpAuth from "./component/auth/SignUpAuth"
import Header from "./component/Header"
import { Routes, Route } from "react-router-dom"
import PostCreate from "./component/postComponent/PostCreate"
import GetAllPosts from "./component/postComponent/GetAllPosts"
import UpdatePost from "./component/postComponent/UpdatePost"
function App() {
 

  return (
    <>
       <Header/>
       <Routes>
           <Route path="/signup" element={<SignUpAuth/>}/>
           <Route path="/login" element={<LoginAuth/>}/>
           <Route path="/createpost" element={<PostCreate/>}/>
           <Route path="/getAllPosts" element={<GetAllPosts/>}/>
           <Route path="/updatePost/:postId" element={<UpdatePost/>}/>
       </Routes>
    </>
  )
}

export default App
