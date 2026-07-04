"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Certifications", href: "#certifications" },
    { label: "Projects", href: "#projects" },
    { label: "Lab", href: "#soclab" },
    { label: "SOC Projects", href: "#soc-projects" },
    { label: "Skills", href: "#skills" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "glass border-b border-white/5 shadow-lg shadow-black/20"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <a href="#hero" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/8 border border-white/10 flex items-center justify-center text-white font-bold text-sm group-hover:border-white/20 group-hover:bg-white/12 transition-all duration-300">
                        A
                    </div>
                    <span className="font-heading font-bold text-lg tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                        Aadhi
                    </span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="relative px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:text-white/90 transition-colors duration-300 group"
                        >
                            {link.label}
                            {/* Animated underline */}
                            <span className="absolute bottom-1.5 left-4 right-4 h-px bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </a>
                    ))}
                    <a
                        href="#soclab"
                        className="ml-3 px-5 py-2 rounded-lg text-sm font-semibold bg-white/10 border border-white/12 text-white/80 hover:bg-white/15 hover:text-white hover:border-white/20 transition-all duration-300"
                    >
                        Contact
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        className="w-6 h-0.5 bg-white/60 block"
                    />
                    <motion.span
                        animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-6 h-0.5 bg-white/60 block"
                    />
                    <motion.span
                        animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                        className="w-6 h-0.5 bg-white/60 block"
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/5 overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="px-4 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
