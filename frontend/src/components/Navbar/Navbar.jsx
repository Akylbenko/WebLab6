import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./Navbar.css"

export default function Navbar() {

  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="navbar">

      <div className="nav-left">
        <Link to="/" className="logo">
          NewsSite
        </Link>
      </div>

      <div className="nav-right">

        {!user && (
          <Link to="/login" className="nav-btn">
            Вход
          </Link>
        )}

        {user && (
          <>
            <Link to="/article/new" className="nav-btn">
              Создать
            </Link>

            <Link to="/profile" className="nav-btn">
              Профиль
            </Link>

            <button className="nav-btn logout" onClick={handleLogout}>
              Выйти
            </button>
          </>
        )}

      </div>

    </div>
  )
}