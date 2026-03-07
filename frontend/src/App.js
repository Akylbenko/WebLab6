import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import LoginSignup from "./components/LoginSignup/LoginSignup"
import Profile from "./components/Profile/Profile"
import ProtectedRoute from "./components/ProtectedRoute"
import HomePage from "./pages/HomePage/HomePage"
import ArticlePage from "./pages/ArticlePage/ArticlePage"
import ArticleFormPage from "./pages/ArticleFormPage/ArticleFormPage"
import Navbar from "./components/Navbar/Navbar"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginSignup />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
            
          />
          <Route path="/" element={<HomePage />} />

          <Route path="/article/:id" element={<ArticlePage />} />

          <Route
          path="/article/new"
          element={
            <ProtectedRoute>
              <ArticleFormPage mode="create"/>
            </ProtectedRoute>
          }
          />

          <Route
          path="/article/:id/edit"
          element={
            <ProtectedRoute>
              <ArticleFormPage mode="edit"/>
            </ProtectedRoute>
          }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App