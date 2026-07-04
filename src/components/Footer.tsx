"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative py-16 px-6 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/80 font-bold text-sm">
                            A
                        </div>
                        <span className="font-heading font-bold text-base text-white/70">
                            Aadhi
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex gap-6">
                        {["GitHub", "LinkedIn", "Discord"].map((link) => (
                            <motion.a
                                key={link}
                                href="#"
                                whileHover={{ y: -2 }}
                                className="text-sm text-white/30 hover:text-white/70 transition-colors duration-300 font-mono"
                            >
                                {link}
                            </motion.a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-white/20 font-mono">
                        &copy; 2026 Aadhi. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
