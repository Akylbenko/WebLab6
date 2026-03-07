import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import { AuthContext } from "../../context/AuthContext"
import "./HomePage.css"

export default function HomePage() {
  const [articles, setArticles] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const res = await api.get("/api/articles/")
    setArticles(res.data)
  }

  return (
    <div className="container">
      <div className="home-header">
        <h1 className="home-title">Новости</h1>

        <div className="home-actions">
          {user && (
            <Link className="primary-link" to="/article/new">
              + Создать новость
            </Link>
          )}
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="empty">Пока новостей нет. Создай первую 🙂</div>
      ) : (
        <div className="grid">
          {articles.map((a) => (
            <Link key={a.id} className="card" to={`/article/${a.id}`}>
              <h3 className="card-title">{a.title}</h3>

              <div className="card-meta">
                <span>Автор: {a.author}</span>
                <span>{new Date(a.created_at).toLocaleString()}</span>
              </div>

              <p className="card-preview">
                {a.content.length > 140 ? a.content.slice(0, 140) + "..." : a.content}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}