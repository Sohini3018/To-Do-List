import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)
    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider