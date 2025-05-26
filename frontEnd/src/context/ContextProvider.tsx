import axios from "axios"
import React, { useContext, createContext, useState, useEffect  } from "react"

interface authContextProps {
    user: any,
    login:(user: any) => void,
    handleLogout: () => void,
}


const authContext = createContext<authContextProps>({ 
    user: null,
    login: () => {},
    handleLogout: () => {}
})

interface props {
    children?: React.ReactNode
}

function ContextProvider({ children }: props) {

    const [user, setUser] = useState(null)
    const login = (user: React.SetStateAction<null>) => {
        setUser(user)
    }

     const handleLogout = () => {
        localStorage.removeItem('token')
        setUser (null)
    }

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axios.get('http://localhost:8081/api/auth/verify', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                

                if (res.data.success) {
                    setUser(res.data.user)
                } else {
                    setUser(null)
                }
            } catch (error) {
                console.error(error)
            }
        }
        verifyUser()
    }, [])

  return (
    <authContext.Provider value={{ user, login,  handleLogout }}>
        {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)
export  {ContextProvider as default}