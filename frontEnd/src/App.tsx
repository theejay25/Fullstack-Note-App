import axios from "axios"
import { useEffect } from "react"
// import { Link } from "react-router-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"

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
        </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App


