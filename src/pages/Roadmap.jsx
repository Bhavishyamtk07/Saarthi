import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaCode, FaBook, FaLaptopCode, FaRocket, FaBriefcase, FaCertificate } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'

const roadmaps = {
  'AI Engineer': {
    icon: '🤖', color: 'from-primary-500 to-accent-500',
    steps: [
      { title: 'Learn Python', desc: 'Master Python, OOP, NumPy, Pandas', duration: '2-3 mo', icon: FaCode, done: true, res: ['freeCodeCamp', 'CS50P', 'Automate Boring Stuff'] },
      { title: 'Math for AI', desc: 'Linear Algebra, Calculus, Statistics', duration: '2 mo', icon: FaBook, done: true, res: ['Khan Academy', '3Blue1Brown'] },
      { title: 'DSA', desc: 'Arrays, Trees, Graphs, DP', duration: '3-4 mo', icon: FaCode, done: false, res: ['LeetCode', 'NeetCode', 'Striver Sheet'] },
      { title: 'Machine Learning', desc: 'Scikit-learn, model evaluation', duration: '3 mo', icon: FaLaptopCode, done: false, res: ['Andrew Ng ML', 'Kaggle Learn'] },
      { title: 'Deep Learning', desc: 'CNN, RNN, Transformers, PyTorch', duration: '3 mo', icon: FaLaptopCode, done: false, res: ['fast.ai', 'DL Specialization'] },
      { title: 'Build Projects', desc: 'Chatbot, image classifier, portfolio', duration: '2-3 mo', icon: FaRocket, done: false, res: ['GitHub', 'Kaggle'] },
      { title: 'Internship', desc: 'Apply at AI companies/research labs', duration: '3-6 mo', icon: FaBriefcase, done: false, res: ['Internshala', 'LinkedIn'] },
      { title: 'Certifications', desc: 'TensorFlow, AWS ML, Google Cloud', duration: '1-2 mo', icon: FaCertificate, done: false, res: ['TF Cert', 'AWS ML'] },
    ]
  },
  'Data Scientist': {
    icon: '📊', color: 'from-accent-500 to-neon-green',
    steps: [
      { title: 'Python & SQL', desc: 'Python for analysis, SQL for DBs', duration: '2 mo', icon: FaCode, done: true, res: ['Mode SQL', 'DataCamp'] },
      { title: 'Statistics', desc: 'Descriptive & inferential stats', duration: '2 mo', icon: FaBook, done: false, res: ['Khan Academy', 'StatQuest'] },
      { title: 'Data Viz', desc: 'Pandas, Matplotlib, Seaborn, EDA', duration: '2 mo', icon: FaLaptopCode, done: false, res: ['Kaggle Courses'] },
      { title: 'ML Models', desc: 'Regression, Classification, Clustering', duration: '3 mo', icon: FaLaptopCode, done: false, res: ['Scikit-learn', 'Andrew Ng'] },
      { title: 'Big Data', desc: 'Spark, Hadoop, cloud platforms', duration: '2 mo', icon: FaCode, done: false, res: ['Databricks Academy'] },
      { title: 'Portfolio', desc: 'Kaggle competitions, 5+ projects', duration: '3 mo', icon: FaRocket, done: false, res: ['Kaggle', 'GitHub'] },
    ]
  },
  'Doctor (MBBS)': {
    icon: '🏥', color: 'from-neon-pink to-red-500',
    steps: [
      { title: 'Excel in PCB', desc: 'Score 90%+ in Class 11-12', duration: '2 yr', icon: FaBook, done: true, res: ['NCERT', 'PW'] },
      { title: 'NEET Prep', desc: 'Clear NEET UG for govt colleges', duration: '1-2 yr', icon: FaBook, done: false, res: ['Allen', 'Unacademy'] },
      { title: 'MBBS', desc: '5.5 years including internship', duration: '5.5 yr', icon: FaLaptopCode, done: false, res: ['AIIMS', 'CMC Vellore'] },
      { title: 'NEET PG', desc: 'Specialization entrance', duration: '1 yr', icon: FaBook, done: false, res: ['Marrow', 'PrepLadder'] },
      { title: 'MD/MS', desc: '3-year specialization', duration: '3 yr', icon: FaCertificate, done: false, res: ['Top PG Colleges'] },
    ]
  }
}

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

export default function Roadmap() {
  const [sel, setSel] = useState('AI Engineer')
  const rm = roadmaps[sel]
  const done = rm.steps.filter(s => s.done).length
  const pct = (done / rm.steps.length) * 100

  return (
    <main className="relative z-10 pt-24 px-4 pb-16">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold mb-4"><HiSparkles /> AI-GENERATED ROADMAP</span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Career <span className="gradient-text">Roadmap</span></h1>
          <p className="text-dark-400">Step-by-step guide to your dream career</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.keys(roadmaps).map(c => (
            <button key={c} onClick={() => setSel(c)} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${sel === c ? 'bg-primary-500/20 border border-primary-500/40 text-white shadow-neon' : 'bg-white/5 border border-white/5 text-dark-400 hover:bg-white/10'}`}>
              {roadmaps[c].icon} {c}
            </button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6 mb-10">
          <div className="flex justify-between mb-3"><span className="text-white font-semibold">Progress</span><span className="text-primary-400 font-bold">{done}/{rm.steps.length}</span></div>
          <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
            <motion.div key={sel} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1 }} className={`h-full bg-gradient-to-r ${rm.color} rounded-full`} />
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/50 via-accent-500/30 to-transparent" />
          <div className="space-y-6">
            {rm.steps.map((s, i) => (
              <motion.div key={`${sel}-${i}`} variants={fadeUp} initial="hidden" animate="visible" custom={i} className="relative pl-16 md:pl-20">
                <div className={`absolute left-3.5 md:left-5.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${s.done ? 'bg-neon-green border-neon-green text-dark-950' : 'bg-dark-800 border-dark-600'}`}>
                  {s.done ? <FaCheckCircle className="text-[10px]" /> : <span className="w-2 h-2 rounded-full bg-dark-500" />}
                </div>
                <div className={`glass-card p-6 ${s.done ? 'border-neon-green/20' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${s.done ? 'bg-neon-green/10 text-neon-green' : 'bg-primary-500/10 text-primary-400'}`}><s.icon /></div>
                    <div><h3 className={`font-semibold ${s.done ? 'text-neon-green' : 'text-white'}`}>{s.title}</h3><span className="text-dark-500 text-xs">{s.duration}</span></div>
                    {s.done && <span className="ml-auto px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green text-xs">Done ✓</span>}
                  </div>
                  <p className="text-dark-400 text-sm mb-3">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.res.map(r => <span key={r} className="px-2.5 py-1 rounded-lg bg-white/5 text-dark-300 text-xs">{r}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
