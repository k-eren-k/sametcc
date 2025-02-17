"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  FaInstagram,
  FaTwitter, // Keeping some from Fa for consistency when Si doesn't have an exact match
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaBehance,
  FaTelegram,
  FaFileDownload, // Icon for Resume
} from "react-icons/fa"
import {
  SiLeetcode, // Using Si for LeetCode
  SiGithub,   // Using Si for GitHub
  SiLetterboxd, //Using Si for letterboxd
  SiSpotify, // Using Si for Spotify
} from "react-icons/si"; // Import from Simple Icons
import { MdMail } from "react-icons/md";
import Link from "next/link"
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 150

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const socialNetworks = [
    { name: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/in/sametc0", color: "hover:text-[#0A66C2]" },
    { name: "Resume", icon: FaFileDownload, href: "/cv", color: "hover:text-blue-500" }, // Added Resume
    { name: "GitHub", icon: SiGithub,  href: "https://github.com/sametcn99", color: "hover:text-[#ffffff]" }, // Changed GitHub color
    { name: "LeetCode", icon: SiLeetcode, href: "https://leetcode.com/u/sametcn99/", color: "hover:text-[#FFA116]"   },
    { name: "Mail", icon: MdMail, href: "mailto:samet.cancincik@gmail.com", color: "hover:text-[#DB4437]" },
    { name: "Letterboxd", icon: SiLetterboxd, href: "https://letterboxd.com/sametc001/", color: "hover:text-[#20456E]" },
    { name: "Spotify", icon: SiSpotify, href: "https://open.spotify.com/user/31qg3kutxxwdq5lzydjx6md534cq", color: "hover:text-[#1DB954]" },
    { name: "Telegram", icon: FaTelegram, href: "https://t.me/sametc0", color: "hover:text-[#0088CC]" },
  ];

    // Split socialNetworks into two arrays for the two rows
    const topRowNetworks = socialNetworks.slice(0, 5);
    const bottomRowNetworks = socialNetworks.slice(5);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />
      <div className={`relative z-10 flex h-full flex-col items-center justify-center px-4 text-center ${poppins.className}`}>
        <motion.h1
          className="mb-2 text-4xl font-bold tracking-tighter sm:text-5xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Samet Can Cıncık
        </motion.h1>
        <motion.p
          className="mb-8 max-w-2xl text-sm text-gray-300 sm:mb-8 sm:text-base lg:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Full Stack Web Developer with a passion for creating beautiful and functional websites.
        </motion.p>
        <motion.div
          className="flex flex-col items-center gap-y-1.5 sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >

        {/* First Row */}
        <div className="flex flex-wrap justify-center gap-1.5">
            {topRowNetworks.map((network, index) => (
            <Link key={network.name} href={network.href} passHref>
                <motion.button
                className={`group flex items-center justify-center rounded-xl border border-white/5 px-3 py-1.5 text-sm text-white/50 transition-colors duration-300 hover:bg-gray-500/20  backdrop-blur-sm sm:text-base`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }} // Staggered delay
                >
                <network.icon className={`mr-1 h-4 w-4 transition-colors duration-300 ${network.color}`} />
                <span className="group-hover:text-white">{network.name}</span>
                </motion.button>
            </Link>
            ))}
        </div>

        {/* Second Row */}
        <div className="flex flex-wrap justify-center gap-1.5">
            {bottomRowNetworks.map((network, index) => (
            <Link key={network.name} href={network.href} passHref>
                <motion.button
                className={`group flex items-center justify-center rounded-xl border border-white/5 px-3 py-1.5 text-sm text-white/50 transition-colors duration-300 hover:bg-gray-500/20  backdrop-blur-sm sm:text-base`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (topRowNetworks.length + index) * 0.1 }} // Staggered delay, offset by top row length
                >
                <network.icon className={`mr-1 h-4 w-4 transition-colors duration-300 ${network.color}`} />
                <span className="group-hover:text-white">{network.name}</span>
                </motion.button>
            </Link>
            ))}
        </div>


        </motion.div>
      </div>
    </div>
  )
}