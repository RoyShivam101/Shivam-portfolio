'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Eye, 
  Users, 
  TrendingUp, 
  Target, 
  Crown, 
  Lightbulb, 
  Shield, 
  ArrowRight, 
  Menu, 
  X, 
  Send,
  Star,
  Award,
  Zap,
  Globe,
  MessageCircle,
  ExternalLink
} from 'lucide-react'

// Types
interface StatItem {
  icon: React.ElementType
  value: number
  label: string
  growth: string
  suffix: string
  color: string
}

interface ServiceItem {
  icon: React.ElementType
  title: string
  description: string
  gradient: string
  features: string[]
}

interface ProcessStep {
  number: number
  title: string
  description: string
}

interface ContactMethod {
  icon: React.ElementType
  label: string
  value: string
  href: string
  color: string
}

const Portfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [counters, setCounters] = useState({
    impressions: 0,
    followers: 0,
    totalFollowers: 0,
    reach: 0
  })
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [notification, setNotification] = useState<{
    show: boolean
    type: 'success' | 'error'
    message: string
  }>({ show: false, type: 'success', message: '' })

  const heroRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()

  // Transform scroll progress to percentage
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      setScrollProgress(value * 100)
    })
    return unsubscribe
  }, [scrollYProgress])

  // Intersection Observer for counter animation
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isStatsInView) {
      animateCounters()
    }
  }, [isStatsInView])

  // Counter animation
  const animateCounters = () => {
    const targets = { 
      impressions: 50000, 
      followers: 105, 
      totalFollowers: 846, 
      reach: 21095 
    }
    const duration = 2000
    const steps = 60
    const increment = duration / steps

    Object.entries(targets).forEach(([key, target]) => {
      let current = 0
      const step = target / steps

      const timer = setInterval(() => {
        current += step
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }))
      }, increment)
    })
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  // Show notification
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message })
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 5000)
  }

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFormSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsFormSubmitting(false)
      showNotification('success', 'Thank you for your message! Shivam will get back to you within 24 hours.')
      
      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 2000)
  }

  // Data
  const stats: StatItem[] = [
    {
      icon: Eye,
      value: counters.impressions,
      label: "LinkedIn Impressions",
      growth: "+578% in 30 days",
      suffix: "+",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      value: counters.followers,
      label: "Followers in One Day",
      growth: "+144% daily growth",
      suffix: "",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      value: counters.totalFollowers,
      label: "Total Followers",
      growth: "+197% growth rate",
      suffix: "",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      value: counters.reach,
      label: "Members Reached",
      growth: "+759% reach expansion",
      suffix: "+",
      color: "from-orange-500 to-red-500"
    }
  ]

  const services: ServiceItem[] = [
    {
      icon: Crown,
      title: "Personal Branding",
      description: "Transform your expertise into digital authority that commands respect and positions you as the go-to expert in your field.",
      gradient: "from-blue-500 to-purple-600",
      features: ["LinkedIn Profile Optimization", "Brand Voice Development", "Content Strategy", "Visual Identity"]
    },
    {
      icon: Lightbulb,
      title: "Thought Leadership",
      description: "Share influential insights that attract clients and recognition. Establish yourself as a thought leader through strategic content.",
      gradient: "from-purple-500 to-pink-600",
      features: ["Content Creation", "Industry Insights", "Speaking Opportunities", "Media Relations"]
    },
    {
      icon: Shield,
      title: "Brand & Reputation Building",
      description: "Create a distinct, credible digital presence for your firm. Build trust and credibility that converts prospects into premium clients.",
      gradient: "from-pink-500 to-red-600",
      features: ["Reputation Management", "Crisis Communication", "Trust Building", "Client Testimonials"]
    }
  ]

  const processSteps: ProcessStep[] = [
    { 
      number: 1, 
      title: "Discovery Call", 
      description: "A comprehensive 30-minute discovery call to understand your goals, challenges, and unique value proposition." 
    },
    { 
      number: 2, 
      title: "LinkedIn Audit", 
      description: "Deep-dive analysis of your current LinkedIn presence to identify opportunities and competitive advantages." 
    },
    { 
      number: 3, 
      title: "Strategy Development", 
      description: "Custom strategy development tailored to your industry, audience, and specific business objectives." 
    },
    { 
      number: 4, 
      title: "Implementation", 
      description: "Full implementation with ongoing optimization and regular performance reviews to ensure maximum impact." 
    },
    { 
      number: 5, 
      title: "Reporting & Refinement", 
      description: "Monthly reporting with detailed analytics and continuous strategy refinement for sustained growth." 
    }
  ]

  const contactMethods: ContactMethod[] = [
    { 
      icon: Mail, 
      label: "Email", 
      value: "royshivamvip101@gmail.com", 
      href: "mailto:royshivamvip101@gmail.com",
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: MessageCircle, 
      label: "WhatsApp", 
      value: "+91 6207375459", 
      href: "https://wa.me/+916207375459",
      color: "from-green-500 to-green-600"
    },
    { 
      icon: Users, 
      label: "LinkedIn", 
      value: "Connect with me", 
      href: "https://www.linkedin.com/in/shivam-roy-/",
      color: "from-blue-600 to-blue-700"
    },
    { 
      icon: MapPin, 
      label: "Location", 
      value: "Pune, Maharashtra, India", 
      href: "#",
      color: "from-purple-500 to-purple-600"
    }
  ]

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  }

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 }
  }

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 }
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`fixed top-6 right-6 p-4 rounded-xl text-white font-semibold z-50 max-w-sm shadow-2xl ${
              notification.type === 'success' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                : 'bg-gradient-to-r from-red-500 to-red-600'
            }`}
          >
            <div className="flex items-center">
              <div className="mr-3">
                {notification.type === 'success' ? '✅' : '❌'}
              </div>
              <p>{notification.message}</p>
              <button
                onClick={() => setNotification(prev => ({ ...prev, show: false }))}
                className="ml-auto text-white/80 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              Shivam Roy
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-2 space-y-1">
                {['Home', 'Services', 'About', 'Contact'].map((item) => (
                  <motion.button
                    key={item}
                    whileHover={{ x: 10 }}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
          
          {/* Floating Elements */}
          <motion.div
            style={{ y: parallaxY }}
            className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            style={{ y: parallaxY }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold mb-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-5 h-5 mr-2" />
                Personal Branding Specialist
              </motion.div>
              
              <motion.h1
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  Build LinkedIn Authority
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  That Attracts Premium Opportunities
                </span>
              </motion.h1>
              
              <motion.p
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl"
              >
                Build Industry Recognition and Brand Authority to establish you as the industry leader. 
                Done-for-you LinkedIn personal branding for founders, lawyers, law firms and legal tech companies.
              </motion.p>
              
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <motion.a
                  href="https://cal.com/royshivam/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 group"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Schedule a Free Branding Audit
                  <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
                
                <motion.button
                  onClick={() => scrollToSection('about')}
                  className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                className="flex items-center space-x-6 text-sm text-gray-500"
              >
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>Trusted by 100+ professionals</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-blue-500 mr-1" />
                  <span>Industry recognized</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Background Card */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl transform rotate-6 scale-105"
                  animate={{
                    rotate: [6, 8, 6],
                    scale: [1.05, 1.08, 1.05]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main Card */}
                <motion.div
                  className="relative bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl p-8 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center text-white">
                    {/* Profile Avatar */}
                    <motion.div
                      className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center relative overflow-hidden"
                      whileHover={{ rotate: 5 }}
                    >
                      <Users className="w-16 h-16" />
                      
                      {/* Animated Ring */}
                      <motion.div
                        className="absolute inset-0 border-4 border-white/30 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-2">Shivam Roy</h3>
                    <p className="text-blue-200 mb-4">Personal Branding Expert</p>
                    
                    {/* Stats Preview */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-2xl font-bold">50K+</div>
                        <div className="text-xs text-gray-300">Impressions</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-2xl font-bold">846</div>
                        <div className="text-xs text-gray-300">Followers</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => scrollToSection('stats')}
        >
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="stats" ref={statsRef} className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                custom={index}
                className="group"
              >
                <motion.div
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 cursor-pointer"
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold text-gray-900 mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {stat.value.toLocaleString()}{stat.suffix}
                    </motion.div>
                    <div className="text-gray-600 font-medium mb-2">{stat.label}</div>
                    <div className="text-green-600 text-sm font-semibold flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {stat.growth}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                What I Do
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive LinkedIn personal branding solutions designed specifically for legal professionals and founders
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                className="group"
              >
                <motion.div
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-gray-100"
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Service Icon */}
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1 
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 text-center">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3 flex-shrink-0`} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl lg:text-5xl font-bold mb-12"
            >
              <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                About Shivam Roy
              </span>
            </motion.h2>
            
            <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
              <motion.p variants={fadeInUp}>
                Hi, I'm <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shivam Roy</span>, 
                a 19-year-old personal branding specialist who's passionate about helping Founders, Lawyers, Law Firms and Legal Tech Companies 
                build the digital authority they deserve.
              </motion.p>
              
              <motion.p variants={fadeInUp}>
                I grew up surrounded by law and started my career at leading firms and innovative startups. Along the way, I kept meeting 
                brilliant legal professionals and founders with powerful ideas. But too often, their voices went unheard beyond their immediate circles. 
                <span className="font-bold text-blue-600"> That needed to change, and I made it my mission.</span>
              </motion.p>
              
              <motion.p variants={fadeInUp}>
                This unique background gave me front-row seats to a persistent problem: exceptional lawyers and founders with decades of expertise 
                were invisible online, losing opportunities to less qualified but more visible competitors.
              </motion.p>
              
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mt-8 border border-blue-100"
              >
                <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center justify-center">
                  <Zap className="w-6 h-6 mr-2 text-blue-600" />
                  My Mission
                </h3>
                <p>
                  Every founder and lawyer has a story that deserves to shape the future of the industry. My approach brings together their expertise, 
                  digital strategy, and branding to empower clients to become trusted authorities—not just users of LinkedIn, but voices that drive change.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                My Process
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven 5-step approach to transform your LinkedIn presence and build industry authority
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-5 gap-8"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                className="text-center group"
              >
                <div className="relative mb-8">
                  {/* Step Number */}
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.number}
                  </motion.div>
                  
                  {/* Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 z-0" />
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInLeft}
                className="text-4xl lg:text-5xl font-bold mb-6"
              >
                Let's Build Your Authority
              </motion.h2>
              
              <motion.p
                variants={fadeInLeft}
                className="text-xl text-gray-300 mb-8 leading-relaxed"
              >
                Ready to transform your LinkedIn presence and attract premium opportunities? 
                Let's discuss how we can elevate your personal brand and establish you as an industry leader.
              </motion.p>
              
              <motion.div
                variants={staggerContainer}
                className="space-y-6"
              >
                {contactMethods.map((contact, index) => (
                  <motion.a
                    key={index}
                    variants={fadeInLeft}
                    custom={index}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : '_self'}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="flex items-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className={`w-14 h-14 bg-gradient-to-r ${contact.color} rounded-full flex items-center justify-center mr-4 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <contact.icon className="w-7 h-7" />
                    </motion.div>
                    <div>
                      <div className="font-semibold text-lg">{contact.label}</div>
                      <div className="text-gray-300 group-hover:text-white transition-colors">
                        {contact.value}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Send className="w-6 h-6 mr-2" />
                Get In Touch
              </h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="location"
                  placeholder="Location (City, Country) *"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  required
                />
                
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  name="challenge"
                  placeholder="Current LinkedIn Challenge *"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                  required
                />
                
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  name="contactMethod"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  required
                >
                  <option value="" className="text-gray-900">Preferred Contact Method *</option>
                  <option value="email" className="text-gray-900">Email</option>
                  <option value="whatsapp" className="text-gray-900">WhatsApp</option>
                  <option value="phone" className="text-gray-900">Phone</option>
                </motion.select>
                
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  name="hearAbout"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="" className="text-gray-900">How did you hear about us?</option>
                  <option value="linkedin" className="text-gray-900">LinkedIn</option>
                  <option value="referral" className="text-gray-900">Referral</option>
                  <option value="google" className="text-gray-900">Google Search</option>
                  <option value="social" className="text-gray-900">Social Media</option>
                  <option value="other" className="text-gray-900">Other</option>
                </motion.select>
                
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  name="message"
                  placeholder="Additional Message (Optional)"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                />
                
                <motion.button
                  type="submit"
                  disabled={isFormSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isFormSubmitting ? 1 : 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: isFormSubmitting ? 1 : 0.98 }}
                >
                  {isFormSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
              
              {/* Additional Contact Options */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-6 border-t border-white/20"
              >
                <p className="text-center text-gray-300 mb-4">Prefer a direct approach?</p>
                <div className="flex justify-center space-x-4">
                  <motion.a
                    href="https://cal.com/royshivam/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book a Call
                  </motion.a>
                  <motion.a
                    href="https://wa.me/+916207375459"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mb-8">
              <motion.div
                className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Shivam Roy
              </motion.div>
              <p className="text-gray-400 max-w-md mx-auto">
                Personal Branding Specialist helping founders and legal professionals build LinkedIn authority
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-8">
              {[
                { icon: Users, href: "https://www.linkedin.com/in/shivam-roy-/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:royshivamvip101@gmail.com", label: "Email" },
                { icon: MessageCircle, href: "https://wa.me/+916207375459", label: "WhatsApp" },
                { icon: Globe, href: "#", label: "Website" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            
            {/* Footer Links */}
            <div className="flex justify-center space-x-8 mb-8 text-sm">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>
            
            {/* Copyright */}
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 text-sm">
                &copy; 2025 Shivam Roy. All rights reserved. | Personal Branding Specialist for Legal Professionals & Founders
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Designed and developed with ❤️ for building digital authority
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default Portfolio