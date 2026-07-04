"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeInOnScroll, TextReveal } from "@/components/ScrollEffects";

const labTools = [
    {
        name: "Windows Server (DC01)",
        role: "Domain Controller",
        description: "Active Directory Domain Services and DNS Server for the lab.local domain. Manages OUs (IT, HR), user accounts, and centralized authentication for all domain-joined endpoints.",
        color: "from-blue-500/20 to-indigo-500/10",
        borderColor: "border-blue-500/30",
        status: "running",
        version: "2022",
        tags: ["Active Directory", "DNS", "lab.local", "OU Management"],
    },
    {
        name: "Wazuh Server",
        role: "Primary SIEM (All-in-One)",
        description: "Deployed on Ubuntu Server VM. Runs Wazuh Manager, Indexer, and Dashboard as an all-in-one deployment. Receives agent data from the Windows 11 endpoint for rule-based threat detection.",
        color: "from-cyan-500/20 to-teal-500/10",
        borderColor: "border-cyan-500/30",
        status: "running",
        version: "4.x",
        tags: ["Manager", "Indexer", "Dashboard", "Ubuntu Server"],
    },
    {
        name: "Splunk Enterprise",
        role: "Secondary SIEM",
        description: "Search Head and Indexer receiving forwarded logs from the Windows 11 endpoint via Splunk Universal Forwarder. Used for SPL queries, custom dashboards, and real-time alerting.",
        color: "from-orange-500/20 to-amber-500/10",
        borderColor: "border-orange-500/30",
        status: "running",
        version: "9.x",
        tags: ["Search Head", "Indexer", "SPL", "Dashboards"],
    },
    {
        name: "Sysmon",
        role: "Endpoint Telemetry",
        description: "Microsoft Sysinternals Sysmon installed on the Windows 11 endpoint. Generates deep telemetry — process creation, network connections, file changes, and registry modifications — beyond standard Event Logs.",
        color: "from-purple-500/20 to-violet-500/10",
        borderColor: "border-purple-500/30",
        status: "running",
        version: "Latest",
        tags: ["Process Logs", "Network Events", "File Monitoring", "Registry"],
    },
];

const investigations = [
    {
        id: "CH-001",
        title: "Building the SOC Lab Infrastructure",
        status: "completed",
        severity: "info",
        events: "VM provisioning, AD DS, DNS, SIEM deployment",
        tools: ["VMware", "Windows Server", "Wazuh", "Splunk"],
        techniques: ["Infrastructure", "SIEM Architecture"],
        summary: "Built the complete SOC lab from scratch — VMware VMs, Active Directory domain (lab.local), Wazuh All-in-One SIEM, Splunk Enterprise, Sysmon, and validated end-to-end log pipelines.",
    },
    {
        id: "CH-002",
        title: "Failed Login Detection",
        status: "planned",
        severity: "medium",
        events: "4624, 4625, 4634, 4740",
        tools: ["Splunk", "Wazuh", "Event Viewer"],
        techniques: ["T1110 – Brute Force", "T1078 – Valid Accounts"],
        summary: "Generate and investigate failed authentication events on the Windows 11 endpoint. Correlate Event IDs into a full authentication timeline.",
    },
    {
        id: "CH-003",
        title: "Sysmon & PowerShell Monitoring",
        status: "planned",
        severity: "high",
        events: "Sysmon Event ID 1, 3, 11; Script Block Logging",
        tools: ["Sysmon", "Splunk", "PowerShell"],
        techniques: ["T1059 – Command Scripting", "T1218 – LOLBins"],
        summary: "Monitor process creation, network connections, and PowerShell script block execution. Detect LOLBins and command-line obfuscation patterns.",
    },
    {
        id: "CH-004",
        title: "File Integrity Monitoring (FIM)",
        status: "planned",
        severity: "high",
        events: "FIM alerts, file changes, registry modifications",
        tools: ["Wazuh"],
        techniques: ["T1565 – Data Manipulation", "T1547 – Boot/Logon Autostart"],
        summary: "Configure Wazuh FIM rules to detect unauthorized modifications to critical system files and registry keys on the Windows endpoint.",
    },
    {
        id: "CH-005",
        title: "Threat Hunting",
        status: "planned",
        severity: "critical",
        events: "Hypothesis-driven queries across SIEM data",
        tools: ["Splunk SPL", "Wazuh", "MITRE ATT&CK"],
        techniques: ["T1046 – Network Scanning", "T1059 – Command Scripting"],
        summary: "Proactive hypothesis-driven threat hunting using Splunk queries and Wazuh alerts. Map findings to the MITRE ATT&CK framework.",
    },
    {
        id: "CH-006",
        title: "Custom Wazuh Rules & Sigma",
        status: "planned",
        severity: "high",
        events: "Custom detection rules, Sigma conversions",
        tools: ["Wazuh", "Sigma", "Splunk"],
        techniques: ["Detection Engineering", "SIEM-Agnostic Rules"],
        summary: "Author custom Wazuh detection rules and write Sigma rules for SIEM-agnostic threat detection. Convert to Splunk SPL and Wazuh formats.",
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
                            An enterprise-grade Security Operations Center built from scratch with VMware —
                            simulating real SOC workflows for threat detection, log analysis, and incident response.
                        </p>
                    </div>
                </FadeInOnScroll>

                {/* Lab Architecture Diagram */}
                <FadeInOnScroll direction="up" delay={0.05}>
                    <div className="glass-card p-6 md:p-8 mb-8 border border-white/8">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Lab Architecture — VMware Workstation Pro</span>
                        </div>
                        {/* Architecture nodes */}
                        <div className="relative">
                            {/* Row 1: Domain Controller (Center) */}
                            <div className="flex justify-center mb-4">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="glass-card border border-blue-500/20 px-6 py-4 text-center min-w-[200px] relative"
                                >
                                    <p className="text-xs text-white/30 font-mono mb-1">DOMAIN CONTROLLER</p>
                                    <p className="font-heading font-bold text-white/90">Windows Server (DC01)</p>
                                    <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                                        {["Active Directory", "DNS", "lab.local"].map(t => (
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
                                    <span className="text-[9px] font-mono text-white/20">VMware Virtual Network</span>
                                    <motion.div
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        className="w-0.5 h-4 bg-gradient-to-b from-transparent to-white/15"
                                    />
                                </div>
                            </div>

                            {/* Row 2: Windows 11 Endpoint */}
                            <div className="flex justify-center mb-4">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="glass-card border border-purple-500/20 px-6 py-4 text-center min-w-[200px]"
                                >
                                    <p className="text-xs text-white/30 font-mono mb-1">ENDPOINT</p>
                                    <p className="font-heading font-bold text-white/90">Windows 11 (WIN11)</p>
                                    <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                                        {["Domain-Joined", "Sysmon", "Wazuh Agent", "Splunk UF"].map(t => (
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
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                                        className="w-0.5 h-6 bg-gradient-to-b from-white/20 to-transparent"
                                    />
                                    <span className="text-[9px] font-mono text-white/20">Log Forwarding</span>
                                    <motion.div
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                                        className="w-0.5 h-4 bg-gradient-to-b from-transparent to-white/15"
                                    />
                                </div>
                            </div>

                            {/* Row 3: SIEMs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Wazuh Server */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="glass-card border border-cyan-500/20 px-5 py-4 text-center"
                                >
                                    <p className="text-xs text-white/30 font-mono mb-1">PRIMARY SIEM</p>
                                    <p className="font-heading font-bold text-white/90">Wazuh Server</p>
                                    <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                                        {["Manager", "Indexer", "Dashboard", "Ubuntu"].map(t => (
                                            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/45 border border-white/10">{t}</span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Splunk Enterprise */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="glass-card border border-orange-500/20 px-5 py-4 text-center"
                                >
                                    <p className="text-xs text-white/30 font-mono mb-1">SECONDARY SIEM</p>
                                    <p className="font-heading font-bold text-white/90">Splunk Enterprise</p>
                                    <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                                        {["Search Head", "Indexer", "Receives UF Logs"].map(t => (
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
                                {tab === "tools" ? "Lab Tools" : "Project Roadmap"}
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
                            <span>VMs: 4 running</span>
                            <span>SIEMs: Wazuh + Splunk</span>
                            <span>Platform: VMware Workstation Pro</span>
                        </div>
                    </div>
                </FadeInOnScroll>
            </div>
        </section>
    );
}
