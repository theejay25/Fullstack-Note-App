import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try {
            
            const response = await axios.post(
                'http://localhost:8081/api/auth/signup',
                {name, email, password}
            )
            
             if( response.data.success) {
                navigate('/')
            }


            console.log(response)

            e.reset()

        }  catch (error) {
            console.error ('Error message:', error)
        }
    }
    
  return (
    <>
        <div className="flex justify-center items-center min-h-screen">
            <div className=" border-[#333] shadow p-6 w-80 bg-[#2c2c2c]">
            <h2 className="text-2xl text-white font-bold mb-4">Signup</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-500">Name</label>
                    <input 
                        type="text" 
                        name="" 
                        id="userName" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Username" 
                        autoComplete="off" 
                        className="w-full px-3 py-2 border-[#333] bg-[#323232]" required
                        />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-500">Email</label>
                    <input 
                        type="email" 
                        name="" 
                        id="email" 
                        value={email.toLowerCase()}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email" 
                        autoComplete="off" 
                        className="bg-[#323232] w-full px-3 py-2 border-[#333] mb-4" required
                        />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-500">Password</label>
                    <input 
                        type="password" 
                        name="" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********" 
                        autoComplete="new-password" 
                        className="bg-[#323232] mb-4 w-full px-3 py-2 border-[#333]"  required
                        />
                </div>
                
                <button 
                    className="bg-teal-900 py-2 w-full cursor-pointer mb-4 hover:bg-teal-800"
                    >SignUp
                </button>
                <p className="text-center">Already have an Account? 
                    <Link to={"/login"} > Sign In</Link>
                    </p>
            </form>
            </div>
        </div>    
    </>
  )
}

export default SignUp
