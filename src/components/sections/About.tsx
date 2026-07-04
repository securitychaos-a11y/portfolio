"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FadeInOnScroll, CountUp } from "@/components/ScrollEffects";

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <section ref={sectionRef} id="about" className="relative py-24 md:py-32 px-6 overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-cyan-600/5 rounded-full blur-[120px]" />

            <div className="max-w-6xl mx-auto relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                    {/* Photo with parallax */}
                    <FadeInOnScroll direction="left" className="flex justify-center">
                        <motion.div style={{ y: imageY }} className="relative group">
                            <div className="relative">
                                {/* Main photo */}
                                <div className="w-[280px] h-[380px] md:w-[320px] md:h-[420px] rounded-2xl overflow-hidden glass-border relative z-10">
                                    <Image
                                        src="/images/profile-2.jpg"
                                        alt="Aadhi in the mountains"
                                        fill
                                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                                        sizes="(max-width: 768px) 280px, 320px"
                                    />
                                    {/* Subtle bottom gradient for text legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                </div>
                                {/* Decorative frame */}
                                <div className="absolute -inset-3 rounded-2xl border border-white/5 -z-0" />
                                <div className="absolute -inset-6 rounded-3xl border border-white/3 -z-0" />
                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-0" />
                                {/* Accent corners */}
                                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-purple-500/15 to-transparent rounded-full blur-lg" />
                                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-cyan-500/15 to-transparent rounded-full blur-lg" />
                            </div>
                        </motion.div>
                    </FadeInOnScroll>

                    {/* Content with parallax */}
                    <motion.div style={{ y: contentY }}>
                        <FadeInOnScroll direction="right" delay={0.1}>
                            <p className="text-sm font-mono text-white/30 tracking-widest uppercase mb-3">
                                [ About Me ]
                            </p>
                            <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight mb-6">
                                <span className="text-white/90">Hey, I&apos;m </span>
                                <span className="text-white/90">Aadhi</span>
                            </h2>
                        </FadeInOnScroll>

                        <FadeInOnScroll direction="right" delay={0.2}>
                            <div className="space-y-4 text-white/50 leading-relaxed">
                                <p>
                                    A <span className="text-white/80 font-medium">B.Tech CSE student</span> with
                                    a deep focus on network security and cybersecurity. I&apos;m actively
                                    building toward a career as a <span className="text-white/80 font-medium">SOC Analyst</span>.
                                </p>
                                <p>
                                    I&apos;ve built a real <span className="text-white/75 font-medium">home lab</span> running
                                    Splunk Enterprise, Wazuh SIEM, Kali Linux, and Sysmon — simulating a live
                                    Security Operations Center. I analyze Windows authentication events,
                                    correlate logs, and document investigations like a real SOC workflow.
                                </p>
                                <p>
                                    Cisco CCST Cybersecurity certified. Currently deepening expertise in
                                    threat detection, incident response, and SIEM rule engineering.
                                </p>
                            </div>
                        </FadeInOnScroll>

                        {/* Animated counter stats */}
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            {[
                                { value: 6, suffix: "+", label: "Certifications" },
                                { value: 3, suffix: "+", label: "Years Coding" },
                                { value: 4, suffix: "", label: "Lab Tools" },
                            ].map((stat, i) => (
                                <FadeInOnScroll key={i} direction="up" delay={0.3 + i * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        transition={{ duration: 0.25 }}
                                        className="glass-card p-4 text-center group"
                                    >
                                        <p className="text-2xl font-bold text-white/90 font-heading">
                                            <CountUp target={stat.value} suffix={stat.suffix} duration={2} />
                                        </p>
                                        <p className="text-xs text-white/35 font-mono mt-1">
                                            {stat.label}
                                        </p>
                                    </motion.div>
                                </FadeInOnScroll>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
