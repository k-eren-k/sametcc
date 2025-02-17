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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 150;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
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
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
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
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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



  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div ref={contentRef} className={`relative z-10 container mx-auto px-4 py-12 ${poppins.className} text-white`}>
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl font-bold sm:text-5xl"  // Responsive font size
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Samet Can Cıncık
          </motion.h1>
          <motion.p
            className="text-lg text-gray-400 sm:text-xl"  // Responsive font size
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Yazılım Mühendisi
          </motion.p>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 sm:text-3xl">İletişim</h2> {/* Responsive font size */}
            <p>Email: <a href="mailto:sametcn99@gmail.com" className="text-blue-500 hover:underline">sametcn99@gmail.com</a></p>
            <p>Telefon: +90 530 379 0565</p>
            <p>Konum: Yenimahalle, ANKARA</p>
            <p>Kişisel Web Sitesi: <a href="https://sametcc.me" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">sametcc.me</a></p>
            <p>Github: <a href="https://github.com/sametcn99" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">sametcn99</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/sametc0" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">sametc0</a></p>
            <p>Doğum Tarihi: 09.10.1999</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 sm:text-3xl">Hakkımda</h2> {/* Responsive font size */}
            <p className="text-gray-400">
              Çeşitli yazılım dillerinde ve teknolojilerde deneyimli, web geliştirme, mobil uygulama geliştirme ve veritabanı yönetimi konularında bilgi sahibi bir web geliştiriciyim.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 sm:text-3xl">Eğitim</h2> {/* Responsive font size */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold sm:text-2xl">Gazi Üniversitesi</h3> {/* Responsive font size */}
              <p className="text-gray-400">Bilgisayar Programcılığı, Önlisans</p>
              <p className="text-gray-400">Tarih: 17.08.2019 - 27.06.2022</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold sm:text-2xl">Fatma Yaşar Önen Mesleki ve Teknik Anadolu Lisesi</h3> {/* Responsive font size */}
              <p className="text-gray-400">Muhasebe ve Finansman, Lise</p>
              <p className="text-gray-400">Tarih: 2013 - 2017</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 sm:text-3xl">Deneyim</h2> {/* Responsive font size */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold sm:text-2xl">Boru Hatları İle Petrol Taşıma Anonim Şirketi (BOTAŞ)</h3> {/* Responsive font size */}
              <p className="text-gray-400">Stajyer, Ankara</p>
              <p className="text-gray-400">Tarih: 07/2022 - 08/2022</p>
              <p className="text-gray-400">Açıklama: Staj sürecimde, Yapay Zeka ve Görüntü İşleme temelli bir Android uygulama geliştirme projesinde yer aldım.</p>
            </div>
          </div>


        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 sm:text-3xl">Projeler</h2> {/* Responsive font size */}
          <div className="flex flex-col gap-6">
            {projects.map((project, index) => (
              <div key={index} className="backdrop-blur-lg bg-opacity-20 bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold sm:text-2xl">{project.title}</h3> {/* Responsive font size */}
                <p className="text-gray-400">{project.description}</p>
                <p className="text-gray-400"><strong>Kullanılan Teknolojiler:</strong> {project.technologies}</p>
                <a href={project.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Proje Bağlantısı</a>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 sm:text-3xl">Skills</h2> {/* Responsive font size */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4"> {/* Responsive grid */}
            {skills.map((skill, index) => (
              <div key={index} className="backdrop-blur-lg bg-opacity-20 bg-gray-900 p-4 rounded-lg text-center">
                <p className="text-gray-300">{skill}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 sm:text-3xl">Social Networks</h2> {/* Responsive font size */}
          <div className="flex flex-wrap gap-4">
            {socialNetworks.map((network, index) => (
              <Link key={index} href={network.href} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-300 hover:text-white">
                <network.icon />
              </Link>
            ))}
          </div>
        </section>
        </div>
      </div>

      <motion.button
        onClick={handleDownloadPdf}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full z-20 flex items-center sm:bottom-4 sm:right-4"  // Responsive button position
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaDownload className="mr-2" />
        Download PDF
      </motion.button>
    </div>
  );
};

export default CVPage;
