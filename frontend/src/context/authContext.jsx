import { createContext, useEffect, useState } from "react"
import axios from 'axios'

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null)

    const signIn = async (login, password) => {

        const url = "http://localhost:5151/api/auth/login"
        const data = { login, password }

        const response = await axios.post(url, data)
        const { token, ...others } = response.data
        localStorage.setItem("authToken", token)

        setAuthToken(token)
        setCurrentUser(others)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    useEffect(() => {
        localStorage.setItem("authToken", authToken)
    }, [authToken])

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider