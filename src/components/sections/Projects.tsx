"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInOnScroll, TextReveal, Magnetic } from "@/components/ScrollEffects";

const projects = [
    {
        title: "SOC Home Lab",
        description:
            "A fully functional Security Operations Center home lab built from scratch. Deployed Splunk Enterprise and Wazuh SIEM, integrated Kali Linux as an attacker machine, and configured Sysmon + Universal Forwarder for log collection. Used to investigate real Windows authentication events and simulate blue-team operations.",
        tech: ["Splunk", "Wazuh", "Kali Linux", "Sysmon", "Ubuntu Server", "VirtualBox"],
        featured: true,
        gradient: "from-cyan-600/30 via-blue-600/20 to-teal-600/10",
        borderAccent: "hover:border-white/20",
        link: "#soclab",
        linkLabel: "View Lab Details",
    },
    {
        title: "Blockchain Counterfeit Detection",
        description:
            "A full-stack decentralized application for supply chain authentication. Uses Ethereum smart contracts (Solidity) to track product authenticity from manufacturer to consumer, with unique scratch-off codes and bulk registration. Deployed and live on Vercel.",
        tech: ["Solidity", "React", "Node.js", "Web3.js", "Express", "MongoDB"],
        featured: true,
        gradient: "from-violet-600/30 via-purple-600/20 to-indigo-600/10",
        borderAccent: "hover:border-white/20",
        link: "https://kasargod-sarees.vercel.app/welcome",
        linkLabel: "View Live Project",
    },
    {
        title: "Windows Authentication Investigation",
        description:
            "A real SOC investigation: generated failed and successful authentication events on Windows 11, investigated with Splunk SPL queries and Wazuh alerts, correlated Event IDs (4624, 4625, 4740) into a full timeline. Documented in an incident report following SOC analyst methodology.",
        tech: ["Splunk SPL", "Wazuh", "Sysmon", "Event Viewer", "PowerShell", "MITRE ATT&CK"],
        featured: false,
        gradient: "from-emerald-600/30 via-green-600/20 to-teal-600/10",
        borderAccent: "hover:border-white/20",
        link: "#soclab",
        linkLabel: "View Investigation",
    },
    {
        title: "Cho-Cho Discord Bot",
        description:
            "A feature-rich Discord bot with AI roleplay capabilities, custom personas, multi-turn conversations in threads, and server management tools. Built with Discord.js and integrated AI agents.",
        tech: ["Discord.js", "Node.js", "AI/ML", "JavaScript"],
        featured: false,
        gradient: "from-amber-600/30 via-orange-600/20 to-yellow-600/10",
        borderAccent: "hover:border-white/20",
        link: "#",
        linkLabel: "View Project",
    },
];

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const orbX = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const orbY = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative py-24 md:py-32 px-6 overflow-hidden"
        >
            {/* Parallax background accents */}
            <motion.div
                style={{ x: orbX, y: orbY }}
                className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px]"
            />
            <motion.div
                style={{ x: useTransform(scrollYProgress, [0, 1], [80, -80]) }}
                className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]"
            />

            <div className="max-w-6xl mx-auto relative">
                {/* Section header */}
                <FadeInOnScroll direction="up">
                    <div className="text-center mb-16">
                        <p className="text-sm font-mono text-white/30 tracking-widest uppercase mb-3">
                            [ Projects ]
                        </p>
                        <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight">
                            <TextReveal text="Featured Work" className="gradient-text" />
                        </h2>
                        <p className="mt-4 text-white/40 max-w-md mx-auto">
                            Real-world projects spanning cybersecurity home labs, blockchain,
                            and security investigations.
                        </p>
                    </div>
                </FadeInOnScroll>

                {/* Projects list */}
                <div className="grid grid-cols-1 gap-6">
                    {projects.map((project, i) => (
                        <FadeInOnScroll
                            key={i}
                            direction={i % 2 === 0 ? "left" : "right"}
                            delay={i * 0.1}
                        >
                            <motion.div
                                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                                className={`glass-card-hover group relative overflow-hidden ${project.featured ? "md:grid md:grid-cols-5 md:gap-0" : ""
                                    } ${project.borderAccent}`}
                            >
                                {/* Gradient background layer */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                                />

                                {/* Decorative side accent (featured only) */}
                                {project.featured && (
                                    <div className="hidden md:flex md:col-span-2 items-center justify-center relative p-12">
                                        <Magnetic strength={0.4}>
                                            <div className="relative">
                                                {/* Abstract geometric decoration instead of emoji */}
                                                <motion.div
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                    transition={{ duration: 0.4 }}
                                                    className="w-20 h-20 rounded-2xl border border-white/10 bg-white/4 backdrop-blur-sm flex items-center justify-center"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5" />
                                                </motion.div>
                                                {/* Decorative rings */}
                                                <motion.div
                                                    className="absolute inset-0 -m-8 border border-white/5 rounded-full"
                                                    whileHover={{ scale: 1.1 }}
                                                />
                                                <motion.div
                                                    className="absolute inset-0 -m-16 border border-white/3 rounded-full"
                                                    whileHover={{ scale: 1.05 }}
                                                />
                                                <div className="absolute inset-0 -m-24 border border-white/2 rounded-full" />
                                            </div>
                                        </Magnetic>
                                    </div>
                                )}

                                {/* Content */}
                                <div
                                    className={`relative z-10 p-8 md:p-10 ${project.featured ? "md:col-span-3" : ""
                                        }`}
                                >
                                    {project.featured && (
                                        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-white/40 bg-white/5 border border-white/10 mb-4 uppercase">
                                            Featured Project
                                        </span>
                                    )}

                                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white/90 mb-4">
                                        {project.title}
                                    </h3>

                                    <p className="text-white/50 leading-relaxed mb-6 text-sm md:text-base">
                                        {project.description}
                                    </p>

                                    {/* Tech badges */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((t) => (
                                            <motion.span
                                                key={t}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/8 text-white/55 hover:text-white/80 hover:border-white/15 transition-colors cursor-default"
                                            >
                                                {t}
                                            </motion.span>
                                        ))}
                                    </div>

                                    {/* Action link */}
                                    <motion.a
                                        href={project.link}
                                        target={project.link.startsWith("http") ? "_blank" : "_self"}
                                        rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                        whileHover={{ x: 6 }}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white/90 transition-colors"
                                    >
                                        {project.linkLabel || "View Project"}
                                        <motion.svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            whileHover={{ x: 4 }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </motion.svg>
                                    </motion.a>
                                </div>
                            </motion.div>
                        </FadeInOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
