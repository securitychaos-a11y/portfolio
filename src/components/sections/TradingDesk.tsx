"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FadeInOnScroll, TextReveal } from "@/components/ScrollEffects";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";

// Generate simulated XAUUSD price data
function generateGoldData(count: number) {
    const data = [];
    let price = 2340 + Math.random() * 60;
    const now = new Date();

    for (let i = count; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 3600000);
        const change = (Math.random() - 0.48) * 8;
        price += change;
        price = Math.max(2280, Math.min(2420, price));

        data.push({
            time: time.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }),
            price: parseFloat(price.toFixed(2)),
            volume: Math.floor(Math.random() * 5000) + 1000,
        });
    }
    return data;
}

const tradingStats = [
    { label: "Win Rate", value: "73%", icon: "", change: "+2.1%" },
    { label: "Risk-Reward", value: "1:2.5", icon: "", change: "Optimal" },
    { label: "Pairs Traded", value: "XAUUSD", icon: "", change: "Primary" },
    { label: "Strategy", value: "SMC", icon: "", change: "ICT/Price Action" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="glass-card p-3 !border-gold/30">
                <p className="text-xs text-white/50 font-mono">XAUUSD</p>
                <p className="text-lg font-bold gradient-text-gold">
                    ${payload[0].value.toFixed(2)}
                </p>
            </div>
        );
    }
    return null;
}

export default function TradingDesk() {
    const [data, setData] = useState<ReturnType<typeof generateGoldData>>([]);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [priceChange, setPriceChange] = useState(0);

    const initialData = useMemo(() => generateGoldData(24), []);

    useEffect(() => {
        setData(initialData);
        setCurrentPrice(initialData[initialData.length - 1]?.price || 0);
        setPriceChange(
            initialData.length > 1
                ? initialData[initialData.length - 1].price - initialData[0].price
                : 0
        );
    }, [initialData]);

    // Simulate live updates
    useEffect(() => {
        const interval = setInterval(() => {
            setData((prev) => {
                if (prev.length === 0) return prev;
                const last = prev[prev.length - 1];
                const change = (Math.random() - 0.48) * 3;
                const newPrice = parseFloat(
                    Math.max(2280, Math.min(2420, last.price + change)).toFixed(2)
                );
                const now = new Date();

                const newPoint = {
                    time: now.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    }),
                    price: newPrice,
                    volume: Math.floor(Math.random() * 5000) + 1000,
                };

                setCurrentPrice(newPrice);
                setPriceChange(newPrice - prev[0].price);

                return [...prev.slice(1), newPoint];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="trading"
            className="relative py-24 md:py-32 px-6 overflow-hidden"
        >
            {/* Background accents */}
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-amber-600/3 rounded-full blur-[120px]" />

            <div className="max-w-6xl mx-auto relative">
                {/* Section header */}
                <FadeInOnScroll direction="up">
                    <div className="text-center mb-16">
                        <p className="text-sm font-mono text-gold tracking-widest uppercase mb-3">
                            [ Trading Desk ]
                        </p>
                        <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight">
                            <TextReveal text="Forex & Gold" className="gradient-text-gold" />
                        </h2>
                        <p className="mt-4 text-white/40 max-w-lg mx-auto">
                            Active XAUUSD trader applying Smart Money Concepts and ICT
                            methodologies. Blending technical analysis with disciplined risk
                            management.
                        </p>
                    </div>
                </FadeInOnScroll>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Chart - spans 2 columns */}
                    <FadeInOnScroll direction="left" className="lg:col-span-2"><motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="glass-gold p-6 md:p-8 h-full"
                    >
                        {/* Chart header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-2xl">🥇</span>
                                    <h3 className="text-xl font-bold font-heading text-white/90">
                                        XAUUSD
                                    </h3>
                                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-green-500/10 text-green-400 border border-green-500/20">
                                        LIVE
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-bold gradient-text-gold font-mono">
                                        ${currentPrice.toFixed(2)}
                                    </span>
                                    <span
                                        className={`text-sm font-mono ${priceChange >= 0 ? "text-green-400" : "text-red-400"
                                            }`}
                                    >
                                        {priceChange >= 0 ? "+" : ""}
                                        {priceChange.toFixed(2)} (
                                        {((priceChange / (currentPrice - priceChange)) * 100).toFixed(2)}%)
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {["1H", "4H", "1D"].map((tf) => (
                                    <button
                                        key={tf}
                                        className={`px-3 py-1 rounded text-xs font-mono ${tf === "1H"
                                            ? "bg-gold/20 text-gold border border-gold/30"
                                            : "text-white/40 hover:text-white/60"
                                            } transition-colors`}
                                    >
                                        {tf}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="h-[300px] md:h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient
                                            id="goldGradient"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#d4a853"
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#d4a853"
                                                stopOpacity={0.0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        stroke="rgba(255,255,255,0.03)"
                                        strokeDasharray="3 3"
                                    />
                                    <XAxis
                                        dataKey="time"
                                        stroke="rgba(255,255,255,0.15)"
                                        tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        domain={["auto", "auto"]}
                                        stroke="rgba(255,255,255,0.15)"
                                        tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }}
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={(v) => `$${v}`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#d4a853"
                                        strokeWidth={2}
                                        fill="url(#goldGradient)"
                                        dot={false}
                                        animationDuration={300}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div></FadeInOnScroll>

                    {/* Stats sidebar */}
                    <div className="flex flex-col gap-4">
                        {tradingStats.map((stat, i) => (
                            <FadeInOnScroll key={i} direction="right" delay={i * 0.1}><motion.div
                                whileHover={{ scale: 1.03, y: -2 }}
                                transition={{ duration: 0.3 }}
                                className="glass-gold p-5 group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl">{stat.icon}</span>
                                    <span className="text-xs font-mono text-gold/60">
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-xs text-white/40 font-mono uppercase tracking-wider mb-1">
                                    {stat.label}
                                </p>
                                <p className="text-xl font-bold gradient-text-gold">
                                    {stat.value}
                                </p>
                            </motion.div></FadeInOnScroll>
                        ))}
                    </div>
                </div>

                {/* Funded Trader Achievement */}
                <FadeInOnScroll direction="up" delay={0.1}>
                    <div className="mt-8 glass-gold p-6 md:p-8 relative overflow-hidden group">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Certificate image */}
                            <div className="relative flex justify-center">
                                <div className="relative group/cert">
                                    <img
                                        src="/images/funded-certificate.png"
                                        alt="Equity Edge Funded Trader Certificate - Aadhithyan K M"
                                        className="rounded-xl border border-gold/20 shadow-2xl shadow-gold/10 max-w-full h-auto group-hover/cert:scale-[1.02] transition-transform duration-500"
                                    />
                                    {/* Glow frame */}
                                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-gold/20 via-amber-500/10 to-yellow-600/20 blur-md opacity-0 group-hover/cert:opacity-100 transition-opacity duration-500 -z-10" />
                                </div>
                            </div>

                            {/* Achievement details */}
                            <div className="text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-4">
                                    <span className="text-sm">🏆</span>
                                    <span className="text-xs font-mono text-gold font-semibold tracking-wider uppercase">
                                        Latest Achievement
                                    </span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-heading font-black tracking-tight mb-3">
                                    <span className="gradient-text-gold">Funded Trader</span>
                                </h3>

                                <p className="text-white/50 leading-relaxed mb-4">
                                    Passed the full <span className="text-gold font-medium">Equity Edge Challenge</span> —
                                    both the Challenge and Verification stages — demonstrating consistent
                                    profitability and disciplined risk management. Now managing a funded
                                    trading account.
                                </p>

                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    <div className="px-4 py-2 rounded-lg bg-white/5 border border-gold/15">
                                        <p className="text-xs text-white/40 font-mono">Prop Firm</p>
                                        <p className="text-sm font-bold text-gold">Equity Edge</p>
                                    </div>
                                    <div className="px-4 py-2 rounded-lg bg-white/5 border border-gold/15">
                                        <p className="text-xs text-white/40 font-mono">Status</p>
                                        <p className="text-sm font-bold text-green-400">Funded ✓</p>
                                    </div>
                                    <div className="px-4 py-2 rounded-lg bg-white/5 border border-gold/15">
                                        <p className="text-xs text-white/40 font-mono">Date</p>
                                        <p className="text-sm font-bold text-gold">Feb 2026</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeInOnScroll>

                {/* Bottom info bar */}
                <FadeInOnScroll direction="up" delay={0.3}><div
                    className="mt-6 glass-gold p-5 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-sm text-white/50 font-mono">
                            Market simulation • Data updates every 3s
                        </span>
                    </div>
                    <div className="flex gap-6 text-xs font-mono text-white/30">
                        <span>Spread: 0.35</span>
                        <span>Leverage: 1:100</span>
                        <span>Session: London</span>
                    </div>
                </div></FadeInOnScroll>
            </div>
        </section>
    );
}
