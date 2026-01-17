import React from 'react';
import HobbyPage from './HobbyPage';
import { MdArticle } from 'react-icons/md';

const Blogs = () => {
    return (
        <HobbyPage title="Blogs & Musings" icon={MdArticle}>
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                    Coming Soon...
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg">
                    I'm currently working on some interesting articles. Stay tuned for updates!
                </p>
            </div>
        </HobbyPage>
    );
};

export default Blogs;
