import { useContext, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import api from "../../services/api"
import { AuthContext } from "../../context/AuthContext"
import "./ArticlePage.css"

export default function ArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [article, setArticle] = useState(null)
  const [myUsername, setMyUsername] = useState(null)

  useEffect(() => {
    fetchArticle()
    if (user) fetchMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user])

  const fetchArticle = async () => {
    const res = await api.get(`/api/articles/${id}/`)
    setArticle(res.data)
  }

  const fetchMe = async () => {
    try {
      const res = await api.get("/api/me/")
      setMyUsername(res.data.username)
    } catch {
      setMyUsername(null)
    }
  }

  const deleteArticle = async () => {
    try {
      await api.delete(`/api/articles/${id}/`)
      navigate("/")
    } catch (e) {
      alert("Нет прав на удаление (только автор/админ).")
    }
  }

  if (!article) return <div className="container">Loading...</div>

  const canEdit = user && myUsername && myUsername === article.author

  return (
    <div className="container">
      <div className="article-wrap">
        <div className="article-top">
          <Link className="back-link" to="/">← Назад</Link>

          {canEdit && (
            <div className="article-actions">
              <Link className="action-link" to={`/article/${id}/edit`}>
                Редактировать
              </Link>
              <button className="danger-btn" onClick={deleteArticle}>
                Удалить
              </button>
            </div>
          )}
        </div>

        <h1 className="article-title">{article.title}</h1>

        <div className="article-meta">
          <span>Автор: {article.author}</span>
          <span>{new Date(article.created_at).toLocaleString()}</span>
        </div>

        <div className="article-content">{article.content}</div>
      </div>
    </div>
  )
}