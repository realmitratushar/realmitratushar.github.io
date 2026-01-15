import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, socialLinks } from '../data/content';

const useTypewriter = (phrases, speed = 150, deleteSpeed = 50, waitTime = 2000) => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0); // Current phrase index
    const [subIndex, setSubIndex] = useState(0); // Current char index
    const [reverse, setReverse] = useState(false); // Typing or deleting

    useEffect(() => {
        if (index >= phrases.length) return; // Should not happen with modulo logic

        if (subIndex === phrases[index].length + 1 && !reverse) {
            // Finished typing, wait then delete
            const timeout = setTimeout(() => setReverse(true), waitTime);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && reverse) {
            // Finished deleting, move to next phrase
            setReverse(false);
            setIndex((prev) => (prev + 1) % phrases.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? deleteSpeed : speed);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, phrases, speed, deleteSpeed, waitTime]);

    useEffect(() => {
        setText(phrases[index].substring(0, subIndex));
    }, [subIndex, index, phrases]);

    return text;
};

const Hero = () => {
    const greetingText = useTypewriter([
        "Hello, I'm Tushar Mitra",
        "नमस्ते, मैं तुषार मित्रा हूँ",
        "নমস্কার, আমি তুষার মিত্র"
    ]);



    return (
        <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center md:text-left order-2 md:order-1"
                >
                    {/* Greeting Typewriter */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-black dark:text-white min-h-[1.5em]">
                        <span className="text-primary-600 dark:text-primary-400">
                            {greetingText}
                        </span>
                        <span className="animate-pulse text-black dark:text-white">|</span>
                    </h1>

                    {/* Static Role Text */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl text-black dark:text-white font-medium mb-6">
                        Machine Learning | Artificial Intelligence | Data Science
                    </h2>

                    <p className="text-base sm:text-lg text-slate-950 dark:text-slate-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
                        Enjoying life while exploring the frontiers of Artificial Intelligence.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a
                            href={personalInfo.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 rounded-full bg-primary-600 text-white font-semibold shadow-lg hover:bg-primary-700 hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-primary-500/50 hover-glow"
                        >
                            View Resume
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-3 rounded-full border-2 border-slate-300 dark:border-slate-700 text-black dark:text-slate-300 font-bold hover:text-primary-600 transition-all duration-300 bg-white dark:bg-transparent hover-glow hover:border-primary-500 dark:hover:border-primary-400"
                        >
                            Contact Me
                        </a>
                    </div>

                    {/* Social Icons */}
                    <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white dark:bg-slate-800 rounded-full text-black dark:text-slate-400 hover:text-white hover:bg-primary-500 dark:hover:bg-primary-600 transition-all border border-slate-200 dark:border-slate-700 hover-glow"
                                aria-label={link.name}
                            >
                                <link.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Right Info / Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="order-1 md:order-2 flex justify-center"
                >
                    <div className="relative group cursor-pointer w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                        {/* Image Container with decoration */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
                        <div className="relative w-full h-full rounded-full border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-500 transform group-hover:scale-[1.02] group-hover:border-blue-500 dark:group-hover:border-blue-400 group-hover:shadow-blue-500/50">
                            <img
                                src={personalInfo.photoUrl}
                                alt={personalInfo.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 dark:text-slate-500"
            >
                <div className="w-6 h-10 border-2 border-currentColor rounded-full p-1 box-content">
                    <div className="w-1.5 h-1.5 bg-current rounded-full mx-auto" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
