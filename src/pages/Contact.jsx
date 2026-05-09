import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import toast from 'react-hot-toast'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

const contactInfo = [
  { icon: FaEnvelope, label: 'Email', value: 'hello@saarthi-ai.in', color: 'text-primary-400', bg: 'bg-primary-500/10' },
  { icon: FaPhone, label: 'Phone', value: '+91 98765 43210', color: 'text-accent-400', bg: 'bg-accent-500/10' },
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Bengaluru, Karnataka, India', color: 'text-neon-green', bg: 'bg-green-500/10' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { toast.error('Please fill required fields'); return }
    setLoading(true)
    setTimeout(() => { toast.success('Message sent! We\'ll respond shortly 🚀'); setForm({ name: '', email: '', subject: '', message: '' }); setLoading(false) }, 1200)
  }

  return (
    <main className="relative z-10 pt-24 px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold mb-4"><HiSparkles /> GET IN TOUCH</span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Contact <span className="gradient-text">Us</span></h1>
          <p className="text-dark-400 max-w-xl mx-auto">Have questions about Saarthi AI? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((c, i) => (
              <motion.div key={c.label} variants={fadeUp} initial="hidden" animate="visible" custom={i} className="glass-card p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center ${c.color} text-xl`}><c.icon /></div>
                <div><p className="text-dark-400 text-xs">{c.label}</p><p className="text-white font-medium text-sm">{c.value}</p></div>
              </motion.div>
            ))}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="glass-card p-6">
              <h3 className="text-white font-semibold mb-3">Office Hours</h3>
              <div className="space-y-2 text-sm text-dark-400">
                <p>Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                <p>Sat: 10:00 AM - 2:00 PM IST</p>
                <p>Sun: Closed</p>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="lg:col-span-2 glass-card p-8">
            <h2 className="text-xl font-display font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name *" className="glass-input" />
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="Email address *" className="glass-input" />
              </div>
              <input type="text" value={form.subject} onChange={e => update('subject', e.target.value)} placeholder="Subject" className="glass-input" />
              <textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Your message *" rows="5" className="glass-input resize-none" />
              <button type="submit" disabled={loading} className="btn-neon inline-flex items-center gap-2 disabled:opacity-50">
                {loading ? <span className="loader w-5 h-5 border-2" /> : <><FaPaperPlane /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
