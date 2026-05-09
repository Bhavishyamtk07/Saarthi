import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { TypeAnimation } from 'react-type-animation'
import {
  FaRocket, FaRobot, FaBrain, FaChartLine, FaGraduationCap,
  FaLightbulb, FaUsers, FaStar, FaArrowRight, FaPlay,
  FaCheckCircle, FaMapMarkedAlt
} from 'react-icons/fa'
import { HiSparkles, HiAcademicCap } from 'react-icons/hi'
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer
} from 'recharts'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
}

const stats = [
  { label: 'Students Guided', value: 50000, suffix: '+', icon: FaUsers, color: 'from-primary-500 to-primary-600' },
  { label: 'Career Paths', value: 250, suffix: '+', icon: FaMapMarkedAlt, color: 'from-accent-500 to-accent-600' },
  { label: 'AI Accuracy', value: 94, suffix: '%', icon: FaBrain, color: 'from-neon-green to-emerald-600' },
  { label: 'Schools Onboarded', value: 1200, suffix: '+', icon: FaGraduationCap, color: 'from-neon-pink to-rose-600' },
]

const features = [
  { icon: FaBrain, title: 'AI Career Assessment', desc: 'Intelligent tests powered by Holland Code, MBTI & Big Five analysis tailored for Class 8–12 students.', color: 'text-primary-400', bg: 'bg-primary-500/10' },
  { icon: FaRobot, title: 'AI Mentor Chatbot', desc: 'Get 24/7 personalized career guidance, emotional support, and stream advice from our AI mentor.', color: 'text-accent-400', bg: 'bg-accent-500/10' },
  { icon: FaChartLine, title: 'Career Roadmaps', desc: 'Dynamic step-by-step roadmaps with milestones, courses, and certifications for your dream career.', color: 'text-neon-green', bg: 'bg-green-500/10' },
  { icon: FaLightbulb, title: 'Smart Exploration', desc: 'Explore 250+ careers with salary data, demand forecasts, AI risk scores, and college recommendations.', color: 'text-neon-orange', bg: 'bg-orange-500/10' },
  { icon: HiAcademicCap, title: 'Personalized Learning', desc: 'AI-curated resources, webinars, success stories, and skill-building activities matched to your profile.', color: 'text-neon-pink', bg: 'bg-pink-500/10' },
  { icon: FaStar, title: 'Gamified Progress', desc: 'Earn badges, XP points, and achievements as you explore careers and complete milestones.', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
]

const radarData = [
  { subject: 'Analytical', A: 85 },
  { subject: 'Creative', A: 72 },
  { subject: 'Social', A: 68 },
  { subject: 'Technical', A: 90 },
  { subject: 'Leadership', A: 75 },
  { subject: 'Research', A: 82 },
]

const testimonials = [
  { name: 'Priya Sharma', class: 'Class 12, Delhi', text: 'Saarthi AI helped me discover that data science was my calling. The assessment was incredibly accurate!', avatar: '👩‍🎓' },
  { name: 'Arjun Patel', class: 'Class 10, Mumbai', text: 'The AI mentor chatbot is like having a personal career counsellor available 24/7. Life-changing!', avatar: '👨‍🎓' },
  { name: 'Kavya Nair', class: 'Class 11, Kochi', text: 'The roadmap feature gave me a clear path from school to my dream of becoming a doctor.', avatar: '👩‍⚕️' },
]

function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <section ref={ref} className="section-padding relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i}
            className="glass-card p-6 text-center group">
            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-lg shadow-lg`}>
              <stat.icon />
            </div>
            <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
              {inView && <CountUp end={stat.value} duration={2.5} separator="," />}{stat.suffix}
            </div>
            <p className="text-dark-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function FeaturesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section ref={ref} className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold mb-4">
            <HiSparkles /> POWERFUL FEATURES
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Everything You Need to <span className="gradient-text">Find Your Path</span>
          </h2>
          <p className="text-dark-400 max-w-2xl mx-auto">AI-powered tools designed specifically for Indian school students to make confident career decisions.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i}
              className="glass-card p-8 group cursor-pointer">
              <div className={`w-14 h-14 rounded-2xl ${f.bg} flex items-center justify-center ${f.color} text-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DemoSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section ref={ref} className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-semibold mb-4">
              <FaBrain /> AI PERSONALITY ANALYSIS
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Discover Your <span className="gradient-text">Unique Profile</span>
            </h2>
            <p className="text-dark-400 leading-relaxed mb-8">
              Our AI analyses your personality across multiple dimensions using scientifically-backed frameworks like Holland Code, MBTI, and Big Five to match you with ideal career paths.
            </p>
            <ul className="space-y-3 mb-8">
              {['Holland Code (RIASEC) Analysis', 'MBTI Personality Typing', 'Big Five Trait Mapping', 'Interest & Aptitude Scoring'].map(t => (
                <li key={t} className="flex items-center gap-3 text-dark-300 text-sm">
                  <FaCheckCircle className="text-neon-green flex-shrink-0" /> {t}
                </li>
              ))}
            </ul>
            <Link to="/career-test" className="btn-neon inline-flex items-center gap-2">
              Take Free Assessment <FaArrowRight />
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
            className="glass-card p-6">
            <h3 className="text-white font-semibold mb-4 text-center">Your Personality Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="You" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section ref={ref} className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Loved by <span className="gradient-text-warm">Students</span> Across India
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i}
              className="glass-card p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => <FaStar key={j} className="text-yellow-400 text-sm" />)}
              </div>
              <p className="text-dark-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{t.avatar}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-dark-500 text-xs">{t.class}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="section-padding relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 via-accent-600/20 to-neon-green/10" />
          <div className="absolute inset-0 bg-dark-950/60 backdrop-blur-sm" />
          <div className="relative p-10 md:p-16 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl animate-float">
              <FaRocket />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Discover Your Future?
            </h2>
            <p className="text-dark-300 max-w-xl mx-auto mb-8">
              Join 50,000+ students who have already found their perfect career path with Saarthi AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/career-test" className="btn-neon inline-flex items-center justify-center gap-2">
                <FaPlay /> Start Career Test
              </Link>
              <Link to="/register" className="btn-secondary inline-flex items-center justify-center gap-2">
                Create Free Account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="relative z-10">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative px-4 pt-20">
        {/* Gradient blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8">
              <HiSparkles className="animate-pulse" /> India's #1 AI Career Platform for Students
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
            Discover Your Perfect{' '}
            <span className="gradient-text">Career Path</span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              with{' '}
              <TypeAnimation
                sequence={['AI Intelligence', 2000, 'Smart Assessments', 2000, 'Personal Mentoring', 2000, 'Career Roadmaps', 2000]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                className="gradient-text-warm"
              />
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-dark-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            AI-powered career counselling designed for Indian school students (Class 8–12). 
            Take smart assessments, explore 250+ careers, and get personalized roadmaps.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/career-test" className="btn-neon inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
              <FaRocket /> Take Career Test
            </Link>
            <Link to="/explore" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
              <FaLightbulb /> Explore Careers
            </Link>
            <Link to="/ai-mentor" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
              <FaRobot /> Talk to AI Mentor
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 text-dark-500 text-xs">
            <span className="flex items-center gap-1.5"><FaCheckCircle className="text-neon-green" /> Free Assessment</span>
            <span className="flex items-center gap-1.5"><FaCheckCircle className="text-neon-green" /> No Credit Card</span>
            <span className="flex items-center gap-1.5"><FaCheckCircle className="text-neon-green" /> CBSE & State Board Aligned</span>
            <span className="flex items-center gap-1.5"><FaCheckCircle className="text-neon-green" /> Trusted by 1200+ Schools</span>
          </motion.div>
        </div>
      </section>

      <StatsSection />
      <FeaturesSection />
      <DemoSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
