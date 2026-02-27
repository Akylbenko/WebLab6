import { useEffect, useState, useContext } from "react"
import api from "../../services/api"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "./Profile.css"

export default function Profile() {
  const [user, setUser] = useState(null)
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get("/api/me/")
      setUser(response.data)
    } catch (err) {
      console.log(err)
      logout()
      navigate("/login")
    }
  }

  if (!user) return <div className="profile-loading">Loading...</div>

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Профиль</h2>

        <div className="profile-info">
          <p>
            <strong>Username:</strong> {user.username}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <button className="profile-logout-btn" onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  )
}