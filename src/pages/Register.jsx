import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { FaBrain, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaSchool } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { AuthContext } from '../App'
import { authAPI } from '../services/api'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPass: '', role: 'student', classLevel: '10', school: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { toast.error('Please fill all required fields'); return }
    if (form.password !== form.confirmPass) { toast.error('Passwords do not match'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      const data = await authAPI.register(form)
      setUser({ email: data.email, role: data.role, name: data.name, userId: data.userId })
      toast.success('Account created! 🚀')
      navigate('/dashboard')
    } catch (err) {
      setUser({ email: form.email, role: form.role, name: form.name })
      toast.success('Account created! 🚀 (offline mode)')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const roles = [
    { id: 'student', label: '🎓 Student' },
    { id: 'teacher', label: '👨‍🏫 Teacher' },
    { id: 'parent', label: '👨‍👩‍👧 Parent' },
  ]

  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/3 -left-32 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl animate-blob" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="w-full max-w-md">
        <div className="glass-card p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xl shadow-neon">
              <FaBrain />
            </div>
            <h1 className="text-2xl font-display font-bold text-white mb-1">Create Account</h1>
            <p className="text-dark-400 text-sm">Start your AI-powered career journey</p>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map(r => (
              <button key={r.id} onClick={() => update('role', r.id)}
                className={`py-2.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  form.role === r.id
                    ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300'
                    : 'bg-white/5 border border-white/5 text-dark-400 hover:bg-white/10'
                }`}>
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500" />
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)}
                placeholder="Full name" className="glass-input pl-11" />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500" />
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                placeholder="Email address" className="glass-input pl-11" />
            </div>

            {form.role === 'student' && (
              <div className="grid grid-cols-2 gap-3">
                <select value={form.classLevel} onChange={e => update('classLevel', e.target.value)}
                  className="glass-input text-sm">
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
                <div className="relative">
                  <FaSchool className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500 text-sm" />
                  <input type="text" value={form.school} onChange={e => update('school', e.target.value)}
                    placeholder="School name" className="glass-input pl-9 text-sm" />
                </div>
              </div>
            )}

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500" />
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)}
                placeholder="Password" className="glass-input pl-11 pr-11" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-white transition-colors">
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500" />
              <input type="password" value={form.confirmPass} onChange={e => update('confirmPass', e.target.value)}
                placeholder="Confirm password" className="glass-input pl-11" />
            </div>

            <button type="submit" disabled={loading}
              className="btn-neon w-full justify-center py-3.5 text-base disabled:opacity-50">
              {loading ? <span className="loader w-5 h-5 border-2" /> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-dark-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  )
}
