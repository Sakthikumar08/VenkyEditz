"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { FiHome, FiCode, FiImage, FiUser, FiMail, FiFolder, FiMenu, FiX } from "react-icons/fi"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", path: "/", icon: FiHome },
    { name: "Work", path: "/work", icon: FiCode },
    { name: "Gallery", path: "/gallery", icon: FiImage },
    { name: "Projects", path: "/projects", icon: FiFolder },
    { name: "About", path: "/about", icon: FiUser },
    { name: "Contact", path: "/contact", icon: FiMail },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        className="fixed top-6 right-6 z-50 md:hidden bg-cyan-500/20 backdrop-blur-md p-3 rounded-lg border border-cyan-500/30 hover:border-cyan-500 transition-all"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        whileHover={{ scale: 1.05 }}
      >
        {mobileMenuOpen ? <FiX size={24} className="text-cyan-400" /> : <FiMenu size={24} className="text-cyan-400" />}
      </motion.button>

      {/* Desktop Icon-Only Right Navigation */}
      <motion.nav
        className="hidden md:flex fixed top-0 right-0 h-full z-40 flex-col items-end justify-center pr-6 xl:pr-8"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className={`flex flex-col items-center justify-center gap-6 p-4 rounded-2xl backdrop-blur-md border border-cyan-500/30 transition-all duration-300 ${
            scrolled ? "bg-slate-900/50 shadow-lg shadow-cyan-500/20" : "bg-slate-900/30"
          }`}
        >
          {navItems.map((item, index) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <Link
                  to={item.path}
                  className={`flex items-center justify-center w-10 h-10 transition-all duration-200 ${
                    active ? "text-orange-400" : "text-cyan-400 hover:text-orange-400"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={22} />
                  <span className="absolute right-full mr-4 whitespace-nowrap px-3 py-1.5 bg-slate-900/90 border border-cyan-500/50 rounded-lg text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-cyan-400">
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.nav
          className="fixed inset-0 z-30 md:hidden bg-slate-900/95 backdrop-blur-lg flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center gap-8">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 text-2xl transition-colors ${
                      active ? "text-orange-400" : "text-cyan-400 hover:text-orange-400"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon size={32} />
                    <span className="font-mono">{item.name}</span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.nav>
      )}
    </>
  )
}

export default Navbar
