"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { ScrollRevealLine } from "@/components/ScrollEffects";

const Hero = dynamic(() => import("@/components/sections/Hero"), {
    ssr: false,
});
const About = dynamic(() => import("@/components/sections/About"), {
    ssr: false,
});
const Skills = dynamic(() => import("@/components/sections/Skills"), {
    ssr: false,
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
    ssr: false,
});
const Certifications = dynamic(
    () => import("@/components/sections/Certifications"),
    { ssr: false }
);
const SOCProjects = dynamic(
    () => import("@/components/sections/SOCProjects"),
    { ssr: false }
);
const SOCLab = dynamic(
    () => import("@/components/sections/SOCLab"),
    { ssr: false }
);

export default function Home() {
    return (
        <main className="relative">
            <ScrollProgress />
            <Navbar />
            <Hero />
            <ScrollRevealLine />
            <About />
            <ScrollRevealLine />
            <Certifications />
            <ScrollRevealLine />
            <Projects />
            <ScrollRevealLine />
            <SOCLab />
            <ScrollRevealLine />
            <SOCProjects />
            <ScrollRevealLine />
            <Skills />
            <Footer />
        </main>
    );
}