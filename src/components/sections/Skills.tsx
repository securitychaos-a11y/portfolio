"use client";

import { motion } from "framer-motion";
import { FadeInOnScroll, TextReveal } from "@/components/ScrollEffects";
import Image from "next/image";

const skills = [
    {
        title: "SIEM & Monitoring",
        description:
            "Deployed and configured Splunk Enterprise and Wazuh for centralized log collection, event correlation, and real-time threat detection across Windows and Linux endpoints.",
        image: "/splunk_dashboard.png",
        color: "from-purple-500/20 to-indigo-500/10",
        borderColor: "border-purple-500/20",
        span: "md:col-span-2 md:row-span-2",
        tags: ["Splunk SPL", "Wazuh", "Log Analysis", "Dashboards", "Alerts"],
    },
    {
        title: "Network Security",
        description:
            "Strong foundation in TCP/IP, network protocols, firewalls, and network security monitoring. Cisco CCST Cybersecurity & Networking Basics certified.",
        color: "from-cyan-500/20 to-blue-500/10",
        borderColor: "border-cyan-500/20",
        span: "md:col-span-1 md:row-span-1",
        tags: ["TCP/IP", "Cisco", "Firewalls", "IDS/IPS"],
    },
    {
        title: "Penetration Testing",
        description:
            "Hands-on experience with Kali Linux for ethical hacking, vulnerability scanning, and attack simulation within a controlled home lab environment.",
        color: "from-red-500/20 to-orange-500/10",
        borderColor: "border-red-500/20",
        span: "md:col-span-1 md:row-span-1",
        tags: ["Kali Linux", "Nmap", "Metasploit", "Recon"],
    },
    {
        title: "Incident Response",
        description:
            "SOC analyst workflow: investigating authentication events, correlating Windows Security Logs, building timelines, and producing incident reports.",
        color: "from-emerald-500/20 to-teal-500/10",
        borderColor: "border-emerald-500/20",
        span: "md:col-span-1 md:row-span-2",
        tags: ["Event Logs", "Sysmon", "MITRE ATT&CK", "Forensics"],
    },
    {
        title: "Python & Scripting",
        description:
            "Python for security automation, log parsing, and scripting. PowerShell and Bash for endpoint administration.",
        color: "from-green-500/20 to-emerald-500/10",
        borderColor: "border-green-500/20",
        span: "md:col-span-1 md:row-span-1",
        tags: ["Python", "PowerShell", "Bash", "Automation"],
    },
    {
        title: "B.Tech CSE",
        description:
            "Computer Science & Engineering with strong fundamentals in algorithms, OS, networking, and system design.",
        color: "from-violet-500/20 to-fuchsia-500/10",
        borderColor: "border-violet-500/20",
        span: "md:col-span-1 md:row-span-1",
        tags: ["Algorithms", "OS", "DBMS", "Networking"],
    },
];

// All unique tags for the marquee strip
const allTags = [
    "Splunk SPL", "Wazuh", "Log Analysis", "Dashboards", "Alerts",
    "TCP/IP", "Cisco", "Firewalls", "IDS/IPS",
    "Kali Linux", "Nmap", "Metasploit", "Recon",
    "Event Logs", "Sysmon", "MITRE ATT&CK", "Forensics",
    "Python", "PowerShell", "Bash", "Automation",
    "Algorithms", "OS", "DBMS", "Networking",
];
// Duplicate for seamless loop
const marqueeItems = [...allTags, ...allTags];

export default function Skills() {
    return (
        <section id="skills" className="relative py-24 md:py-32 px-6 overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />

            <div className="max-w-6xl mx-auto relative">
                {/* Section header */}
                <FadeInOnScroll direction="up">
                    <div className="text-center mb-16">
                        <p className="text-sm font-mono text-white/30 tracking-widest uppercase mb-3">
                            [ Skillset ]
                        </p>
                        <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight">
                            <TextReveal text="SOC Skillset" className="gradient-text" />
                        </h2>
                        <p className="mt-4 text-white/40 max-w-md mx-auto">
                            Hands-on expertise in SIEM platforms, network security,
                            penetration testing, and incident response.
                        </p>
                    </div>
                </FadeInOnScroll>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    {skills.map((skill, i) => (
                        <FadeInOnScroll
                            key={i}
                            direction="up"
                            delay={i * 0.08}
                            className={skill.span}
                        >
                            <motion.div
                                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                                className="glass-card-hover p-6 md:p-8 relative overflow-hidden group h-full"
                            >
                                {/* Gradient background */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`}
                                />

                                {/* Dashboard screenshot for SIEM card */}
                                {skill.image && (
                                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 group-hover:opacity-50 transition-opacity duration-600 pointer-events-none">
                                        <Image
                                            src={skill.image}
                                            alt={skill.title}
                                            fill
                                            className="object-cover object-right-top group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/60 to-transparent" />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111111]" />
                                    </div>
                                )}

                                <div className="relative z-10">
                                    <h3 className="text-xl md:text-2xl font-bold font-heading mb-2 text-white/90">
                                        {skill.title}
                                    </h3>
                                    <p className="text-sm text-white/50 mb-4 leading-relaxed">
                                        {skill.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {skill.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`px-3 py-1 rounded-full text-xs font-medium bg-white/5 border ${skill.borderColor} text-white/55 hover:text-white/80 hover:bg-white/10 transition-colors`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </FadeInOnScroll>
                    ))}
                </div>

                {/* Marquee tag strip */}
                <FadeInOnScroll direction="up" delay={0.2}>
                    <div className="mt-14 relative overflow-hidden">
                        {/* Fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                        <div className="animate-marquee">
                            {marqueeItems.map((tag, i) => (
                                <span
                                    key={i}
                                    className="flex-none mx-2.5 px-3.5 py-1.5 rounded-full text-[11px] font-mono bg-white/4 border border-white/8 text-white/35 whitespace-nowrap"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </FadeInOnScroll>
            </div>
        </section>
    );
}
