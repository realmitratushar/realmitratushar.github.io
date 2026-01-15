import React from 'react';
import Section from './ui/Section';
import { research } from '../data/content';
import { motion } from 'framer-motion';
import { FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa';

const ResearchCard = ({ paper, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 group hover:border-blue-500 dark:hover:border-blue-400 active:border-blue-600 cursor-pointer"
    >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <FaFileAlt className="text-primary-500 flex-shrink-0" />
                    <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-primary-600 transition-colors">
                        {paper.title}
                    </h3>
                </div>
                <p className="text-black dark:text-slate-300 text-sm mb-2 italic font-medium">
                    {paper.authors}
                </p>
                <p className="text-black dark:text-slate-400 text-xs mb-3 font-medium">
                    <span className="font-semibold">{paper.venue}</span> • {paper.year}
                </p>
                <p className="text-black dark:text-slate-400 text-sm leading-relaxed mb-4">
                    {paper.abstract}
                </p>

                <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                    View Paper <FaExternalLinkAlt className="ml-1 w-3 h-3" />
                </a>
            </div>

            <div className="flex-shrink-0">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${paper.status === 'Published'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                    {paper.status}
                </span>
            </div>
        </div>
    </motion.div>
);

const Research = () => {
    return (
        <Section id="research" title="Research & Publications" className="relative backdrop-blur-sm">
            <div className="space-y-6 max-w-4xl mx-auto">
                {research.map((paper, index) => (
                    <ResearchCard key={index} paper={paper} index={index} />
                ))}
            </div>
        </Section>
    );
};

export default Research;
