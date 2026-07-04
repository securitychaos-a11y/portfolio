"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import MatrixRain from "@/components/ui/MatrixRain";
import Image from "next/image";

const terminalLines = [
    "root@aadhi:~# whoami",
    "Aadhithyan KM — B.Tech CSE | SOC Analyst",
    "root@aadhi:~# cat skills.txt",
    "[+] SIEM | Network Security | Threat Detection",
    "root@aadhi:~# systemctl status home-lab",
    "[ OK ] Splunk Enterprise — running",
    "[ OK ] Wazuh SIEM — running",
    "[ OK ] Kali Linux VM — active",
    "root@aadhi:~# echo $GOAL",
    "> Defending networks. One alert at a time.",
];

const roles = [
    "SOC Analyst",
    "Blue Team Defender",
    "SIEM Engineer",
    "Threat Hunter",
];

export default function Hero() {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [roleIndex, setRoleIndex] = useState(0);
    const [roleKey, setRoleKey] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);

    // Typewriter effect
    useEffect(() => {
        if (currentLine >= terminalLines.length) return;
        const line = terminalLines[currentLine];
        if (currentChar < line.length) {
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => {
                    const newLines = [...prev];
                    newLines[currentLine] = line.substring(0, currentChar + 1);
                    return newLines;
                });
                setCurrentChar((c) => c + 1);
            }, 28 + Math.random() * 18);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setCurrentLine((l) => l + 1);
                setCurrentChar(0);
                setDisplayedLines((prev) => [...prev, ""]);
            }, 380);
            return () => clearTimeout(timeout);
        }
    }, [currentLine, currentChar]);

    // Role ticker
    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((i) => (i + 1) % roles.length);
            setRoleKey((k) => k + 1);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative w-full min-h-screen overflow-hidden bg-background"
        >
            {/* Parallax gradient orbs */}
            <motion.div
                style={{ y: orbY1 }}
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[140px]"
            />
            <motion.div
                style={{ y: orbY2 }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-[120px]"
            />

            <MatrixRain />

            <motion.div
                style={{ y: heroY, opacity: heroOpacity }}
                className="relative z-10 min-h-screen flex items-center"
            >
                {/* ── Split layout ────────────────────────────────── */}
                <div className="w-full max-w-6xl mx-auto px-6 pt-24 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

                    {/* LEFT — text content */}
                    <div className="flex flex-col justify-center">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="text-xs font-mono text-white/25 tracking-widest uppercase mb-5"
                        >
                            [ System Online ]
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[0.9] mb-5"
                        >
                            <span className="block text-white/90">AADHITHYAN</span>
                            <span className="block text-white/90">K M</span>
                        </motion.h1>

                        {/* Role ticker */}
                        <div className="h-7 flex items-center mb-6">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={roleKey}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-sm font-mono text-white/40 tracking-widest"
                                >
                                    {roles[roleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.65 }}
                            className="text-sm md:text-base text-white/35 leading-relaxed mb-8 max-w-sm"
                        >
                            B.Tech CSE student building a career in network security &amp;
                            threat detection. Cisco CCST certified. Running a real SOC home lab.
                        </motion.p>

                        {/* Terminal */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.7 }}
                            className="glass-card p-4 md:p-5 w-full"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-white/12" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white/8" />
                                <div className="w-2.5 h-2.5 rounded-full bg-cyber-green/40" />
                                <span className="ml-2 text-[10px] text-white/20 font-mono tracking-widest">
                                    root@aadhi:~#
                                </span>
                            </div>
                            <div className="font-mono text-[11px] md:text-xs space-y-0.5 min-h-[120px]">
                                {displayedLines.map((line, i) => (
                                    <div key={i} className="text-cyber-green/90">
                                        {line}
                                    </div>
                                ))}
                                {currentLine < terminalLines.length && (
                                    <div className="flex items-center">
                                        <span className="text-cyber-green/90">
                                            {terminalLines[currentLine].substring(0, currentChar)}
                                        </span>
                                        <span className="w-1.5 h-3.5 bg-cyber-green ml-0.5 animate-blink" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT — portrait card */}
                    <motion.div
                        style={{ y: imageY }}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden md:flex justify-center items-center"
                    >
                        <div className="relative group">
                            {/* Portrait frame */}
                            <div className="relative w-[300px] h-[400px] lg:w-[340px] lg:h-[450px] rounded-2xl overflow-hidden">
                                <Image
                                    src="/images/profile-1.jpg"
                                    alt="Aadhithyan KM"
                                    fill
                                    priority
                                    className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-700"
                                    sizes="(max-width: 1024px) 300px, 340px"
                                />
                                {/* Subtle bottom fade */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                                {/* Glass overlay on hover */}
                                <div className="absolute inset-0 bg-white/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Border frame */}
                            <div className="absolute -inset-px rounded-2xl border border-white/8 pointer-events-none" />
                            <div className="absolute -inset-2 rounded-3xl border border-white/4 pointer-events-none" />

                            {/* Status badge — bottom of image */}
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="glass border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2.5 backdrop-blur-md">
                                    <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse flex-shrink-0" />
                                    <span className="text-xs font-mono text-white/60 tracking-wide">Available for Opportunities</span>
                                </div>
                            </div>

                            {/* Decorative accent glow */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] text-white/15 font-mono tracking-widest">SCROLL</span>
                        <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5">
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1 h-1 rounded-full bg-white/30"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
