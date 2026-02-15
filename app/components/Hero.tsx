"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] sm:min-h-[100dvh] overflow-hidden bg-black">


      {/* Background */}
      <Image
        src="/assets/bg.png"
        alt="Background"
        fill
        priority
        quality={100}
        className="object-cover"
      />

      {/* Background Noise */}
      <div
        className="
          absolute inset-0
          pointer-events-none
          z-10
          bg-[url('/assets/noise.png')]
          bg-repeat
          bg-[length:200px_200px]
          opacity-10
          mix-blend-soft-light
        "
      />

      {/* Navbar - Fixed to top */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
        className={`
          fixed w-full flex items-center justify-between
          top-0 px-6
          sm:px-10
          lg:px-20
          py-6 sm:py-8 lg:py-5
          z-50
          transition-all duration-500
          ${scrolled ? 'backdrop-blur-xl bg-black/80' : 'bg-transparent'}
        `}
      >
        {/* Brand Name */}
        <div className="relative">
          <h1
            className="
              text-white/90 font-bold whitespace-nowrap tracking-wide
              font-[family-name:var(--font-museo-moderno)]
              text-base sm:text-xl lg:text-[28px]
            "
          >
            DEVSOMEWARE .
          </h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="
                text-white/70 text-sm font-medium tracking-wide
                hover:text-white/95 transition-colors duration-300
                relative group
              "
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/90 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden relative w-6 h-6 flex items-center justify-center group"
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-full h-[1px] bg-white/90 transition-all duration-300 origin-center"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-[1px] bg-white/90 transition-all duration-300"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-full h-[1px] bg-white/90 transition-all duration-300 origin-center"
            />
          </div>
        </button>

        {/* Logo */}
        <div
          className="
            relative
            w-[45px]
            sm:w-[70px]
            lg:w-[110px]
            aspect-[125/116]
          "
        >
          <Image
            src="/logo/logo-v2.png"
            alt="Devsomeware Logo"
            fill
            priority
            className="object-contain brightness-90"
          />
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.3 }}
        className="
          fixed inset-0 z-[45] lg:hidden
          backdrop-blur-md bg-black/80
          flex items-center justify-center
        "
      >
        <motion.div
          initial={false}
          animate={mobileMenuOpen ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col items-center gap-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="
                text-white/90 text-2xl font-medium tracking-wide
                font-[family-name:var(--font-museo-moderno)]
                hover:text-white transition-colors duration-300
              "
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Center Content */}
      <div className="relative z-20 flex items-start sm:items-center pt-32 sm:pt-24 lg:pt-0 pb-10 sm:pb-0 min-h-[100svh] sm:min-h-[100dvh]">
        <div className="w-full px-6 sm:px-10 lg:px-20">
          <motion.div 
            className="max-w-4xl relative"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Vertical Accent Line */}
            <motion.div 
              className="absolute -left-4 sm:-left-8 top-0 w-[1px] h-32 sm:h-40 bg-gradient-to-b from-white/40 via-white/20 to-transparent"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
              style={{ transformOrigin: 'top' }}
            />

            <motion.h2
              variants={fadeInUp}
              className="
                text-white/95 font-medium
                font-[family-name:var(--font-museo-moderno)]
                text-4xl sm:text-6xl lg:text-7xl
                leading-[1.1]
                tracking-tight
              "
            >
              Scalable products,
              <br />
              disciplined execution.
            </motion.h2>

            <motion.div 
              variants={fadeInUp}
              className="mt-12 sm:mt-16 max-w-2xl"
            >
              <p className="text-white/60 text-base sm:text-lg lg:text-xl leading-relaxed">
                Devsomeware builds scalable software and future-ready brands.
                We focus on systems, design, and execution that last.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-3xl"
            >
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group cursor-default"
              >
                <p className="text-white/95 text-sm sm:text-base font-medium tracking-wide transition-colors duration-300 group-hover:text-white">
                  SaaS Products
                </p>
                <p className="mt-2 text-white/50 text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/60">
                  Built to scale
                </p>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group cursor-default"
              >
                <p className="text-white/95 text-sm sm:text-base font-medium tracking-wide transition-colors duration-300 group-hover:text-white">
                  Digital Solutions
                </p>
                <p className="mt-2 text-white/50 text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/60">
                  Designed to perform
                </p>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group cursor-default"
              >
                <p className="text-white/95 text-sm sm:text-base font-medium tracking-wide transition-colors duration-300 group-hover:text-white">
                  Brand Systems
                </p>
                <p className="mt-2 text-white/50 text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/60">
                  Structured to last
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
