import React, { useContext, createContext, useState  } from "react"



const authContext = createContext<any>({ 
    user: null,
    login: () => {},
})

interface props {
    children?: React.ReactNode
}

function ContextProvider({ children }: props) {

    const [user, setUser] = useState(null)
    const login = (user: React.SetStateAction<null>) => {
        setUser(user)
    }

  return (
    <authContext.Provider value={{ user, login }}>
        {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)
export default ContextProvider