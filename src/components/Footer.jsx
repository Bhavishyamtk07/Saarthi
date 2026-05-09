import { Link } from 'react-router-dom'
import { FaBrain, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Career Test', path: '/career-test' },
  { name: 'Explore Careers', path: '/explore' },
  { name: 'AI Mentor', path: '/ai-mentor' },
  { name: 'Roadmap', path: '/roadmap' },
]

const resources = [
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Privacy Policy', path: '#' },
  { name: 'Terms of Service', path: '#' },
  { name: 'FAQ', path: '#' },
]

const socials = [
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
  { icon: FaGithub, href: '#', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/20 to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <FaBrain className="text-white text-lg" />
              </div>
              <div>
                <span className="text-xl font-display font-bold gradient-text">Saarthi</span>
                <span className="text-xl font-display font-light text-white ml-1">AI</span>
              </div>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              India's #1 AI-powered career counselling platform for school students. 
              Discover your perfect career path with AI-driven assessments and personalized guidance.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-dark-400 hover:text-white hover:bg-primary-500/20 hover:border-primary-500/30 transition-all duration-300"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-dark-400 hover:text-primary-400 text-sm transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-dark-400 hover:text-primary-400 text-sm transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiMail className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-400 text-sm">hello@saarthi-ai.in</span>
              </li>
              <li className="flex items-start gap-3">
                <HiPhone className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-400 text-sm">Bengaluru, Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-xs">
            © 2026 Saarthi AI. All rights reserved. Made with 🧠 for Indian Students.
          </p>
          <p className="text-dark-500 text-xs">
            Smart India Hackathon 2026 Project
          </p>
        </div>
      </div>
    </footer>
  )
}
