import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const HobbyPage = ({ title, icon: Icon, children }) => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-medium">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </Link>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-4 mb-6">
                        {Icon && <div className="p-3 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                            <Icon className="w-8 h-8" />
                        </div>}
                        <h1 className="text-3xl font-bold text-black dark:text-white">{title}</h1>
                    </div>

                    <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                        {children || <p>Welcome to my {title} collection! Content coming soon.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HobbyPage;
