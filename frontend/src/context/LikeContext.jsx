import { createContext, useState } from "react"
import { useCookies } from "react-cookie";


const likeContext=createContext(null);



function LikeContextProvider({children}){

    const [cookies,_]=useCookies(['blog-token']);

    const [likes,setLikes]=useState([]);

      async function likePost(postId){
            try{
                   const apiResponse=await fetch(`http://localhost:5000/api/posts/v1/likepost/${postId}`,{
                       method:'POST',
                       headers:{
                          'Content-Type':'application/json',
                           'Authorization': `Bearer ${cookies['blog-token']}`
                       }
                           
                   })
                       const result=await apiResponse.json();
                       if(!result.error){
                           setLikes(result);
                       }

            }catch(err){
                  console.error(err.message);
                  
            }
      }
    return (
           <likeContext.Provider value={{likes,setLikes,likePost}}>
              {children}
           </likeContext.Provider>
    )

}

export {likeContext,LikeContextProvider};