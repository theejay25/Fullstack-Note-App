import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/ContextProvider"

function NavBar() {

    const [search, setSearch] = useState('')

    const  user  = useAuth()
  return (
    <div>
        <div className="p-4 inline-flex justify-between items-center bg-zinc-800 w-full">
            <p className="font-bold">Note App</p>
            <form action="">
                <input 
                    type="text" 
                    name="" 
                    id="" 
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-3 w-40 bg-[#2c2c2c] truncate lg:w-120"
                    placeholder="Search Notes"
                />
            </form>

            <div className="inline-flex gap-3 items-center lg:gap-10">
                {!user ?
                    (
                      <Link to={'/login'} className="bg-green-500 py-1 px-2 rounded-md">Log In</Link>
                    ):
                    (   <>
                            <p className="font-semibold">{user?.name}</p>
                            <Link to={'/login'} className="bg-red-500 py-1 px-2 rounded-md">Log Out</Link>  
                        </>
                    )
                }
            
            </div>
            
        </div>
    </div>
  )
}

export default NavBar