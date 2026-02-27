import { createContext, useState } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("access") ? true : false
  )

  const login = (access, refresh) => {
    localStorage.setItem("access", access)
    localStorage.setItem("refresh", refresh)
    setUser(true)
  }

  const logout = () => {
    localStorage.clear()
    setUser(false)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}