import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaPaperPlane, FaMicrophone, FaUser, FaLightbulb } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import { chatAPI } from '../services/api'

const suggestedPrompts = [
  '🎓 What career suits my personality?',
  '📚 Which stream should I choose after 10th?',
  '💰 Top high-salary careers in India?',
  '🤖 How to become an AI engineer?',
  '🏥 Is medical a good career choice?',
  '📝 How to prepare for JEE/NEET?',
]

const initialMessages = [
  {
    role: 'ai',
    text: "Namaste! 🙏 I'm **Saarthi**, your AI career mentor. I'm here to help you discover the perfect career path, choose the right stream, prepare for exams, and guide you through your academic journey.\n\nHow can I help you today?",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
]

const aiResponses = {
  career: "Based on common student profiles, here are some trending career paths:\n\n🤖 **AI/ML Engineer** — ₹8-25 LPA\n📊 **Data Scientist** — ₹7-22 LPA\n💻 **Software Developer** — ₹6-20 LPA\n🏥 **Doctor (MBBS)** — ₹8-30 LPA\n⚖️ **Lawyer** — ₹5-15 LPA\n\nTake our career assessment for a personalized recommendation! Would you like to know more about any of these?",
  stream: "Choosing the right stream after 10th is crucial! Here's a quick guide:\n\n📐 **Science (PCM)** — Engineering, Technology, Research\n🔬 **Science (PCB)** — Medicine, Pharmacy, Biotechnology\n📈 **Commerce** — Business, Finance, CA, Banking\n🎨 **Arts/Humanities** — Law, Design, Media, Civil Services\n\nYour choice should align with your interests, not just job prospects. What subjects do you enjoy the most?",
  default: "That's a great question! Let me think about this... 🤔\n\nI'd recommend taking our AI-powered career assessment first — it will help me understand your personality, interests, and strengths better so I can give you more personalized advice.\n\nIn the meantime, feel free to ask me about:\n• Career options after 10th/12th\n• Exam preparation tips\n• College recommendations\n• Scholarship opportunities\n• Skill development resources"
}

function getAIResponse(msg) {
  const lower = msg.toLowerCase()
  if (lower.includes('career') || lower.includes('salary') || lower.includes('job')) return aiResponses.career
  if (lower.includes('stream') || lower.includes('10th') || lower.includes('choose')) return aiResponses.stream
  return aiResponses.default
}

export default function AIMentor() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = async (text) => {
    if (!text.trim()) return
    const userMsg = { role: 'user', text: text.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(m => [...m, userMsg])
    setInput('')
    setTyping(true)

    try {
      const data = await chatAPI.send(text.trim(), 'session-1')
      const aiMsg = { role: 'ai', text: data.response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      setMessages(m => [...m, aiMsg])
    } catch (err) {
      // Fallback to local response
      const aiMsg = { role: 'ai', text: getAIResponse(text), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      setMessages(m => [...m, aiMsg])
    } finally {
      setTyping(false)
    }
  }

  const handleSubmit = (e) => { e.preventDefault(); sendMessage(input) }

  return (
    <main className="relative z-10 pt-20 h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 bg-dark-950/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-neon">
            <FaRobot />
          </div>
          <div>
            <h1 className="text-white font-semibold flex items-center gap-2">
              Saarthi AI Mentor <HiSparkles className="text-primary-400" />
            </h1>
            <p className="text-dark-400 text-xs">Online • AI-powered career guidance</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm flex-shrink-0 mt-1">
                    <FaRobot />
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary-500/20 border border-primary-500/30 text-white rounded-br-md'
                      : 'glass-card text-dark-200 rounded-bl-md'
                  }`}>
                    {msg.text.split('\n').map((line, j) => (
                      <p key={j} className={j > 0 ? 'mt-2' : ''}>
                        {line.split(/(\*\*.*?\*\*)/).map((part, k) =>
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={k} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                            : part
                        )}
                      </p>
                    ))}
                  </div>
                  <p className="text-dark-500 text-[10px] mt-1 px-1">{msg.time}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-dark-300 text-sm flex-shrink-0 mt-1">
                    <FaUser />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm">
                <FaRobot />
              </div>
              <div className="glass-card px-5 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <div className="max-w-4xl mx-auto">
            <p className="text-dark-400 text-xs mb-2 flex items-center gap-1"><FaLightbulb className="text-yellow-400" /> Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map(p => (
                <button key={p} onClick={() => sendMessage(p)}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-dark-300 text-xs hover:bg-primary-500/10 hover:border-primary-500/30 hover:text-white transition-all">
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-4 border-t border-white/5 bg-dark-950/80 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3">
          <button type="button" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-dark-400 hover:text-white hover:bg-white/10 transition-all flex-shrink-0">
            <FaMicrophone />
          </button>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            placeholder="Ask me anything about your career..."
            className="glass-input flex-1" />
          <button type="submit" disabled={!input.trim()}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white disabled:opacity-30 hover:shadow-neon transition-all flex-shrink-0">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </main>
  )
}
