"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}

export function ParallaxLayer({ children, speed = 0.5, className = "" }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
}

interface TextRevealProps {
    text: string;
    className?: string;
    once?: boolean;
}

export function TextReveal({ text, className = "", once = true }: TextRevealProps) {
    const words = text.split(" ");

    return (
        <span className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                    <motion.span
                        initial={{ y: "100%", opacity: 0 }}
                        whileInView={{ y: "0%", opacity: 1 }}
                        viewport={{ once, margin: "-50px" }}
                        transition={{
                            duration: 0.6,
                            delay: i * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

interface CountUpProps {
    target: number;
    suffix?: string;
    duration?: number;
    className?: string;
}

export function CountUp({ target, suffix = "", duration = 2, className = "" }: CountUpProps) {
    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <CountUpInner target={target} suffix={suffix} duration={duration} />
            </motion.span>
        </motion.span>
    );
}

function CountUpInner({ target, suffix, duration }: { target: number; suffix: string; duration: number }) {
    const ref = useRef<HTMLSpanElement>(null);

    return (
        <motion.span
            ref={ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onViewportEnter={() => {
                if (!ref.current) return;
                let start = 0;
                const end = target;
                const stepTime = (duration * 1000) / end;
                const timer = setInterval(() => {
                    start += 1;
                    if (ref.current) {
                        ref.current.textContent = start + suffix;
                    }
                    if (start >= end) clearInterval(timer);
                }, stepTime);
            }}
        >
            0{suffix}
        </motion.span>
    );
}

interface FadeInOnScrollProps {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    className?: string;
    once?: boolean;
}

export function FadeInOnScroll({
    children,
    direction = "up",
    delay = 0,
    className = "",
    once = true,
}: FadeInOnScrollProps) {
    const directionMap = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { y: 0, x: 60 },
        right: { y: 0, x: -60 },
    };

    const { x, y } = directionMap[direction];

    return (
        <motion.div
            initial={{ opacity: 0, x, y, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
            viewport={{ once, margin: "-80px" }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface MagneticProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}

export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transform = `translate(0px, 0px)`;
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`transition-transform duration-300 ease-out ${className}`}
        >
            {children}
        </div>
    );
}

export function ScrollRevealLine({ className = "" }: { className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div ref={ref} className={`w-full flex justify-center py-8 ${className}`}>
            <motion.div
                style={{ scaleX, transformOrigin: "center" }}
                className="h-[1px] w-full max-w-md bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
        </div>
    );
}
