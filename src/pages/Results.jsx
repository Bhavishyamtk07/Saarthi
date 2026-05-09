import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaBrain, FaStar, FaRocket, FaChartLine, FaArrowRight, FaDownload, FaShare } from 'react-icons/fa'
import { HiSparkles, HiTrendingUp, HiLightningBolt } from 'react-icons/hi'
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, CartesianGrid
} from 'recharts'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } })
}

const personalityData = [
  { trait: 'Analytical', score: 88 },
  { trait: 'Creative', score: 72 },
  { trait: 'Social', score: 65 },
  { trait: 'Technical', score: 92 },
  { trait: 'Leadership', score: 78 },
  { trait: 'Investigative', score: 85 },
]

const skillData = [
  { skill: 'Problem Solving', level: 90 },
  { skill: 'Coding', level: 85 },
  { skill: 'Communication', level: 70 },
  { skill: 'Data Analysis', level: 82 },
  { skill: 'Creativity', level: 75 },
  { skill: 'Teamwork', level: 68 },
]

const demandData = [
  { year: '2024', demand: 60 }, { year: '2025', demand: 72 },
  { year: '2026', demand: 85 }, { year: '2027', demand: 90 },
  { year: '2028', demand: 95 }, { year: '2029', demand: 98 },
]

const careerMatches = [
  { title: 'AI/ML Engineer', match: 94, salary: '₹8-25 LPA', demand: 'Very High', icon: '🤖', color: 'from-primary-500 to-primary-600', stream: 'Science (PCM)' },
  { title: 'Data Scientist', match: 89, salary: '₹7-22 LPA', demand: 'High', icon: '📊', color: 'from-accent-500 to-accent-600', stream: 'Science (PCM)' },
  { title: 'Software Engineer', match: 87, salary: '₹6-20 LPA', demand: 'Very High', icon: '💻', color: 'from-neon-green to-emerald-600', stream: 'Science (PCM)' },
  { title: 'Product Manager', match: 78, salary: '₹10-30 LPA', demand: 'High', icon: '🎯', color: 'from-neon-orange to-orange-600', stream: 'Any' },
  { title: 'UX Designer', match: 72, salary: '₹5-15 LPA', demand: 'Medium-High', icon: '🎨', color: 'from-neon-pink to-pink-600', stream: 'Any' },
]

const strengths = ['Strong analytical thinking', 'Excellent problem-solving skills', 'High technical aptitude', 'Good at pattern recognition']
const improvements = ['Develop better communication skills', 'Practice more team collaboration', 'Explore creative hobbies', 'Build leadership experience']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-4 py-2 text-sm">
      <p className="text-white font-medium">{label}</p>
      <p className="text-primary-400">{payload[0].value}%</p>
    </div>
  )
}

export default function Results() {
  return (
    <main className="relative z-10 pt-24 px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl shadow-neon">
            <FaBrain />
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">
            Your AI Career <span className="gradient-text">Analysis</span>
          </h1>
          <p className="text-dark-400 max-w-xl mx-auto">Based on your responses, our AI has analyzed your personality, aptitude, and interests. Here are your results.</p>
          <div className="flex justify-center gap-3 mt-6">
            <button className="btn-secondary text-sm py-2"><FaDownload /> Download PDF</button>
            <button className="btn-secondary text-sm py-2"><FaShare /> Share Results</button>
          </div>
        </motion.div>

        {/* AI Summary Card */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="glass-card p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400 text-xl flex-shrink-0">
              <HiSparkles />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Summary</h3>
              <p className="text-dark-300 leading-relaxed text-sm">
                You exhibit a strong <span className="text-primary-400 font-medium">Investigative-Technical</span> personality profile (Holland Code: <span className="text-accent-400 font-medium">RIA</span>). 
                Your analytical mindset, combined with high technical aptitude and problem-solving abilities, makes you an excellent fit for careers in 
                <span className="text-neon-green font-medium"> AI/ML Engineering, Data Science, and Software Development</span>. 
                Your MBTI analysis suggests an <span className="text-primary-400 font-medium">INTJ</span> type — the "Architect" who loves building systems and solving complex problems.
              </p>
              <div className="flex gap-4 mt-4">
                <span className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-medium">Holland: RIA</span>
                <span className="px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-medium">MBTI: INTJ</span>
                <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-neon-green text-xs font-medium">AI Confidence: 94%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Career Match Cards */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="mb-8">
          <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
            <FaStar className="text-yellow-400" /> Top Career Matches
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerMatches.map((c, i) => (
              <motion.div key={c.title} variants={fadeUp} initial="hidden" animate="visible" custom={i + 2}
                className="glass-card p-6 group cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{c.icon}</span>
                  <span className={`text-2xl font-display font-bold gradient-text`}>{c.match}%</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{c.title}</h3>
                <div className="space-y-2 mt-3">
                  <div className="flex justify-between text-xs"><span className="text-dark-400">Salary</span><span className="text-neon-green">{c.salary}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-dark-400">Demand</span><span className="text-accent-400">{c.demand}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-dark-400">Stream</span><span className="text-primary-400">{c.stream}</span></div>
                </div>
                {/* Match bar */}
                <div className="mt-4 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${c.match}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${c.color} rounded-full`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Personality Radar */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><FaBrain className="text-primary-400" /> Personality Radar</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={personalityData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="trait" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Skill Graph */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6} className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><HiLightningBolt className="text-accent-400" /> Skill Proficiency</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={skillData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} />
                <YAxis dataKey="skill" type="category" width={100} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="level" fill="url(#barGradient)" radius={[0, 6, 6, 0]} barSize={16}>
                  <defs><linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Future Demand */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={7} className="glass-card p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><HiTrendingUp className="text-neon-green" /> Future Industry Demand</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={demandData}>
              <defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="100%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="demand" stroke="#6366f1" fill="url(#areaGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Strengths & Improvements */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={8} className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">💪 Your Strengths</h3>
            <ul className="space-y-3">
              {strengths.map(s => (
                <li key={s} className="flex items-center gap-3 text-dark-300 text-sm"><span className="w-2 h-2 rounded-full bg-neon-green flex-shrink-0" /> {s}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={9} className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🎯 Suggested Improvements</h3>
            <ul className="space-y-3">
              {improvements.map(s => (
                <li key={s} className="flex items-center gap-3 text-dark-300 text-sm"><span className="w-2 h-2 rounded-full bg-neon-orange flex-shrink-0" /> {s}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={10} className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/roadmap" className="btn-neon inline-flex items-center justify-center gap-2">
              <FaRocket /> View Career Roadmap
            </Link>
            <Link to="/explore" className="btn-secondary inline-flex items-center justify-center gap-2">
              Explore All Careers <FaArrowRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
