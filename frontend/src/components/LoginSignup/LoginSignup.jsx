import { useState, useContext } from "react"
import "./LoginSignup.css"
import user_icon from "../assets/person.png"
import password_icon from "../assets/password.png"
import api from "../../services/api"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function LoginSignup() {
  const [action, setAction] = useState("Вход")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  // login через JWT
  const handleLogin = async () => {
    try {
      const response = await api.post("/api/token/", {
        username,
        password,
      })

      login(response.data.access, response.data.refresh)
      navigate("/profile")

    } catch (error) {
      alert("Ошибка входа")
      console.log(error.response?.data)
    }
  }

  // регистрация
  const handleRegister = async () => {
    try {
      await api.post("/api/register/", {
        username,
        email,
        password,
      })

      alert("Регистрация успешна! Теперь войдите.")
      setAction("Вход")

      setUsername("")
      setPassword("")
      setEmail("")

    } catch (error) {
      alert("Ошибка регистрации")
      console.log(error.response?.data)
    }
  }

  // кнопка действия
  const handleAuthClick = () => {
    if (action === "Вход") handleLogin()
    else handleRegister()
  }

  // переключение режимов
  const handleModeClick = (mode) => {
    if (action === mode) handleAuthClick()
    else setAction(mode)
  }

  return (
    <div className="login-page">
      <div className="auth-container">

        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">

          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {action === "Регистрация" && (
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="email"
                placeholder="Почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

        </div>

        <div className="submit-container">

          <div
            className={action === "Регистрация" ? "submit" : "submit gray"}
            onClick={() => handleModeClick("Регистрация")}
          >
            Регистрация
          </div>

          <div
            className={action === "Вход" ? "submit" : "submit gray"}
            onClick={() => handleModeClick("Вход")}
          >
            Вход
          </div>

        </div>

      </div>
    </div>
  )
}