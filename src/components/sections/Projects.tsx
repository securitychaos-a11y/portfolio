"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInOnScroll, TextReveal, Magnetic } from "@/components/ScrollEffects";

const projects = [
    {
        title: "SOC Home Lab",
        description:
            "A fully functional Security Operations Center home lab built from scratch using VMware Workstation Pro. Deployed Windows Server as a Domain Controller (DC01) with Active Directory and DNS for lab.local, a domain-joined Windows 11 endpoint with Sysmon, Wazuh All-in-One SIEM (Manager + Indexer + Dashboard), and Splunk Enterprise with Universal Forwarder. Validated end-to-end log pipelines across both SIEMs.",
        tech: ["VMware", "Windows Server", "Active Directory", "Wazuh", "Splunk", "Sysmon"],
        featured: true,
        upcoming: false,
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
        upcoming: false,
        gradient: "from-violet-600/30 via-purple-600/20 to-indigo-600/10",
        borderAccent: "hover:border-white/20",
        link: "https://kasargod-sarees.vercel.app/welcome",
        linkLabel: "View Live Project",
    },
    {
        title: "Windows Authentication Investigation",
        description:
            "A real SOC investigation: generated failed and successful authentication events on the domain-joined Windows 11 endpoint, investigated with Splunk SPL queries and Wazuh alerts, correlated Event IDs (4624, 4625, 4740) into a full timeline. Documented in an incident report following SOC analyst methodology.",
        tech: ["Splunk SPL", "Wazuh", "Sysmon", "Event Viewer", "PowerShell", "MITRE ATT&CK"],
        featured: false,
        upcoming: false,
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
        upcoming: false,
        gradient: "from-amber-600/30 via-orange-600/20 to-yellow-600/10",
        borderAccent: "hover:border-white/20",
        link: "#",
        linkLabel: "View Project",
    },
    // ─── Planned SOC Lab Projects ──────────────────────────────────────────
    {
        title: "Failed Login Detection",
        description:
            "Investigate failed authentication events (Event ID 4625) on the Windows 11 endpoint. Analyze brute-force patterns, correlate with account lockout events (4740), and build detection rules in both Splunk and Wazuh.",
        tech: ["Splunk SPL", "Wazuh", "Event ID 4625", "MITRE T1110"],
        featured: false,
        upcoming: true,
        gradient: "from-red-600/30 via-rose-600/20 to-pink-600/10",
        borderAccent: "hover:border-white/15",
        link: "#soc-projects",
        linkLabel: "Coming Soon",
    },
    {
        title: "Sysmon Process Monitoring",
        description:
            "Monitor process creation events (Sysmon Event ID 1) to detect suspicious execution chains, LOLBins abuse, and command-line obfuscation. Build Splunk queries for process tree analysis.",
        tech: ["Sysmon", "Splunk", "Event ID 1", "MITRE T1059"],
        featured: false,
        upcoming: true,
        gradient: "from-purple-600/30 via-fuchsia-600/20 to-pink-600/10",
        borderAccent: "hover:border-white/15",
        link: "#soc-projects",
        linkLabel: "Coming Soon",
    },
    {
        title: "File Integrity Monitoring",
        description:
            "Implement Wazuh FIM to monitor critical system files and registry keys for unauthorized modifications. Configure real-time alerts for changes to sensitive directories on the Windows endpoint.",
        tech: ["Wazuh FIM", "Windows Registry", "MITRE T1565"],
        featured: false,
        upcoming: true,
        gradient: "from-teal-600/30 via-cyan-600/20 to-sky-600/10",
        borderAccent: "hover:border-white/15",
        link: "#soc-projects",
        linkLabel: "Coming Soon",
    },
    {
        title: "PowerShell Detection",
        description:
            "Enable Script Block Logging and Module Logging on the Windows 11 endpoint. Detect encoded commands, obfuscated scripts, and PowerShell-based attack techniques using Splunk and Wazuh.",
        tech: ["PowerShell", "Script Block Logging", "Splunk", "MITRE T1059.001"],
        featured: false,
        upcoming: true,
        gradient: "from-blue-600/30 via-indigo-600/20 to-violet-600/10",
        borderAccent: "hover:border-white/15",
        link: "#soc-projects",
        linkLabel: "Coming Soon",
    },
    {
        title: "Active Directory Monitoring",
        description:
            "Monitor Active Directory for enumeration, privilege escalation, and suspicious account activity. Detect DCSync, Kerberoasting, and unauthorized OU/group modifications in the lab.local domain.",
        tech: ["Active Directory", "Wazuh", "Splunk", "MITRE T1087"],
        featured: false,
        upcoming: true,
        gradient: "from-indigo-600/30 via-blue-600/20 to-cyan-600/10",
        borderAccent: "hover:border-white/15",
        link: "#soc-projects",
        linkLabel: "Coming Soon",
    },
    {
        title: "Threat Hunting",
        description:
            "Proactive hypothesis-driven threat hunting across SIEM data. Develop hunting playbooks, write advanced Splunk queries, and map findings to the MITRE ATT&CK framework.",
        tech: ["Splunk SPL", "MITRE ATT&CK", "Wazuh", "Threat Intel"],
        featured: false,
        upcoming: true,
        gradient: "from-red-600/30 via-orange-600/20 to-amber-600/10",
        borderAccent: "hover:border-white/15",
        link: "#soc-projects",
        linkLabel: "Coming Soon",
    },
    {
        title: "Custom Wazuh Rules & Sigma",
        description:
            "Author custom Wazuh detection rules for environment-specific threats. Write Sigma rules for SIEM-agnostic detection and convert them to Splunk SPL and Wazuh rule formats.",
        tech: ["Wazuh Rules", "Sigma", "Splunk SPL", "Detection Engineering"],
        featured: false,
        upcoming: true,
        gradient: "from-amber-600/30 via-yellow-600/20 to-lime-600/10",
        borderAccent: "hover:border-white/15",
        link: "#soc-projects",
        linkLabel: "Coming Soon",
    },
    {
        title: "Incident Response Simulation",
        description:
            "Simulate a full incident response lifecycle on the lab environment — triage, investigation, containment, eradication, and recovery on a compromised Windows endpoint. Document an IR report.",
        tech: ["Splunk", "Wazuh", "Sysmon", "IR Methodology"],
        featured: false,
        upcoming: true,
        gradient: "from-green-600/30 via-emerald-600/20 to-teal-600/10",
        borderAccent: "hover:border-white/15",
        link: "#soc-projects",
        linkLabel: "Coming Soon",
    },
    {
        title: "Splunk vs Wazuh Comparison",
        description:
            "A comprehensive feature, performance, and use-case comparison between Splunk Enterprise and Wazuh — analyzing query languages, alerting, dashboards, scalability, and cost for SOC operations.",
        tech: ["Splunk", "Wazuh", "SIEM Analysis", "SOC Operations"],
        featured: false,
        upcoming: true,
        gradient: "from-slate-600/30 via-gray-600/20 to-zinc-600/10",
        borderAccent: "hover:border-white/15",
        link: "#soc-projects",
        linkLabel: "Coming Soon",
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
                            and security investigations — completed and upcoming.
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
                                    } ${project.borderAccent} ${project.upcoming ? "opacity-70" : ""}`}
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
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        {project.featured && (
                                            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-white/40 bg-white/5 border border-white/10 uppercase">
                                                Featured Project
                                            </span>
                                        )}
                                        {project.upcoming && (
                                            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-amber-400/70 bg-amber-500/10 border border-amber-500/20 uppercase">
                                                Coming Soon
                                            </span>
                                        )}
                                    </div>

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
                                        className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                                            project.upcoming
                                                ? "text-white/30 hover:text-white/50"
                                                : "text-white/50 hover:text-white/90"
                                        }`}
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
