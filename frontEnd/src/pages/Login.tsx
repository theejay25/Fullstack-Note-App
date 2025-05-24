import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/ContextProvider"
// judeokocha06@gmail.com


const Login = () => {
    const navigate = useNavigate()
    const {login} = useAuth()
    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {email, password})

            if( response.data.success) {
                login(response.data.user)
                localStorage.setItem('token', response.data.token)
                navigate('/home')
            }

            console.log(response)
        } catch (error) {
            console.error('error message', error)
        }


    }

  return (
    <>
        <div className="flex justify-center items-center min-h-screen">

            <div className="bg-[#2c2c2c] p-6 w-80">
                <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
                
                <form action="" onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input 
                        required
                        type="email"
                        value={email.toLowerCase()} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#323232] p-2 w-full"
                        placeholder="Email"
                        autoComplete="off"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input 
                        required
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#323232] p-2 w-full"
                        placeholder="Password"
                        autoComplete="new-password"

                    />
                </div>
                <button
                    className="bg-teal-900 text-center cursor-pointer text-white w-full p-2 mb-4 hover:bg-teal-700"
                >Signin
                </button>
                <p className="text-center">Don't have existing Account?
                    <Link to={"/signup"} > Sign Up</Link>
                </p>
                </form>
            </div>

        </div>
    </>
  )
}

export default Login