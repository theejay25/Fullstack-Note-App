import axios from "axios"
import { useEffect } from "react"
// import { Link } from "react-router-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

function App() {

  useEffect(() => {

    const fetch = async () => {
      
      try {
      const data = await axios.get('http://localhost:8080/api/auth/users');
      
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
          <Route element={<Login />} path="/login"></Route>
          <Route element={<SignUp />} path="/signup"></Route>
        </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App


