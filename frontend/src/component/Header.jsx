import { Button } from '@/components/ui/button'
import React from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const [cookies,setCookies]=useCookies(['blog-token'])
  const router=useNavigate();
  if(!cookies['blog-token']){
      router('/login')
  }

  async function handleLogout(){
    
       try{
             const apiResponse=await fetch('http://localhost:5000/api/auth/v1/logout',{
                method:'POST'
             })
                const res=await apiResponse.json();
                setCookies('blog-token',null);
                router('/login');

       }catch(err){
           console.error(err.message);
       }
  }
      
  return (
    <div className='w-full sticky z-10 top-0 left-0 flex justify-between items-center p-4 h-20 border-b-2 border-gray-200 backdrop-brightness-200'>


        <h1 className='text-3xl font-bold'>Blog-app</h1>

        <div >
            <ul className='flex gap-10 text-xl cursor-pointer '>
              
                <Link to={'/getAllPosts'}><li className='hover:font-bold'>Explore Posts</li></Link>
               
                <Link to={'/createpost'}> <li className='hover:font-bold'>Create post</li></Link>
            
            </ul>
        </div>


       <div className='flex gap-5'>

      {cookies['blog-token'] ?  <Button onClick={()=>handleLogout()}>Logout</Button> :   <Link to={'/signup'}><Button className='w-full p-6 text-xl'>Sign In</Button></Link> }
   
    
       </div>
          
         
      
    </div>
  )
}

export default Header
