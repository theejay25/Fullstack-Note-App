import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const VerifyEmail = () => {

    const navigate = useNavigate()
    const [code, setCode] = useState('')

    const handleSubmit = async (e: any) => {

        e.preventDefaut()

        const response = await axios.post('http://localhost:8081/api/auth/verify-email', {code})

        if(response.data.success) {
            navigate('/')
        }

    }

    return (
        <>
            <div className="flex h-full justify-center items-center">
                <div className="bg-[#2c2c2c] p-5 flex justify-center items-center flex-col">
                    <h2 className="text-white font-bold mb-5 text-2xl">Verify Email</h2>

                    <form action="" className="w-80" autoComplete="off" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="otp" className="text-gray-300 block mb-1 font-semibold">Verify</label>
                            <input 
                                type="text"
                                name="otp" 
                                id="otp"
                                onChange={(e: any) => setCode(e.target.value)}
                                className="bg-[#404040] p-3 text-white outline-none w-full mb-5"
                                placeholder="Enter OTP"
                             />

                             <button className="w-full p-3 bg-white text-black font-semibold cursor-pointer">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
    
}

export default VerifyEmail