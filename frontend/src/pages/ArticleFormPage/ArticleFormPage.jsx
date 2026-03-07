import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../services/api"
import "./ArticleFormPage.css"

export default function ArticleFormPage({ mode }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    if (mode === "edit") loadArticle()
  }, [])

  const loadArticle = async () => {
    const res = await api.get(`/api/articles/${id}/`)
    setTitle(res.data.title)
    setContent(res.data.content)
  }

  const submit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Заполни заголовок и текст новости")
      return
    }

    if (mode === "create") {
      await api.post("/api/articles/", { title, content })
    } else {
      await api.put(`/api/articles/${id}/`, { title, content })
    }

    navigate("/")
  }

  return (
    <div className="container">
      <div className="form-wrap">
        <h1 className="form-title">
          {mode === "create" ? "Создать новость" : "Редактировать новость"}
        </h1>

        <div className="field">
          <div className="label">Заголовок</div>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Напишите заголовок..."
          />
        </div>

        <div className="field">
          <div className="label">Текст новости</div>
          <textarea
            className="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Напишите текст..."
          />
        </div>

        <div className="actions">
          <button className="btn secondary" onClick={() => navigate(-1)}>
            Отмена
          </button>
          <button className="btn primary" onClick={submit}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}