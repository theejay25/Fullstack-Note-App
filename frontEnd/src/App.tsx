// import axios from "axios"
// import { useEffect } from "react"
// import { Link } from "react-router-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Favorites from "./pages/Favorites"

function App() {

  // useEffect(() => {

  //   const fetch = async () => {
      
  //     try {
  //     const data = await axios.get('http://localhost:8080/me');
      
  //     console.log(data.data.fruit)
  //     } catch(error) {
  //       console.error('error message:', error)
  //     }

  //   }

  //   fetch()

  // }, [])



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<SignUp />} path="/signup"></Route>
          <Route element={<Dashboard />} path="/dashboard"></Route>
          <Route element={<Home />} path="/"></Route>
          <Route element={<Favorites />} path="/favorites"></Route>
        </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App


