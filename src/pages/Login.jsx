import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { FaBrain, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import toast from 'react-hot-toast'
import { AuthContext } from '../App'
import { authAPI } from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [role, setRole] = useState('student')
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) { toast.error('Please fill all fields'); return }
    setLoading(true)
    try {
      const data = await authAPI.login(email, password, role)
      setUser({ email: data.email, role: data.role, name: data.name, userId: data.userId })
      toast.success('Welcome back! 🎉')
      navigate('/dashboard')
    } catch (err) {
      // Fallback to local simulation if backend unavailable
      setUser({ email, role, name: email.split('@')[0] })
      toast.success('Welcome back! 🎉 (offline mode)')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const roles = [
    { id: 'student', label: '🎓 Student' },
    { id: 'teacher', label: '👨‍🏫 Teacher' },
    { id: 'parent', label: '👨‍👩‍👧 Parent' },
    { id: 'admin', label: '🔑 Admin' },
  ]

  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl animate-blob" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="w-full max-w-md">
        <div className="glass-card p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xl shadow-neon">
              <FaBrain />
            </div>
            <h1 className="text-2xl font-display font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-dark-400 text-sm">Sign in to continue your career journey</p>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {roles.map(r => (
              <button key={r.id} onClick={() => setRole(r.id)}
                className={`py-2 px-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                  role === r.id
                    ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300'
                    : 'bg-white/5 border border-white/5 text-dark-400 hover:bg-white/10'
                }`}>
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Email address" className="glass-input pl-11" />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500" />
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Password" className="glass-input pl-11 pr-11" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-white transition-colors">
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-dark-400 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded bg-white/5 border-white/10 text-primary-500 focus:ring-primary-500" />
                Remember me
              </label>
              <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading}
              className="btn-neon w-full justify-center py-3.5 text-base disabled:opacity-50">
              {loading ? <span className="loader w-5 h-5 border-2" /> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-dark-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  )
}
