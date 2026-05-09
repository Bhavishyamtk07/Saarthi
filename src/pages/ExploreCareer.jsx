import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaFilter, FaChartLine, FaRupeeSign, FaGraduationCap, FaRobot, FaStar, FaTimes } from 'react-icons/fa'
import { HiSparkles, HiTrendingUp } from 'react-icons/hi'

const careers = [
  { id: 1, title: 'AI/ML Engineer', icon: '🤖', stream: 'Science', salary: '₹8-25 LPA', demand: 'Very High', aiRisk: 'Low', growth: '35%', education: 'B.Tech CSE / AI', skills: ['Python', 'TensorFlow', 'Math', 'Data Structures'], colleges: ['IIT Bombay', 'IIT Delhi', 'IIIT Hyderabad'], overview: 'Build intelligent systems using machine learning and deep learning. One of the fastest-growing fields globally.', category: 'Technology' },
  { id: 2, title: 'Data Scientist', icon: '📊', stream: 'Science', salary: '₹7-22 LPA', demand: 'High', aiRisk: 'Low', growth: '28%', education: 'B.Tech / M.Sc Statistics', skills: ['Python', 'SQL', 'Statistics', 'ML'], colleges: ['ISI Kolkata', 'IIT Madras', 'CMI'], overview: 'Extract insights from data to drive business decisions. Combines statistics, programming, and domain expertise.', category: 'Technology' },
  { id: 3, title: 'Doctor (MBBS)', icon: '🏥', stream: 'Science (PCB)', salary: '₹8-30 LPA', demand: 'Very High', aiRisk: 'Very Low', growth: '15%', education: 'MBBS + MD/MS', skills: ['Biology', 'Chemistry', 'Empathy', 'Research'], colleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER'], overview: 'Diagnose and treat patients. A noble profession with lifelong impact on communities.', category: 'Healthcare' },
  { id: 4, title: 'Chartered Accountant', icon: '💼', stream: 'Commerce', salary: '₹7-20 LPA', demand: 'High', aiRisk: 'Medium', growth: '12%', education: 'CA Foundation + Inter + Final', skills: ['Accounting', 'Tax', 'Audit', 'Finance'], colleges: ['ICAI', 'SRCC Delhi', 'Narsee Monjee'], overview: 'Manage financial records, audits, and taxation for businesses and individuals.', category: 'Finance' },
  { id: 5, title: 'UX/UI Designer', icon: '🎨', stream: 'Any', salary: '₹5-18 LPA', demand: 'High', aiRisk: 'Medium', growth: '22%', education: 'B.Des / Self-taught', skills: ['Figma', 'Design Thinking', 'Prototyping', 'Research'], colleges: ['NID', 'IIT Bombay IDC', 'Srishti'], overview: 'Create beautiful, user-friendly digital experiences. Blend creativity with user psychology.', category: 'Design' },
  { id: 6, title: 'Civil Services (IAS)', icon: '🏛️', stream: 'Any', salary: '₹6-12 LPA + perks', demand: 'Steady', aiRisk: 'Very Low', growth: '5%', education: 'Any Graduation + UPSC', skills: ['General Knowledge', 'Writing', 'Leadership', 'Ethics'], colleges: ['LBSNAA', 'St. Stephens', 'JNU'], overview: 'Serve the nation as an administrator. One of the most prestigious careers in India.', category: 'Government' },
  { id: 7, title: 'Lawyer', icon: '⚖️', stream: 'Arts/Commerce', salary: '₹5-25 LPA', demand: 'High', aiRisk: 'Low', growth: '10%', education: 'BA LLB / LLB', skills: ['Argumentation', 'Research', 'Writing', 'Critical Thinking'], colleges: ['NLU Delhi', 'NALSAR', 'NLSIU Bangalore'], overview: 'Advocate for justice and legal rights. Specializations include corporate, criminal, and constitutional law.', category: 'Law' },
  { id: 8, title: 'Content Creator', icon: '📱', stream: 'Any', salary: '₹3-50 LPA', demand: 'Very High', aiRisk: 'Medium', growth: '40%', education: 'Any / Self-taught', skills: ['Storytelling', 'Video Editing', 'Social Media', 'Branding'], colleges: ['Self-learning', 'MICA', 'Xavier\'s Mumbai'], overview: 'Create engaging content for social media, YouTube, and digital platforms. The creator economy is booming.', category: 'Media' },
  { id: 9, title: 'Cybersecurity Analyst', icon: '🔒', stream: 'Science', salary: '₹6-20 LPA', demand: 'Very High', aiRisk: 'Low', growth: '32%', education: 'B.Tech CSE / Certifications', skills: ['Networking', 'Linux', 'Ethical Hacking', 'SIEM'], colleges: ['IIT Kanpur', 'IIIT Delhi', 'Amrita'], overview: 'Protect organizations from cyber threats. Critical role in today\'s digital world.', category: 'Technology' },
]

const filters = ['All', 'Technology', 'Healthcare', 'Finance', 'Design', 'Government', 'Law', 'Media']

const demandColors = { 'Very High': 'text-neon-green', 'High': 'text-accent-400', 'Steady': 'text-yellow-400', 'Medium': 'text-neon-orange' }
const riskColors = { 'Very Low': 'text-neon-green', 'Low': 'text-accent-400', 'Medium': 'text-neon-orange', 'High': 'text-red-400' }

export default function ExploreCareer() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = careers.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
    const matchCat = category === 'All' || c.category === category
    return matchSearch && matchCat
  })

  return (
    <main className="relative z-10 pt-24 px-4 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold mb-4">
            <HiSparkles /> EXPLORE 250+ CAREERS
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Career <span className="gradient-text">Exploration Hub</span>
          </h1>
          <p className="text-dark-400 max-w-xl mx-auto">Discover careers that match your interests, skills, and ambitions</p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <div className="relative max-w-xl mx-auto mb-6">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search careers, skills, or interests..."
              className="glass-input pl-11 py-3.5 text-base" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setCategory(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  category === f
                    ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300'
                    : 'bg-white/5 border border-white/5 text-dark-400 hover:bg-white/10 hover:text-white'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Career Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(c)}
              className="glass-card p-6 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{c.icon}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 ${demandColors[c.demand]}`}>{c.demand} Demand</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{c.title}</h3>
              <p className="text-dark-400 text-sm mb-4 line-clamp-2">{c.overview}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-dark-300"><FaRupeeSign className="text-neon-green" /> {c.salary}</div>
                <div className="flex items-center gap-1.5 text-dark-300"><HiTrendingUp className="text-accent-400" /> {c.growth} growth</div>
                <div className="flex items-center gap-1.5 text-dark-300"><FaGraduationCap className="text-primary-400" /> {c.stream}</div>
                <div className="flex items-center gap-1.5 text-dark-300"><FaRobot className={riskColors[c.aiRisk]} /> AI Risk: {c.aiRisk}</div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {c.skills.slice(0, 3).map(s => (
                  <span key={s} className="px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 text-[10px]">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="glass-card max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{selected.icon}</span>
                    <div>
                      <h2 className="text-2xl font-display font-bold text-white">{selected.title}</h2>
                      <p className="text-dark-400 text-sm">{selected.category} • {selected.stream}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-dark-400 hover:text-white p-2"><FaTimes /></button>
                </div>
                <p className="text-dark-300 leading-relaxed mb-6">{selected.overview}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4"><p className="text-dark-400 text-xs mb-1">Salary Range</p><p className="text-neon-green font-semibold">{selected.salary}</p></div>
                  <div className="bg-white/5 rounded-xl p-4"><p className="text-dark-400 text-xs mb-1">Growth Rate</p><p className="text-accent-400 font-semibold">{selected.growth} YoY</p></div>
                  <div className="bg-white/5 rounded-xl p-4"><p className="text-dark-400 text-xs mb-1">Industry Demand</p><p className={`font-semibold ${demandColors[selected.demand]}`}>{selected.demand}</p></div>
                  <div className="bg-white/5 rounded-xl p-4"><p className="text-dark-400 text-xs mb-1">AI Replacement Risk</p><p className={`font-semibold ${riskColors[selected.aiRisk]}`}>{selected.aiRisk}</p></div>
                </div>
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">{selected.skills.map(s => <span key={s} className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm">{s}</span>)}</div>
                </div>
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Education</h3>
                  <p className="text-dark-300 text-sm">{selected.education}</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Top Colleges</h3>
                  <div className="space-y-2">{selected.colleges.map(c => <div key={c} className="flex items-center gap-2 text-dark-300 text-sm"><FaGraduationCap className="text-primary-400" /> {c}</div>)}</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
