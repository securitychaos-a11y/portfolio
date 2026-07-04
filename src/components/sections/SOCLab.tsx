"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeInOnScroll, TextReveal } from "@/components/ScrollEffects";

const labTools = [
    {
        name: "Splunk Enterprise",
        role: "Primary SIEM",
        description: "Centralized log indexing, SPL queries, custom dashboards, and real-time alerting for Windows and Linux events.",
        color: "from-orange-500/20 to-amber-500/10",
        borderColor: "border-orange-500/30",
        status: "running",
        version: "9.x",
        tags: ["Log Indexing", "SPL", "Dashboards", "Alerts"],
    },
    {
        name: "Wazuh",
        role: "HIDS / SIEM",
        description: "Deployed on Ubuntu Server VM. Collects Windows Security Events via agent, provides rule-based threat detection and FIM.",
        color: "from-blue-500/20 to-cyan-500/10",
        borderColor: "border-blue-500/30",
        status: "running",
        version: "4.14.x",
        tags: ["HIDS", "FIM", "Rule Engine", "Ubuntu"],
    },
    {
        name: "Kali Linux",
        role: "Attacker Machine",
        description: "VirtualBox VM configured as the red team node. Used for attack simulation, vulnerability scanning, and testing detection rules.",
        color: "from-red-500/20 to-rose-500/10",
        borderColor: "border-red-500/30",
        status: "active",
        version: "2024.x",
        tags: ["Penetration Testing", "Nmap", "Attack Sim"],
    },
    {
        name: "Sysmon",
        role: "Endpoint Telemetry",
        description: "Microsoft Sysinternals Sysmon installed on Windows 11 for rich process creation, network, and file telemetry beyond standard Event Logs.",
        color: "from-purple-500/20 to-violet-500/10",
        borderColor: "border-purple-500/30",
        status: "running",
        version: "15.x",
        tags: ["Process Logs", "Network Events", "Telemetry"],
    },
];

const investigations = [
    {
        id: "INV-001",
        title: "Windows Authentication Investigation",
        status: "completed",
        severity: "medium",
        events: "4624, 4625, 4634, 4740",
        tools: ["Splunk", "Wazuh", "Sysmon"],
        techniques: ["T1110 – Brute Force", "T1078 – Valid Accounts"],
        summary: "Investigated failed login events, correlated with lockout alerts, and built a full authentication timeline.",
    },
    {
        id: "INV-002",
        title: "Multi-Platform SIEM Integration",
        status: "completed",
        severity: "info",
        events: "Log forwarding, agent config",
        tools: ["Wazuh", "Splunk UF", "Kali Linux"],
        techniques: ["Log Management", "SIEM Architecture"],
        summary: "Deployed Splunk Universal Forwarder on Kali Linux, forwarding logs to Splunk Enterprise on Windows 11.",
    },
    {
        id: "INV-003",
        title: "File Integrity Monitoring (FIM)",
        status: "in-progress",
        severity: "high",
        events: "FIM alerts, file changes",
        tools: ["Wazuh"],
        techniques: ["T1565 – Data Manipulation"],
        summary: "Configuring FIM rules in Wazuh to detect unauthorized modifications to critical system files.",
    },
    {
        id: "INV-004",
        title: "Network Intrusion Detection",
        status: "planned",
        severity: "critical",
        events: "Network traffic, IDS alerts",
        tools: ["Suricata", "Zeek", "Wazuh"],
        techniques: ["T1046 – Network Scanning"],
        summary: "Planned integration of Suricata IDS to detect network-level threats from Kali Linux attack machine.",
    },
];

const statusColors: Record<string, { dot: string; bg: string; text: string; label: string }> = {
    completed: { dot: "bg-cyber-green", bg: "bg-white/5", text: "text-white/70", label: "Completed" },
    "in-progress": { dot: "bg-yellow-400 animate-pulse", bg: "bg-white/5", text: "text-white/60", label: "In Progress" },
    planned: { dot: "bg-white/30", bg: "bg-white/5", text: "text-white/35", label: "Planned" },
};

const severityColors: Record<string, string> = {
    critical: "text-white/70 border-white/20",
    high: "text-white/60 border-white/15",
    medium: "text-white/55 border-white/12",
    info: "text-white/45 border-white/10",
};

const toolStatus: Record<string, { color: string; label: string }> = {
    running: { color: "bg-cyber-green animate-pulse", label: "running" },
    active: { color: "bg-yellow-400 animate-pulse", label: "active" },
};

export default function SOCLab() {
    const [activeTab, setActiveTab] = useState<"tools" | "investigations">("tools");

    return (
        <section id="soclab" className="relative py-24 md:py-32 px-6 overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />

            <div className="max-w-6xl mx-auto relative">
                {/* Section header */}
                <FadeInOnScroll direction="up">
                    <div className="text-center mb-16">
                        <p className="text-sm font-mono text-white/30 tracking-widest uppercase mb-3">
                            [ Home Lab ]
                        </p>
                        <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight">
                            <TextReveal text="SOC Home Lab" className="gradient-text" />
                        </h2>
                        <p className="mt-4 text-white/40 max-w-lg mx-auto">
                            A fully operational Security Operations Center built at home —
                            simulating real enterprise SOC workflows for threat detection, log analysis, and incident response.
                        </p>
                    </div>
                </FadeInOnScroll>

                {/* Lab Architecture Diagram */}
                <FadeInOnScroll direction="up" delay={0.05}>
                    <div className="glass-card p-6 md:p-8 mb-8 border border-white/8">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Lab Architecture — Live</span>
                        </div>
                        {/* Architecture nodes */}
                        <div className="relative">
                            {/* Row 1: Windows Host (Center) */}
                            <div className="flex justify-center mb-4">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="glass-card border border-white/10 px-6 py-4 text-center min-w-[200px] relative"
                                >
                                    <p className="text-xs text-white/30 font-mono mb-1">HOST MACHINE</p>
                                    <p className="font-heading font-bold text-white/90">Windows 11</p>
                                    <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                                        {["Splunk", "Sysmon", "Wazuh Agent"].map(t => (
                                            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">{t}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Connector line */}
                            <div className="flex justify-center mb-4">
                                <div className="flex flex-col items-center gap-1">
                                    <motion.div
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-0.5 h-8 bg-gradient-to-b from-white/30 to-transparent"
                                    />
                                    <span className="text-[9px] font-mono text-white/20">VirtualBox Network</span>
                                    <motion.div
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        className="w-0.5 h-4 bg-gradient-to-b from-transparent to-white/15"
                                    />
                                </div>
                            </div>

                            {/* Row 2: VMs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Kali Linux */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="glass-card border border-red-500/20 px-5 py-4 text-center"
                                >
                                    <p className="text-xs text-white/30 font-mono mb-1">ATTACKER VM</p>
                                    <p className="font-heading font-bold text-white/90">Kali Linux</p>
                                    <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                                        {["Splunk UF", "Attack Tools", "VirtualBox"].map(t => (
                                            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/45 border border-white/10">{t}</span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Ubuntu/Wazuh Server */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="glass-card border border-blue-500/20 px-5 py-4 text-center"
                                >
                                    <p className="text-xs text-white/30 font-mono mb-1">SIEM SERVER VM</p>
                                    <p className="font-heading font-bold text-white/90">Ubuntu Server</p>
                                    <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                                        {["Wazuh Manager", "Wazuh Indexer", "Dashboard"].map(t => (
                                            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/45 border border-white/10">{t}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </FadeInOnScroll>

                {/* Tab switcher */}
                <FadeInOnScroll direction="up" delay={0.1}>
                    <div className="flex gap-2 mb-6">
                        {(["tools", "investigations"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2.5 rounded-lg text-sm font-mono font-medium transition-all duration-300 capitalize ${
                                    activeTab === tab
                                        ? "bg-white/10 border border-white/20 text-white/90"
                                        : "glass text-white/35 hover:text-white/60 border border-white/5"
                                }`}
                            >
                                {tab === "tools" ? "Lab Tools" : "Investigations"}
                            </button>
                        ))}
                    </div>
                </FadeInOnScroll>

                {/* Tools Tab */}
                {activeTab === "tools" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {labTools.map((tool, i) => (
                            <FadeInOnScroll key={tool.name} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className={`glass-card-hover group relative overflow-hidden border ${tool.borderColor}`}
                                >
                                    {/* Gradient bg */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative z-10 p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="font-heading font-bold text-white/90">{tool.name}</h3>
                                                <p className="text-xs font-mono text-white/40 mt-0.5">{tool.role}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <div className={`w-2 h-2 rounded-full ${toolStatus[tool.status]?.color}`} />
                                                <span className="text-xs font-mono text-white/30">{toolStatus[tool.status]?.label}</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-white/50 leading-relaxed mb-4">
                                            {tool.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {tool.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border ${tool.borderColor} text-white/50`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="text-xs font-mono text-white/20">
                                            v{tool.version}
                                        </div>
                                    </div>
                                </motion.div>
                            </FadeInOnScroll>
                        ))}
                    </div>
                )}

                {/* Investigations Tab */}
                {activeTab === "investigations" && (
                    <div className="flex flex-col gap-4">
                        {investigations.map((inv, i) => {
                            const s = statusColors[inv.status];
                            const sev = severityColors[inv.severity];
                            return (
                                <FadeInOnScroll key={inv.id} direction="up" delay={i * 0.08}>
                                    <motion.div
                                        whileHover={{ x: 6 }}
                                        transition={{ duration: 0.3 }}
                                        className="glass-card-hover group p-6 relative overflow-hidden"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                                            {/* Status + ID */}
                                            <div className="flex items-center gap-3 min-w-[160px]">
                                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                                                <div>
                                                    <p className="text-xs font-mono text-white/30">{inv.id}</p>
                                                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
                                                        {s.label}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Main content */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                    <h3 className="font-heading font-bold text-white/90">{inv.title}</h3>
                                                    <span className={`text-xs font-mono px-2 py-0.5 rounded border flex-shrink-0 ${sev}`}>
                                                        {inv.severity.toUpperCase()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-white/50 leading-relaxed mb-3">{inv.summary}</p>

                                                <div className="flex flex-wrap gap-3 text-xs font-mono">
                                                    <span className="text-white/30">
                                                        Events: <span className="text-white/55">{inv.events}</span>
                                                    </span>
                                                    <span className="text-white/30">
                                                        Tools: <span className="text-white/55">{inv.tools.join(", ")}</span>
                                                    </span>
                                                </div>

                                                {/* MITRE techniques */}
                                                <div className="flex flex-wrap gap-1.5 mt-3">
                                                    {inv.techniques.map((t) => (
                                                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/8 text-white/40">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </FadeInOnScroll>
                            );
                        })}
                    </div>
                )}

                {/* Bottom status bar */}
                <FadeInOnScroll direction="up" delay={0.3}>
                    <div className="mt-8 glass-card p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                            <span className="text-sm text-white/50 font-mono">
                                SOC Home Lab — Operational
                            </span>
                        </div>
                        <div className="flex gap-6 text-xs font-mono text-white/30">
                            <span>VMs: 2 running</span>
                            <span>SIEMs: Splunk + Wazuh</span>
                            <span>Platform: VirtualBox + VMware</span>
                        </div>
                    </div>
                </FadeInOnScroll>
            </div>
        </section>
    );
}
