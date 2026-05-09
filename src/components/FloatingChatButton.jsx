import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaRobot } from 'react-icons/fa'

export default function FloatingChatButton() {
  return (
    <Link to="/ai-mentor">
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-neon-lg text-white text-xl relative"
        >
          <FaRobot />
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-primary-500/30 animate-ping" />
        </motion.button>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-full right-0 mb-3 px-3 py-1.5 rounded-lg bg-dark-800 border border-white/10 text-xs text-white whitespace-nowrap shadow-lg"
        >
          💬 Ask AI Mentor
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-dark-800 border-r border-b border-white/10 rotate-45" />
        </motion.div>
      </motion.div>
    </Link>
  )
}
