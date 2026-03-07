import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000",
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let queue = []

const processQueue = (error, token = null) => {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve(token)))
  queue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const refresh = localStorage.getItem("refresh")

    if (error.response?.status === 401 && refresh && !original._retry) {
      original._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject })
        }).then((newToken) => {
          original.headers.Authorization = `Bearer ${newToken}`
          return api(original)
        })
      }

      isRefreshing = true
      try {
        const res = await axios.post("http://localhost:8000/api/token/refresh/", {
          refresh,
        })
        localStorage.setItem("access", res.data.access)
        processQueue(null, res.data.access)

        original.headers.Authorization = `Bearer ${res.data.access}`
        return api(original)
      } catch (e) {
        processQueue(e, null)
        localStorage.clear()
        return Promise.reject(e)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api