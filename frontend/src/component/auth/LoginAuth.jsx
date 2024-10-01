import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export default function LoginAuth() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData,setFormData]=useState({
        username:"",
        password:""
  })
   
  const [loading,setLoading]=useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const router=useNavigate()

  const [_,setCookies]=useCookies(["blog-token"])


  async function handlleSubmit(){
    setLoading(true);
       try{
             const apiResponse=await fetch("http://localhost:5000/api/auth/v1/login",{
                  method:'POST',
                  headers:{
                      'Content-Type':'application/json' 
                  },
                  body:JSON.stringify(formData)
             })

             const res=await apiResponse.json();
             if(!res.error){
             setCookies("blog-token",res.token);
             localStorage.setItem('userId',res.userId)

             }
            
             if(!res.error){
                  router('/createpost')
             }

             console.log(res);


       }catch(err){

        console.error(err.message); 

       }finally{
           setLoading(false);
       }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Login to your account and explore blogs</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="johndoe" required  value={formData.username} onChange={(e)=>setFormData({...formData,username:e.target.value})} />
              </div>
             
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required 
                    value={formData.password}
                    onChange={(e)=>setFormData({...formData,password:e.target.value})}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
         {loading ?   <Button className="w-full"><Loader2/></Button> :   <Button className="w-full" onClick={()=>handlleSubmit()} >Login</Button>}
          <p className="text-center mt-4">Don't have an account?<Link to={'/signup'} className='text-blue-500 text-xl'>SignUP</Link></p>
        </CardFooter>
      </Card>
    </div>
  )
}

