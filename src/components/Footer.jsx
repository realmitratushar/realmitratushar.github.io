import React from 'react';
import { personalInfo } from '../data/content';

const Footer = () => {
    return (
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
                <p className="text-black dark:text-slate-400 text-sm mb-4 font-medium">
                    &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
                </p>
                <div className="flex space-x-6">
                    <a href="#" className="text-black hover:text-primary-600 text-sm font-bold">Privacy Policy</a>
                    <a href="#" className="text-black hover:text-primary-600 text-sm font-bold">Terms of Service</a>
                </div>
                <p className="text-xs text-black mt-4 font-semibold">
                    Built with React, Vite & Tailwind CSS
                </p>
            </div>
        </footer>
    );
};

export default Footer;
