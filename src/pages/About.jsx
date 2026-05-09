import { motion } from 'framer-motion'
import { FaBrain, FaRocket, FaUsers, FaHeart, FaGraduationCap, FaLightbulb } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } })
}

const team = [
  { name: 'Dr. Ananya Iyer', role: 'AI Research Lead', emoji: '👩‍🔬' },
  { name: 'Rohan Mehta', role: 'Full Stack Engineer', emoji: '👨‍💻' },
  { name: 'Sneha Kapoor', role: 'Career Psychologist', emoji: '👩‍⚕️' },
  { name: 'Vikram Singh', role: 'Data Scientist', emoji: '👨‍🔬' },
]

const values = [
  { icon: FaBrain, title: 'AI-First Approach', desc: 'Cutting-edge AI drives every recommendation we make.' },
  { icon: FaHeart, title: 'Student-Centric', desc: 'Every feature is designed with Indian students in mind.' },
  { icon: FaLightbulb, title: 'Evidence-Based', desc: 'Built on validated psychological frameworks like Holland & MBTI.' },
  { icon: FaUsers, title: 'Inclusive Access', desc: 'Multi-language, free tier, and optimized for all devices.' },
]

export default function About() {
  return (
    <main className="relative z-10 pt-24">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span variants={fadeUp} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold mb-6">
            <HiSparkles /> ABOUT SAARTHI AI
          </motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Empowering <span className="gradient-text">Every Student</span> to Dream Big
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-dark-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Saarthi AI is an AI-powered career counselling platform built for the Smart India Hackathon, 
            designed to help Indian school students (Class 8–12) discover their ideal career paths 
            through intelligent assessments, personalized roadmaps, and 24/7 AI mentor support.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Our <span className="gradient-text">Mission</span>
            </h2>
            <p className="text-dark-400 leading-relaxed mb-4">
              India has 250 million+ school students, yet less than 10% receive any form of career guidance. 
              Most students choose streams based on parental pressure or peer influence, not their true interests.
            </p>
            <p className="text-dark-400 leading-relaxed mb-4">
              Saarthi AI bridges this gap using artificial intelligence to provide every student — 
              regardless of location, language, or socio-economic background — access to world-class career counselling.
            </p>
            <p className="text-dark-400 leading-relaxed">
              We believe the right career guidance at the right time can transform lives, families, and communities.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass-card p-8 text-center">
            <div className="text-7xl mb-4">🎯</div>
            <h3 className="text-2xl font-display font-bold gradient-text mb-3">SIH 2026 Project</h3>
            <p className="text-dark-400 text-sm">Developing Effective Career Counselling & Guidance Programs in Schools to Enhance Student Career Choices</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-12 text-center">
            Our <span className="gradient-text">Core Values</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="glass-card p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-400 text-2xl">
                  <v.icon />
                </div>
                <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                <p className="text-dark-400 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-12">
            Meet Our <span className="gradient-text-warm">Team</span>
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <motion.div key={m.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="glass-card p-8 text-center">
                <div className="text-5xl mb-4">{m.emoji}</div>
                <h3 className="text-white font-semibold">{m.name}</h3>
                <p className="text-primary-400 text-sm">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
