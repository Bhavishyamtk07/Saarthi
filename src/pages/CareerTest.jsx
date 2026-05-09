import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaBrain, FaArrowRight, FaArrowLeft, FaClock, FaSave, FaCheckCircle } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import toast from 'react-hot-toast'

const questionSets = {
  '8': [
    { id: 1, type: 'mcq', question: 'What do you enjoy doing most in your free time?', options: ['Drawing or painting', 'Playing sports', 'Reading books', 'Building things / tinkering', 'Helping friends with problems', 'Playing video games'] },
    { id: 2, type: 'mcq', question: 'Which subject do you find most interesting?', options: ['Mathematics', 'Science', 'English / Languages', 'Social Studies', 'Art / Music', 'Computer Science'] },
    { id: 3, type: 'slider', question: 'How creative do you consider yourself?', min: 1, max: 10, labels: ['Not Creative', 'Very Creative'] },
    { id: 4, type: 'cards', question: 'Which activities excite you the most? (Pick 3)', options: ['🎨 Art & Design', '🔬 Experiments', '📝 Writing Stories', '🎮 Gaming', '🎵 Music', '🏃 Sports', '💻 Coding', '🌱 Nature / Gardening', '📊 Solving Puzzles', '🎭 Acting / Drama'], max: 3 },
    { id: 5, type: 'mcq', question: 'When you grow up, what sounds most exciting?', options: ['Inventing something new', 'Helping sick people', 'Teaching others', 'Running a business', 'Creating art or music', 'Exploring space or oceans'] },
    { id: 6, type: 'slider', question: 'How much do you enjoy working in teams?', min: 1, max: 10, labels: ['Prefer Alone', 'Love Teams'] },
    { id: 7, type: 'scenario', question: 'Your school is organizing a science fair. What role would you pick?', options: [
      { text: 'Lead the project & organize the team', tag: 'Leadership' },
      { text: 'Build the experiment or model', tag: 'Practical' },
      { text: 'Research and gather information', tag: 'Analytical' },
      { text: 'Design the poster and presentation', tag: 'Creative' },
    ]},
    { id: 8, type: 'mcq', question: 'Which type of book or show do you prefer?', options: ['Science fiction', 'Mystery / detective', 'Comedy / fun', 'Nature documentaries', 'Biographies / real stories', 'Fantasy / adventure'] },
  ],
  '10': [
    { id: 1, type: 'mcq', question: 'Which stream are you most interested in?', options: ['Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts / Humanities', 'Vocational / Skill-based', 'Not sure yet'] },
    { id: 2, type: 'mcq', question: 'What is your strongest academic area?', options: ['Mathematics & Logic', 'Science & Lab Work', 'Languages & Communication', 'Social Sciences', 'Business & Economics', 'Creative Arts'] },
    { id: 3, type: 'slider', question: 'Rate your logical reasoning ability:', min: 1, max: 10, labels: ['Developing', 'Excellent'] },
    { id: 4, type: 'slider', question: 'Rate your communication skills:', min: 1, max: 10, labels: ['Developing', 'Excellent'] },
    { id: 5, type: 'cards', question: 'Select skills you are good at (Pick up to 4):', options: ['🧮 Problem Solving', '🎨 Creative Thinking', '💬 Public Speaking', '💻 Programming', '✍️ Writing', '🔬 Research', '📊 Data Analysis', '🤝 Teamwork', '🎯 Leadership', '🌐 Languages'], max: 4 },
    { id: 6, type: 'scenario', question: 'You get a chance to start a project. Which would you pick?', options: [
      { text: 'Build a mobile app to solve a problem', tag: 'Technical' },
      { text: 'Start a social awareness campaign', tag: 'Social' },
      { text: 'Create a short film or art exhibition', tag: 'Creative' },
      { text: 'Launch a small business selling products', tag: 'Enterprising' },
    ]},
    { id: 7, type: 'mcq', question: 'What motivates you the most?', options: ['Solving complex challenges', 'Helping others', 'Creating something beautiful', 'Earning money & success', 'Learning new things', 'Being recognized'] },
    { id: 8, type: 'slider', question: 'Rate your interest in technology:', min: 1, max: 10, labels: ['Low Interest', 'Very High'] },
  ],
  '12': [
    { id: 1, type: 'mcq', question: 'What is your current stream?', options: ['Science (PCM)', 'Science (PCB)', 'Commerce with Maths', 'Commerce without Maths', 'Arts / Humanities', 'Vocational'] },
    { id: 2, type: 'mcq', question: 'What type of career interests you the most?', options: ['Engineering / Technology', 'Medicine / Healthcare', 'Business / Finance', 'Law / Civil Services', 'Design / Creative Arts', 'Research / Academia', 'Media / Communication', 'Social Work / NGO'] },
    { id: 3, type: 'slider', question: 'Rate your subject performance (aggregate %)', min: 40, max: 100, labels: ['40%', '100%'] },
    { id: 4, type: 'cards', question: 'Select your top personality traits (Pick 4):', options: ['🎯 Goal-oriented', '💡 Innovative', '🤝 Empathetic', '📋 Organized', '🗣️ Persuasive', '🔍 Curious', '🎨 Artistic', '📊 Analytical', '💪 Resilient', '🌍 Socially Aware'], max: 4 },
    { id: 5, type: 'slider', question: 'How important is high salary in your career choice?', min: 1, max: 10, labels: ['Not Important', 'Very Important'] },
    { id: 6, type: 'scenario', question: 'If you could shadow a professional for a day, who would it be?', options: [
      { text: 'A software engineer at Google', tag: 'Technical' },
      { text: 'A doctor at AIIMS', tag: 'Medical' },
      { text: 'A startup founder / CEO', tag: 'Entrepreneurial' },
      { text: 'A filmmaker or designer', tag: 'Creative' },
      { text: 'A civil servant / IAS officer', tag: 'Administrative' },
    ]},
    { id: 7, type: 'mcq', question: 'What is your preferred work environment?', options: ['Office / Corporate', 'Lab / Research', 'Outdoors / Field', 'Remote / Freelance', 'Studio / Creative space', 'Hospital / Clinic'] },
    { id: 8, type: 'cards', question: 'Which skills do you want to develop? (Pick 3):', options: ['💻 Coding', '📈 Data Science', '🎨 Design', '✍️ Content Writing', '💼 Management', '🔬 Research', '🗣️ Communication', '🌐 Foreign Language'], max: 3 },
  ]
}

function MCQ({ q, answer, onAnswer }) {
  return (
    <div className="grid gap-3">
      {q.options.map((opt, i) => (
        <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => onAnswer(opt)}
          className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
            answer === opt
              ? 'bg-primary-500/20 border-2 border-primary-500/50 text-white'
              : 'glass-card border border-white/5 text-dark-300 hover:text-white'
          }`}>
          <span className="flex items-center gap-3">
            <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
              answer === opt ? 'border-primary-400 bg-primary-500 text-white' : 'border-dark-500'
            }`}>
              {answer === opt && <FaCheckCircle />}
            </span>
            {opt}
          </span>
        </motion.button>
      ))}
    </div>
  )
}

function Slider({ q, answer, onAnswer }) {
  const val = answer || q.min
  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-5xl font-display font-bold gradient-text">{val}</span>
      </div>
      <input type="range" min={q.min} max={q.max} value={val}
        onChange={e => onAnswer(Number(e.target.value))}
        className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500" />
      <div className="flex justify-between text-dark-400 text-xs">
        <span>{q.labels[0]}</span><span>{q.labels[1]}</span>
      </div>
    </div>
  )
}

function Cards({ q, answer, onAnswer }) {
  const selected = answer || []
  const toggle = (opt) => {
    if (selected.includes(opt)) onAnswer(selected.filter(s => s !== opt))
    else if (selected.length < q.max) onAnswer([...selected, opt])
    else toast.error(`Pick up to ${q.max} only`)
  }
  return (
    <div className="space-y-3">
      <p className="text-dark-400 text-sm">Selected: {selected.length}/{q.max}</p>
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((opt, i) => (
          <motion.button key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => toggle(opt)}
            className={`p-4 rounded-xl text-sm font-medium transition-all duration-300 ${
              selected.includes(opt)
                ? 'bg-primary-500/20 border-2 border-primary-500/50 text-white shadow-neon'
                : 'glass-card border border-white/5 text-dark-300'
            }`}>
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function Scenario({ q, answer, onAnswer }) {
  return (
    <div className="grid gap-3">
      {q.options.map((opt, i) => (
        <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => onAnswer(opt.text)}
          className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
            answer === opt.text
              ? 'bg-primary-500/20 border-2 border-primary-500/50 text-white'
              : 'glass-card border border-white/5 text-dark-300'
          }`}>
          <div className="flex items-center justify-between">
            <span>{opt.text}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-dark-400">{opt.tag}</span>
          </div>
        </motion.button>
      ))}
    </div>
  )
}

export default function CareerTest() {
  const [classLevel, setClassLevel] = useState(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const questions = classLevel ? questionSets[classLevel] : []
  const progress = questions.length ? ((current + 1) / questions.length) * 100 : 0

  const handleAnswer = (val) => {
    setAnswers(a => ({ ...a, [current]: val }))
  }

  const next = () => {
    if (answers[current] === undefined) { toast.error('Please answer the question'); return }
    if (current < questions.length - 1) setCurrent(c => c + 1)
  }

  const prev = () => { if (current > 0) setCurrent(c => c - 1) }

  const submit = () => {
    if (Object.keys(answers).length < questions.length) { toast.error('Please answer all questions'); return }
    setSubmitted(true)
    toast.success('Assessment submitted! Analyzing with AI... 🧠')
    setTimeout(() => navigate('/results', { state: { answers, classLevel } }), 2000)
  }

  // Class selection screen
  if (!classLevel) {
    return (
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl shadow-neon animate-float">
            <FaBrain />
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            AI Career <span className="gradient-text">Assessment</span>
          </h1>
          <p className="text-dark-400 mb-10">Select your class to get a personalized assessment</p>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {['8', '10', '12'].map(c => (
              <motion.button key={c} whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }}
                onClick={() => setClassLevel(c)}
                className="glass-card p-8 text-center cursor-pointer group">
                <div className="text-4xl font-display font-bold gradient-text mb-2">Class {c}</div>
                <p className="text-dark-400 text-xs">{c === '8' ? 'Interests & Hobbies' : c === '10' ? 'Stream Selection' : 'Career Path'}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>
    )
  }

  // Submission loading
  if (submitted) {
    return (
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="loader mx-auto mb-6" />
          <h2 className="text-2xl font-display font-bold text-white mb-2">Analyzing Your Responses...</h2>
          <p className="text-dark-400">Our AI is building your personalized career profile</p>
        </motion.div>
      </main>
    )
  }

  const q = questions[current]

  return (
    <main className="relative z-10 min-h-screen flex flex-col pt-24 px-4 pb-12">
      <div className="max-w-2xl mx-auto w-full flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold">
            <HiSparkles /> Class {classLevel} Assessment
          </span>
          <span className="flex items-center gap-2 text-dark-400 text-sm">
            <FaClock /> ~{Math.max(1, questions.length - current)} min left
          </span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-dark-400 mb-2">
            <span>Question {current + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}>
            <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-8">{q.question}</h2>
            {q.type === 'mcq' && <MCQ q={q} answer={answers[current]} onAnswer={handleAnswer} />}
            {q.type === 'slider' && <Slider q={q} answer={answers[current]} onAnswer={handleAnswer} />}
            {q.type === 'cards' && <Cards q={q} answer={answers[current]} onAnswer={handleAnswer} />}
            {q.type === 'scenario' && <Scenario q={q} answer={answers[current]} onAnswer={handleAnswer} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <button onClick={prev} disabled={current === 0}
            className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed">
            <FaArrowLeft /> Previous
          </button>
          {current < questions.length - 1 ? (
            <button onClick={next} className="btn-primary"><span>Next</span> <FaArrowRight /></button>
          ) : (
            <button onClick={submit} className="btn-neon"><HiSparkles /> Submit & Analyze</button>
          )}
        </div>
      </div>
    </main>
  )
}
