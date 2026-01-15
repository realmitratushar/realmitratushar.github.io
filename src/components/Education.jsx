import React from 'react';
import Section from './ui/Section';
import { education } from '../data/content';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';

const EducationCard = ({ edu }) => {
    // Check if it's the "School" entry (sparser content) to apply larger scaling
    const isSparse = !edu.details || edu.details.length === 0;

    return (
        <div className={`flex gap-4 items-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 active:border-blue-600 cursor-pointer h-full ${isSparse ? 'py-10' : ''}`}>
            <div className="mt-1 p-2 bg-white dark:bg-slate-800 rounded-full text-primary-500 shadow-sm shrink-0 overflow-hidden flex items-center justify-center w-24 h-24">
                {edu.image ? (
                    <img src={edu.image} alt={edu.institution} loading="lazy" className="w-full h-full object-contain" />
                ) : (
                    edu.icon ? <edu.icon className="w-12 h-12" /> : <FaGraduationCap className="w-12 h-12" />
                )}
            </div>
            <div className="flex-grow">
                <h4 className={`${isSparse ? 'text-2xl' : 'text-lg'} font-bold text-black dark:text-white`}>{edu.institution}</h4>
                {edu.place && <p className={`${isSparse ? 'text-lg' : 'text-sm'} text-black dark:text-slate-400 mb-1 font-medium`}>{edu.place}</p>}
                {edu.degree && <p className={`${isSparse ? 'text-lg' : 'text-sm'} font-semibold text-primary-600 dark:text-primary-400 mb-1`}>{edu.degree}</p>}
                <div className={`flex justify-between items-center ${isSparse ? 'text-base' : 'text-sm'} text-black dark:text-slate-400 mb-2 font-medium`}>
                    <span>{edu.year}</span>
                    {edu.grade && <span className="font-bold text-black dark:text-slate-300">{edu.grade}</span>}
                </div>
                {edu.details && (
                    <div className="flex flex-wrap gap-2">
                        {edu.details.map((detail, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded-full text-black dark:text-slate-300 font-semibold">
                                {detail}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const Education = () => {
    return (
        <Section id="education" title="Education" className="relative backdrop-blur-sm">
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {education.map((edu, index) => (
                    <EducationCard key={index} edu={edu} />
                ))}
            </motion.div>
        </Section>
    );
};

export default Education;
