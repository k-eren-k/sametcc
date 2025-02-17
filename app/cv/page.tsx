"use client"

import React, { useEffect, useRef } from 'react';
import { Poppins } from 'next/font/google';
import {
  SiGithub,
  SiLetterboxd,
  SiSpotify,
  SiLeetcode
} from "react-icons/si";
import {
  FaLinkedin,
  FaTelegram,
  FaMailBulk,
  FaDownload
} from 'react-icons/fa';
import Link from "next/link";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const CVPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- Particle Effect Adjustments ---
    let particleCount = 50; // Reduced particle count for mobile
    let maxParticleSize = 1.5; // Reduced max size
    let particleSpeedMultiplier = 0.5; // Slow down particles

    // Adjust based on screen size (optional, but recommended for finer control)
    if (window.innerWidth < 640) { // Small screens (sm breakpoint)
      particleCount = 30;
      maxParticleSize = 1;
        particleSpeedMultiplier = 0.3;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const particles: Particle[] = [];


    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * maxParticleSize + 0.1; // Use maxParticleSize
        this.speedX = (Math.random() * 1 - 0.5) * particleSpeedMultiplier; // Apply speed multiplier
        this.speedY = (Math.random() * 1 - 0.5) * particleSpeedMultiplier; // Apply speed multiplier
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";  // Keep the subtle color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;

        // --- Recalculate particles on resize ---
        particles.length = 0; // Clear existing particles
        let newParticleCount = 50;  // Default
        let newMaxSize = 1.5;
        let newSpeedMultiplier = 0.5

        if (window.innerWidth < 640) {
          newParticleCount = 30;
            newMaxSize = 1;
            newSpeedMultiplier = 0.3;
        }

        for (let i = 0; i < newParticleCount; i++) { // Use new count
            const particle = new Particle();
            particle.size = Math.random() * newMaxSize + 0.1; //resize a uygun olsun diye
            particle.speedX = (Math.random() * 1 - 0.5) * newSpeedMultiplier;
            particle.speedY = (Math.random() * 1 - 0.5) * newSpeedMultiplier
          particles.push(particle);
        }

    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array, as before

  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('samet_can_cincik_cv.pdf');
  };

    const projects = [
      {
        title: "Project 1",
        description: "Description of Project 1.",
        technologies: "React, Next.js, Tailwind CSS",
        link: "https://example.com/project1"
      },
      {
        title: "Project 2",
        description: "Description of Project 2",
        technologies: "Node.js, Express, MongoDB",
        link: "https://example.com/project2"
      }
    ];
  
    const skills = [
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Python",
        "Java",
        "C#"
    ];
  
    const socialNetworks = [
      {
        href: "https://github.com/sametcn99",
        icon: SiGithub
      },
      {
        href: "https://www.linkedin.com/in/sametc0",
        icon: FaLinkedin
      },
      {
        href: "https://letterboxd.com/sametcn/",
        icon: SiLetterboxd
      },
      {
        href: "https://open.spotify.com/user/31g4pu5iwxan42w7is2x5jx5665y?si=b526e46d521d4034",
        icon: SiSpotify
      },
        {
            href: "https://leetcode.com/sametcn/",
            icon: SiLeetcode
        },
      {
        href: "https://t.me/sametcn",
        icon: FaTelegram
      },
      {
        href: "mailto:sametcn99@gmail.com",
        icon: FaMailBulk
      }

    ];

     // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger the animation of children (reduced for faster animation)
        delayChildren: 0.3,   // Delay the animation of children (reduced for faster animation)
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 }, // Reduced y offset
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120, // Slightly increased stiffness
        damping: 18,   // Slightly reduced damping
      },
    },
  };



  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <motion.div
        ref={contentRef}
        className={`relative z-10 container mx-auto px-4 py-12 ${poppins.className} text-white`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"

      >
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl font-bold sm:text-5xl"
            variants={itemVariants}
          >
            Samet Can Cıncık
          </motion.h1>
          <motion.p
            className="text-lg text-gray-400 sm:text-xl"
            variants={itemVariants}
          >
            Yazılım Mühendisi
          </motion.p>
        </div>

        <div className="flex flex-col gap-8">
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-4 sm:text-3xl">İletişim</h2>
            <motion.p variants={itemVariants}>Email: <a href="mailto:sametcn99@gmail.com" className="text-blue-500 hover:underline">sametcn99@gmail.com</a></motion.p>
            <motion.p variants={itemVariants}>Telefon: +90 530 379 0565</motion.p>
            <motion.p variants={itemVariants}>Konum: Yenimahalle, ANKARA</motion.p>
            <motion.p variants={itemVariants}>Kişisel Web Sitesi: <a href="https://sametcc.me" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">sametcc.me</a></motion.p>
            <motion.p variants={itemVariants}>Github: <a href="https://github.com/sametcn99" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">sametcn99</a></motion.p>
            <motion.p variants={itemVariants}>LinkedIn: <a href="https://www.linkedin.com/in/sametc0" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">sametc0</a></motion.p>
            <motion.p variants={itemVariants}>Doğum Tarihi: 09.10.1999</motion.p>

            <h2 className="text-2xl font-bold mt-8 mb-4 sm:text-3xl">Hakkımda</h2>
            <motion.p className="text-gray-400" variants={itemVariants}>
              Çeşitli yazılım dillerinde ve teknolojilerde deneyimli, web geliştirme, mobil uygulama geliştirme ve veritabanı yönetimi konularında bilgi sahibi bir web geliştiriciyim.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-4 sm:text-3xl">Eğitim</h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold sm:text-2xl">Gazi Üniversitesi</h3>
              <motion.p className="text-gray-400" variants={itemVariants}>Bilgisayar Programcılığı, Önlisans</motion.p>
              <motion.p className="text-gray-400" variants={itemVariants}>Tarih: 17.08.2019 - 27.06.2022</motion.p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold sm:text-2xl">Fatma Yaşar Önen Mesleki ve Teknik Anadolu Lisesi</h3>
              <motion.p className="text-gray-400" variants={itemVariants}>Muhasebe ve Finansman, Lise</motion.p>
              <motion.p className="text-gray-400" variants={itemVariants}>Tarih: 2013 - 2017</motion.p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 sm:text-3xl">Deneyim</h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold sm:text-2xl">Boru Hatları İle Petrol Taşıma Anonim Şirketi (BOTAŞ)</h3>
              <motion.p className="text-gray-400" variants={itemVariants}>Stajyer, Ankara</motion.p>
              <motion.p className="text-gray-400" variants={itemVariants}>Tarih: 07/2022 - 08/2022</motion.p>
              <motion.p className="text-gray-400" variants={itemVariants}>Açıklama: Staj sürecimde, Yapay Zeka ve Görüntü İşleme temelli bir Android uygulama geliştirme projesinde yer aldım.</motion.p>
            </div>
          </motion.div>


        <motion.section className="mb-10" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 sm:text-3xl">Projeler</h2>
          <div className="flex flex-col gap-6">
            {projects.map((project, index) => (
              <motion.div key={index} className="backdrop-blur-lg bg-opacity-20 bg-gray-900 p-6 rounded-lg shadow-lg" variants={itemVariants}>
                <h3 className="text-xl font-semibold sm:text-2xl">{project.title}</h3>
                <motion.p className="text-gray-400" variants={itemVariants}>{project.description}</motion.p>
                <motion.p className="text-gray-400" variants={itemVariants}><strong>Kullanılan Teknolojiler:</strong> {project.technologies}</motion.p>
                <motion.a href={project.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" variants={itemVariants}>Proje Bağlantısı</motion.a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mb-10" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 sm:text-3xl">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div key={index} className="backdrop-blur-lg bg-opacity-20 bg-gray-900 p-4 rounded-lg text-center" variants={itemVariants}>
                <p className="text-gray-300">{skill}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mb-10" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 sm:text-3xl">Social Networks</h2>
          <div className="flex flex-wrap gap-4">
            {socialNetworks.map((network, index) => (
              <Link key={index} href={network.href} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-300 hover:text-white">
                <motion.span variants={itemVariants}><network.icon /></motion.span>
              </Link>
            ))}
          </div>
        </motion.section>
        </div>
      </motion.div>

      <motion.button
          onClick={handleDownloadPdf}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full z-20 flex items-center sm:bottom-4 sm:right-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
           initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1.5 }} // Delay to ensure it appears last
        >
          <FaDownload className="mr-2" />
          Download PDF
      </motion.button>

    </div>
  );
};

export default CVPage;
