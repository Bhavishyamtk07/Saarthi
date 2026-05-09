import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState, createContext } from 'react'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingChatButton from './components/FloatingChatButton'
import ParticleBackground from './components/ParticleBackground'

import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import CareerTest from './pages/CareerTest'
import Results from './pages/Results'
import Dashboard from './pages/Dashboard'
import ExploreCareer from './pages/ExploreCareer'
import AIMentor from './pages/AIMentor'
import Roadmap from './pages/Roadmap'
import Contact from './pages/Contact'

export const AuthContext = createContext(null)
export const ThemeContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(true)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <div className={darkMode ? 'dark' : ''}>
          <Router>
            <div className="min-h-screen bg-dark-950 text-white relative overflow-hidden">
              <ParticleBackground />
              <Navbar />
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: 'rgba(15, 23, 42, 0.9)',
                    color: '#f8fafc',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    backdropFilter: 'blur(20px)',
                  },
                }}
              />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/career-test" element={<CareerTest />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/explore" element={<ExploreCareer />} />
                  <Route path="/ai-mentor" element={<AIMentor />} />
                  <Route path="/roadmap" element={<Roadmap />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </AnimatePresence>
              <FloatingChatButton />
              <Footer />
            </div>
          </Router>
        </div>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
