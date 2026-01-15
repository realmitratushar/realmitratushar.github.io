import React, { useState } from 'react';
import Section from './ui/Section';
import { skills } from '../data/content';
import { motion, AnimatePresence } from 'framer-motion';

const Skills = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Languages', 'Development', 'Data Science & ML', 'Tools & OS', 'Cloud'];

    const getFilteredSkills = () => {
        if (filter === 'All') {
            return [
                ...skills.languages.map(s => ({ ...s, type: 'Languages' })),
                ...skills.development.map(s => ({ ...s, type: 'Development' })),
                ...skills.ml.map(s => ({ ...s, type: 'Data Science & ML' })),
                ...skills.tools.map(s => ({ ...s, type: 'Tools & OS' })),
                ...skills.cloud.map(s => ({ ...s, type: 'Cloud' })),
            ];
        }

        // Map display category to object key
        const keyMap = {
            'Languages': 'languages',
            'Development': 'development',
            'Data Science & ML': 'ml',
            'Tools & OS': 'tools',
            'Cloud': 'cloud'
        };

        const dataKey = keyMap[filter];
        return skills[dataKey] ? skills[dataKey].map(s => ({ ...s, type: filter })) : [];
    };

    return (
        <Section id="skills" title="Technical Skills" className="relative backdrop-blur-sm">

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                            : 'bg-white dark:bg-slate-800 text-black dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Skills Grid */}
            <motion.div
                layout
                className="flex flex-wrap justify-center gap-4"
            >
                <AnimatePresence>
                    {getFilteredSkills().map((skill) => (
                        <motion.div
                            layout
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="group relative px-6 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors cursor-default flex items-center gap-3"
                        >
                            <span className={`text-2xl group-hover:scale-110 transition-transform duration-300 ${skill.color || 'text-primary-500'}`}>
                                {skill.icon && <skill.icon />}
                            </span>
                            <span className="text-black dark:text-slate-200 font-bold">{skill.name}</span>
                            {/* Optional Tooltip/Badge for type if "All" is selected */}
                            {filter === 'All' && (
                                <span className="absolute -top-2 -right-2 text-[10px] bg-slate-100 dark:bg-slate-700 text-black px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    {skill.type}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </Section>
    );
};

export default Skills;
