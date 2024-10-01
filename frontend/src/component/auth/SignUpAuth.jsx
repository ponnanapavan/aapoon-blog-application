import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUpAuth() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading,setLoading]=useState(false);

  const router=useNavigate();

  const [formData,setFormData]=useState({
         username:"",
         name:"",
         email:"",
         password:""
  })

 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  async function handleSubmit(){
    setLoading(true);
       try{
             const apiResponse=await fetch("http://localhost:5000/api/auth/v1/signup",{
                  method:'POST',
                  headers:{
                     'Content-Type':'application/json'
                  },
                  body:JSON.stringify(formData)
             })

             const data=await apiResponse.json();
             if(!data.error){
                  router('/login')
             }
             console.log(data)

       }catch(err){

        console.error(err.message);
          
       }finally{
           setLoading(false);
       }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="johndoe" required  value={formData.username} onChange={(e)=>setFormData({...formData,username:e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" required value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required 
                    value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}
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
            {loading ?<Button className="w-full" ><Loader2 className='animate-spin'/></Button>  :<Button className="w-full" onClick={()=>handleSubmit()}>Sign Up</Button> }
          
          <p className="text-center mt-4">Already have an account?<Link to={'/login'} className='text-blue-500 text-xl'>Login</Link></p>
        </CardFooter>
      </Card>
    </div>
  )
}

