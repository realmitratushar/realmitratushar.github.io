import React from 'react';
import Section from './ui/Section';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MdMovie, MdTv, MdBook, MdMusicNote, MdSportsSoccer, MdFlight } from 'react-icons/md';

const hobbiesData = [
    {
        id: 'movies',
        title: 'Movies',
        icon: <MdMovie className="w-8 h-8" />,
        color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
        description: 'Exploring cinematic masterpieces across genres.'
    },
    {
        id: 'series',
        title: 'Series',
        icon: <MdTv className="w-8 h-8" />,
        color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
        description: 'Laughing along with classic and modern comedies.'
    },
    {
        id: 'books',
        title: 'Books',
        icon: <MdBook className="w-8 h-8" />,
        color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
        description: 'Diving into fictional worlds and non-fiction insights.'
    },
    {
        id: 'songs',
        title: 'Songs',
        icon: <MdMusicNote className="w-8 h-8" />,
        color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
        description: 'Vibing to melodies from around the globe.'
    },
    {
        id: 'sports',
        title: 'Sports',
        icon: <MdSportsSoccer className="w-8 h-8" />,
        color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
        description: 'Following the thrill of competitive sports.'
    },
    {
        id: 'travel',
        title: 'Travel',
        icon: <MdFlight className="w-8 h-8" />,
        color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
        description: 'Discovering new places and cultures.'
    }
];

const Hobbies = () => {
    return (
        <Section id="hobbies" title="Hobbies & Interests" className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {hobbiesData.map((hobby, index) => (
                    <Link to={`/${hobby.id}`} key={hobby.id} className="block group">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${hobby.color} group-hover:scale-110 transition-transform duration-300`}>
                                {hobby.icon}
                            </div>
                            <h3 className="text-xl font-bold text-black dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                                {hobby.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                {hobby.description}
                            </p>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </Section>
    );
};

export default Hobbies;
