import React from 'react';
import Section from './ui/Section';
import { personalInfo, socialLinks } from '../data/content';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <Section id="about" title="About Me" className="relative backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                {/* Left Column: Text & Highlights */}
                <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* About Text */}
                    <p className="text-lg text-black dark:text-slate-300 leading-relaxed font-medium">
                        {personalInfo.about}
                    </p>

                    {/* Coding Profiles & Stats */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-black dark:text-white text-xl">Coding Profiles</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {socialLinks.filter(link =>
                                ['GitHub', 'LinkedIn', 'LeetCode', 'CodeForces', 'HackerRank', 'HuggingFace'].includes(link.name)
                            ).map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all hover:shadow-md group"
                                >
                                    <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm group-hover:bg-primary-50 dark:group-hover:bg-slate-700 text-primary-600 dark:text-primary-400">
                                        <link.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-black dark:text-slate-200">{link.name}</span>
                                        <span className="text-xs font-bold text-slate-800 dark:text-slate-400">
                                            {link.stats || "View Profile"}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Photo */}
                <motion.div
                    className="flex justify-center md:justify-end"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-blue-500/50">
                        {/* Using personalInfo.photoUrl but with a different style than Hero */}
                        <img
                            src={personalInfo.photoFull}
                            alt={personalInfo.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default About;
