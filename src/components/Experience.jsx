import React from 'react';
import Section from './ui/Section';
import { experience } from '../data/content';
import { motion } from 'framer-motion';

const ExperienceItem = ({ exp, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 }}
        className="relative pl-8 md:pl-0"
    >
        {/* Timeline specific layout */}
        <div className="md:flex items-center justify-between group">
            {/* Left side (Date) for Desktop */}
            <div className="hidden md:block md:w-1/3 text-right pr-8">
                <span className="text-black font-bold text-lg">{exp.period}</span>
            </div>

            {/* Center Line & Dot */}
            <div className="absolute left-0 md:left-1/3 md:-ml-[5px] w-3 h-3 bg-primary-500 rounded-full border-4 border-white dark:border-dark-bg transition-transform group-hover:scale-150" />

            {/* Right Content */}
            <div className="md:w-2/3 pl-0 md:pl-8 pb-12 border-l-2 border-slate-200 dark:border-slate-700 md:border-l-0 md:border-l-transparent last:pb-0">
                {/* Mobile Date */}
                <span className="md:hidden text-black text-sm font-bold block mb-1">{exp.period}</span>

                <h3 className="text-xl font-bold text-black dark:text-white">{exp.role}</h3>
                <p className="text-lg text-black dark:text-slate-300 font-bold mb-2">{exp.company}</p>
                <ul className="list-disc list-inside space-y-1 text-black dark:text-slate-400 text-sm md:text-base font-bold">
                    {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                    ))}
                </ul>
            </div>
        </div>
    </motion.div>
);

const Experience = () => {
    return (
        <Section id="experience" title="Work Experience" className="relative backdrop-blur-sm">
            <div className="relative max-w-4xl mx-auto">
                {/* Vertical Line for Desktop Centralized Timeline - Custom implementation */}
                <div className="absolute left-0 md:left-1/3 top-2 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />

                <div className="space-y-0">
                    {experience.map((exp, index) => (
                        <ExperienceItem key={index} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Experience;
