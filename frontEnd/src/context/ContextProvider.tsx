import React, { useContext, createContext, useState  } from "react"

interface authContextProps {
    user: any,
    login:(user: any) => void,
    logout: () => void,
}


const authContext = createContext<authContextProps>({ 
    user: null,
    login: () => {},
    logout: () => {}
})

interface props {
    children?: React.ReactNode
}

function ContextProvider({ children }: props) {

    const [user, setUser] = useState(null)
    const login = (user: React.SetStateAction<null>) => {
        setUser(user)
    }
    const logout = () => {
        setUser(null)
    }

  return (
    <authContext.Provider value={{ user, login, logout }}>
        {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)
export default ContextProvider