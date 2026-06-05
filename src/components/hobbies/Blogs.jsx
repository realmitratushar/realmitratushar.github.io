import React from 'react';
import { Link } from 'react-router-dom';
import HobbyPage from './HobbyPage';
import { MdArticle, MdComputer, MdFlight, MdBook, MdSportsSoccer, MdLocalMovies } from 'react-icons/md';

const blogCategories = [
    {
        id: 'tech',
        title: 'Tech',
        description: 'Deep dives into AI, ML, software engineering, and the latest technologies.',
        icon: MdComputer,
        bgGradient: 'from-blue-500 to-indigo-600',
    },
    {
        id: 'travel',
        title: 'Travel',
        description: 'Adventures, cultural experiences, and exploring the world.',
        icon: MdFlight,
        bgGradient: 'from-cyan-500 to-teal-500',
    },
    {
        id: 'books',
        title: 'Books',
        description: 'Book reviews, summaries, and literary explorations.',
        icon: MdBook,
        bgGradient: 'from-amber-500 to-orange-600',
    },
    {
        id: 'sports',
        title: 'Sports',
        description: 'Analysis, commentary, and passion for the world of sports.',
        icon: MdSportsSoccer,
        bgGradient: 'from-emerald-500 to-green-600',
    },
    {
        id: 'movies-sitcoms',
        title: 'Movies & Sitcoms',
        description: 'Reviews and thoughts on the best and worst of cinema and TV.',
        icon: MdLocalMovies,
        bgGradient: 'from-purple-500 to-pink-600',
    }
];

const Blogs = () => {
    return (
        <HobbyPage title="Blogs & Musings" icon={MdArticle}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {blogCategories.map((category) => (
                    <Link to={`/blogs/${category.id}`} key={category.id} className="block group">
                        <div className={`relative overflow-hidden rounded-2xl p-6 h-full shadow-lg transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl bg-gradient-to-br ${category.bgGradient}`}>
                            {/* Decorative background icon */}
                            <div className="absolute -bottom-6 -right-6 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                                <category.icon className="w-32 h-32 text-white" />
                            </div>
                            
                            <div className="relative z-10 flex flex-col h-full text-white">
                                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl w-fit mb-4">
                                    <category.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                                <p className="text-white/80 text-sm leading-relaxed mt-auto">
                                    {category.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </HobbyPage>
    );
};

export default Blogs;
