"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInOnScroll, TextReveal } from "@/components/ScrollEffects";
import Image from "next/image";

const certificates = [
    {
        id: 1,
        title: "Cisco Certified Support Technician — Cybersecurity",
        issuer: "Cisco",
        date: "October 30, 2025",
        badge: "CCST",
        image: "/certificates/cisco_certified_support_technician_cybersecurity.jpeg",
        color: "from-cyan-500/20 to-blue-500/10",
        borderColor: "border-cyan-500/30",
        verifyCode: "waTkH-FaWm",
        verifyUrl: "https://certiport.com",
        tags: ["Cybersecurity", "Cisco", "Official Exam"],
    },
    {
        id: 2,
        title: "Networking Basics",
        issuer: "Cisco Networking Academy",
        date: "2025",
        badge: "Verified",
        image: "/certificates/networking-basics.png",
        color: "from-blue-500/20 to-indigo-500/10",
        borderColor: "border-blue-500/30",
        verifyCode: null,
        verifyUrl: null,
        tags: ["Networking", "Cisco", "TCP/IP"],
    },
    {
        id: 3,
        title: "Connect and Protect: Networks and Network Security",
        issuer: "Google via Coursera",
        date: "June 16, 2025",
        badge: "Coursera",
        image: "/certificates/networks_to_network_security.jpeg",
        color: "from-green-500/20 to-teal-500/10",
        borderColor: "border-green-500/30",
        verifyCode: null,
        verifyUrl: "https://coursera.org/verify/X6YN7URWXVXT",
        tags: ["Network Security", "Google", "Coursera"],
    },
    {
        id: 4,
        title: "Play It Safe: Manage Security Risks",
        issuer: "Google via Coursera",
        date: "November 17, 2024",
        badge: "Coursera",
        image: "/certificates/manage_security_risk_cybersecurity.jpeg",
        color: "from-purple-500/20 to-violet-500/10",
        borderColor: "border-purple-500/30",
        verifyCode: null,
        verifyUrl: "https://coursera.org/verify/Y1BXCAYE63AN",
        tags: ["Risk Management", "Google", "Coursera"],
    },
    {
        id: 5,
        title: "Ethical Hacking with Kali Linux",
        issuer: "IBM via Coursera",
        date: "June 21, 2025",
        badge: "IBM",
        image: "/certificates/ethical_hacking_with_kalilinux.jpeg",
        color: "from-red-500/20 to-orange-500/10",
        borderColor: "border-red-500/30",
        verifyCode: null,
        verifyUrl: "https://coursera.org/verify/ZP2I1ZXPG843",
        tags: ["Ethical Hacking", "Kali Linux", "IBM"],
    },
    {
        id: 6,
        title: "Introduction to Kali Linux Basics",
        issuer: "Simplilearn SkillUp",
        date: "July 4, 2025",
        badge: "Verified",
        image: "/certificates/intro_to_kali_linux.jpeg",
        color: "from-amber-500/20 to-yellow-500/10",
        borderColor: "border-amber-500/30",
        verifyCode: "8572396",
        verifyUrl: null,
        tags: ["Kali Linux", "Linux Basics", "Simplilearn"],
    },
];

export default function Certifications() {
    const [selected, setSelected] = useState<number | null>(null);
    const selectedCert = certificates.find((c) => c.id === selected);

    // Carousel state
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    const updateScrollState = useCallback(() => {
        const el = carouselRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanScrollLeft(scrollLeft > 8);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
        setScrollProgress(scrollLeft / Math.max(1, scrollWidth - clientWidth));
    }, []);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        el.addEventListener("scroll", updateScrollState, { passive: true });
        updateScrollState();
        return () => el.removeEventListener("scroll", updateScrollState);
    }, [updateScrollState]);

    const scroll = (dir: "left" | "right") => {
        const el = carouselRef.current;
        if (!el) return;
        // Scroll by 1 card width (roughly 1/3 of container on desktop)
        const amount = el.clientWidth / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
        el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
    };

    return (
        <section id="certifications" className="relative py-24 md:py-32 px-6 overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />

            <div className="max-w-6xl mx-auto relative">
                {/* Section header */}
                <FadeInOnScroll direction="up">
                    <div className="text-center mb-16">
                        <p className="text-sm font-mono text-white/30 tracking-widest uppercase mb-3">
                            [ Credentials ]
                        </p>
                        <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight">
                            <TextReveal text="Certifications" className="gradient-text" />
                        </h2>
                        <p className="mt-4 text-white/40 max-w-md mx-auto">
                            Industry certifications from Cisco, Google, IBM, and Simplilearn —
                            verifying hands-on cybersecurity expertise.
                        </p>
                    </div>
                </FadeInOnScroll>

                {/* Carousel */}
                <FadeInOnScroll direction="up" delay={0.05}>
                    <div className="relative">
                        {/* Prev button */}
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            aria-label="Previous certificates"
                            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 rounded-full glass border flex items-center justify-center transition-all duration-200 ${canScrollLeft
                                    ? "border-white/15 text-white/60 hover:text-white/90 hover:border-white/25 hover:bg-white/8"
                                    : "border-white/5 text-white/10 cursor-not-allowed"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Cards track */}
                        <div
                            ref={carouselRef}
                            className="carousel-scroll flex gap-5 pb-2"
                        >
                            {certificates.map((cert) => (
                                <div
                                    key={cert.id}
                                    className="flex-none w-[85vw] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                                    style={{ scrollSnapAlign: "start" }}
                                >
                                    <motion.div
                                        whileHover={{ y: -6 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => setSelected(cert.id)}
                                        className={`glass-card-hover group cursor-pointer relative overflow-hidden border ${cert.borderColor} h-full`}
                                    >
                                        {/* Gradient bg on hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                        {/* Certificate thumbnail */}
                                        <div className="relative h-44 overflow-hidden rounded-t-[calc(1rem-1px)]">
                                            <Image
                                                src={cert.image}
                                                alt={cert.title}
                                                fill
                                                className="object-cover object-top group-hover:scale-105 transition-transform duration-600"
                                                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            {/* Overlay gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                                            {/* Badge */}
                                            <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-black/50 backdrop-blur-sm text-white/70 border ${cert.borderColor}`}>
                                                {cert.badge}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 p-5">
                                            <h3 className="font-heading font-bold text-sm text-white/90 leading-snug mb-1 line-clamp-2">
                                                {cert.title}
                                            </h3>
                                            <p className="text-xs font-mono text-white/45 mb-3">
                                                {cert.issuer}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {cert.tags.slice(0, 2).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className={`px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border ${cert.borderColor} text-white/45`}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="text-[10px] text-white/25 font-mono">{cert.date}</span>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                        {/* Next button */}
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            aria-label="Next certificates"
                            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 rounded-full glass border flex items-center justify-center transition-all duration-200 ${canScrollRight
                                    ? "border-white/15 text-white/60 hover:text-white/90 hover:border-white/25 hover:bg-white/8"
                                    : "border-white/5 text-white/10 cursor-not-allowed"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Progress bar */}
                        <div className="mt-5 h-0.5 bg-white/6 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-white/25 rounded-full"
                                style={{ width: `${scrollProgress * 100}%` }}
                                transition={{ type: "tween", duration: 0.1 }}
                            />
                        </div>
                    </div>
                </FadeInOnScroll>

                {/* Summary bar */}
                <FadeInOnScroll direction="up" delay={0.3}>
                    <div className="mt-10 glass-card p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                            <span className="text-sm text-white/50 font-mono">
                                6 certifications · Cisco · Google · IBM · Simplilearn
                            </span>
                        </div>
                        <div className="flex gap-4 text-xs font-mono text-white/30">
                            <span>Network Security</span>
                            <span>Ethical Hacking</span>
                            <span>Risk Management</span>
                        </div>
                    </div>
                </FadeInOnScroll>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selected !== null && selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`relative max-w-2xl w-full glass-card border ${selectedCert.borderColor} overflow-hidden`}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white/90 hover:border-white/20 transition-all duration-200"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Certificate image */}
                            <div className="relative h-64 md:h-80">
                                <Image
                                    src={selectedCert.image}
                                    alt={selectedCert.title}
                                    fill
                                    className="object-contain object-center bg-white/4"
                                    sizes="(max-width: 640px) 100vw, 672px"
                                />
                            </div>

                            {/* Details */}
                            <div className="p-6">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-white/50 bg-white/5 border ${selectedCert.borderColor} mb-3`}>
                                    <span>{selectedCert.issuer}</span>
                                </div>
                                <h3 className="text-xl font-heading font-bold text-white/90 mb-2">
                                    {selectedCert.title}
                                </h3>
                                <p className="text-sm text-white/35 font-mono mb-4">
                                    Issued: {selectedCert.date}
                                    {selectedCert.verifyCode && ` · Code: ${selectedCert.verifyCode}`}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {selectedCert.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`px-3 py-1 rounded-full text-xs font-medium bg-white/5 border ${selectedCert.borderColor} text-white/55`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {selectedCert.verifyUrl && (
                                    <a
                                        href={selectedCert.verifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white/90 transition-colors"
                                    >
                                        Verify Certificate
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
