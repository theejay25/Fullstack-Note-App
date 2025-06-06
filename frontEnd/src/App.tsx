import axios from "axios"
import { useEffect } from "react"
// import { Link } from "react-router-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import VerifyEmail from "./pages/VerifyEmail"

function App() {

  useEffect(() => {

    const fetch = async () => {
      
      try {
      const data = await axios.get('http://localhost:8081/me');
      
      console.log(data)
      } catch(error) {
        console.error('error message:', error)
      }

    }

    fetch()

  }, [])



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/"></Route>
          <Route element={<SignUp />} path="/signup"></Route>
          <Route element={<Home />} path="/home"></Route>
          <Route element={<VerifyEmail />} path="/verify"></Route>
        </Routes>
        <ToastContainer /> 
      </BrowserRouter>
    </>
  )
}

export default App


