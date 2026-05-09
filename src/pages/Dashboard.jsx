import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaBrain, FaRobot, FaChartLine, FaBookmark, FaTrophy, FaBell, FaCalendar, FaMapMarkedAlt } from 'react-icons/fa'
import { HiSparkles, HiTrendingUp } from 'react-icons/hi'
import { AreaChart, Area, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
}

const progressData = [
  { day: 'Mon', xp: 20 }, { day: 'Tue', xp: 35 }, { day: 'Wed', xp: 45 },
  { day: 'Thu', xp: 30 }, { day: 'Fri', xp: 60 }, { day: 'Sat', xp: 80 }, { day: 'Sun', xp: 55 },
]

const radarData = [
  { trait: 'Analytical', score: 88 }, { trait: 'Creative', score: 72 },
  { trait: 'Social', score: 65 }, { trait: 'Technical', score: 92 },
  { trait: 'Leadership', score: 78 }, { trait: 'Research', score: 85 },
]

const savedCareers = [
  { title: 'AI Engineer', match: 94, icon: '🤖' },
  { title: 'Data Scientist', match: 89, icon: '📊' },
  { title: 'Software Dev', match: 87, icon: '💻' },
]

const badges = [
  { name: 'First Test', emoji: '🎯', earned: true },
  { name: 'Explorer', emoji: '🌍', earned: true },
  { name: 'AI Chatted', emoji: '🤖', earned: true },
  { name: 'Roadmap Pro', emoji: '🗺️', earned: false },
  { name: 'Streak 7', emoji: '🔥', earned: false },
  { name: 'Scholar', emoji: '📚', earned: false },
]

const notifications = [
  { text: 'Your career report is ready!', time: '2 hours ago', icon: '📋' },
  { text: 'New webinar: AI Careers in India', time: '5 hours ago', icon: '📺' },
  { text: 'Complete your roadmap milestones', time: '1 day ago', icon: '🎯' },
]

export default function Dashboard() {
  return (
    <main className="relative z-10 pt-24 px-4 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
            Welcome back, <span className="gradient-text">Student</span> 👋
          </h1>
          <p className="text-dark-400">Here's your career journey progress</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Tests Completed', value: '3', icon: FaBrain, color: 'from-primary-500 to-primary-600' },
            { label: 'XP Points', value: '1,250', icon: FaTrophy, color: 'from-yellow-500 to-orange-500' },
            { label: 'Saved Careers', value: '5', icon: FaBookmark, color: 'from-accent-500 to-accent-600' },
            { label: 'Milestones', value: '8/20', icon: FaMapMarkedAlt, color: 'from-neon-green to-emerald-600' },
          ].map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} initial="hidden" animate="visible" custom={i}
              className="glass-card p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-3`}>
                <s.icon />
              </div>
              <p className="text-2xl font-display font-bold text-white">{s.value}</p>
              <p className="text-dark-400 text-xs mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Recommendation */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="glass-card p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400 text-xl flex-shrink-0">
                  <HiSparkles />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">AI Recommendation</h3>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    Based on your latest assessment, we recommend focusing on <span className="text-primary-400 font-medium">Python programming</span> and <span className="text-accent-400 font-medium">Data Structures</span> 
                    to strengthen your path toward AI/ML Engineering. Check out our curated roadmap!
                  </p>
                  <Link to="/roadmap" className="inline-flex items-center gap-2 mt-3 text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors">
                    View Roadmap →
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* XP Chart */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><HiTrendingUp className="text-neon-green" /> Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={progressData}>
                  <defs><linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="100%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs>
                  <Area type="monotone" dataKey="xp" stroke="#6366f1" fill="url(#xpGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Personality */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6} className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><FaBrain className="text-primary-400" /> Your Personality Profile</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="trait" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Saved Careers */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={7} className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><FaBookmark className="text-accent-400" /> Saved Careers</h3>
              <div className="space-y-3">
                {savedCareers.map(c => (
                  <div key={c.title} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{c.icon}</span>
                      <span className="text-white text-sm font-medium">{c.title}</span>
                    </div>
                    <span className="text-primary-400 text-sm font-semibold">{c.match}%</span>
                  </div>
                ))}
              </div>
              <Link to="/explore" className="block text-center text-primary-400 text-sm mt-4 hover:text-primary-300 transition-colors">View All →</Link>
            </motion.div>

            {/* Badges */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={8} className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><FaTrophy className="text-yellow-400" /> Badges</h3>
              <div className="grid grid-cols-3 gap-3">
                {badges.map(b => (
                  <div key={b.name} className={`text-center p-3 rounded-xl ${b.earned ? 'bg-white/5' : 'bg-white/[0.02] opacity-40'}`}>
                    <span className="text-2xl">{b.emoji}</span>
                    <p className="text-dark-400 text-[10px] mt-1">{b.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={9} className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><FaBell className="text-neon-orange" /> Notifications</h3>
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div key={i} className="flex items-start gap-3 p-2">
                    <span className="text-lg">{n.icon}</span>
                    <div>
                      <p className="text-dark-300 text-sm">{n.text}</p>
                      <p className="text-dark-500 text-xs mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={10} className="space-y-3">
              <Link to="/career-test" className="btn-primary w-full justify-center"><FaBrain /> Take New Test</Link>
              <Link to="/ai-mentor" className="btn-secondary w-full justify-center"><FaRobot /> Chat with AI</Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
