"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Matrix characters (mix of binary and hex for a hacking feel)
        const chars = "01010110001010101010100ABCDEF$&*#";
        const charArray = chars.split("");

        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        // Initialize drops
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100; // Start at random negative heights to stagger the drop start
        }

        const draw = () => {
            // Translucent black background to create trail effect
            ctx.fillStyle = "rgba(10, 10, 15, 0.05)"; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Matrix Green color
            ctx.fillStyle = "#22c55e";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // don't draw if drop is negative (still staggering)
                if (drops[i] >= 0) {
                    const text = charArray[Math.floor(Math.random() * charArray.length)];
                    
                    // Draw character
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                }

                // Reset drop to top randomly
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Move drop down
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50); // Speed of drops

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        />
    );
}
