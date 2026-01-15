import React, { useState } from 'react';
import HobbyPage from './HobbyPage';
import { MdTv, MdCheckCircle, MdPlayCircle, MdBookmark, MdTrendingUp } from 'react-icons/md';
import sitcomsData from '../../data/sitcoms.json';
import { motion, AnimatePresence } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-4 hover:shadow-md transition-shadow"
    >
        <div className={`p-3 rounded-full ${color.bg} ${color.text}`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
            <p className="text-2xl font-bold text-black dark:text-white">{value}</p>
        </div>
    </motion.div>
);

const ShowGrid = ({ shows }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {shows.map((show, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-[2/3] rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
                <img
                    src={show.image}
                    alt={show.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-semibold truncate w-full">
                        {show.title}
                    </span>
                </div>
            </motion.div>
        ))}
    </div>
);

const Sitcoms = () => {
    const [activeTab, setActiveTab] = useState('watching');

    const tabs = [
        { id: 'watching', label: 'Currently Watching', icon: MdPlayCircle },
        { id: 'completed', label: 'Completed', icon: MdCheckCircle },
        { id: 'watchlist', label: 'Watchlist', icon: MdBookmark },
    ];

    return (
        <HobbyPage title="The Comfort Zone" icon={MdTv}>
            <div className="mb-12">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                    Welcome to my binge-watching headquarters. From comforting classics to gripping thrillers,
                    this is where I track my journey through television history.
                </p>

                {/* Binge Stats Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        icon={MdCheckCircle}
                        label="Completed Shows"
                        value={sitcomsData.stats.completed}
                        color={{ bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' }}
                    />
                    <StatCard
                        icon={MdPlayCircle}
                        label="Currently Watching"
                        value={sitcomsData.stats.watching}
                        color={{ bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' }}
                    />
                    <StatCard
                        icon={MdBookmark}
                        label="On Watchlist"
                        value={sitcomsData.stats.watchlist}
                        color={{ bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' }}
                    />
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-4 border-b border-slate-200 dark:border-slate-700 mb-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${isActive
                                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'completed' && <ShowGrid shows={sitcomsData.completed} />}
                        {activeTab === 'watching' && <ShowGrid shows={sitcomsData.watching} />}
                        {activeTab === 'watchlist' && <ShowGrid shows={sitcomsData.watchlist} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </HobbyPage>
    );
};

export default Sitcoms;
