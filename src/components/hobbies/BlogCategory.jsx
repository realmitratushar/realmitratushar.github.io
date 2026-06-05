import React from 'react';
import { useParams } from 'react-router-dom';
import HobbyPage from './HobbyPage';
import { MdArticle, MdComputer, MdFlight, MdBook, MdSportsSoccer, MdLocalMovies } from 'react-icons/md';

const getCategoryDetails = (categoryId) => {
    switch (categoryId) {
        case 'tech':
            return { title: 'Tech Blogs', icon: MdComputer };
        case 'travel':
            return { title: 'Travel Blogs', icon: MdFlight };
        case 'books':
            return { title: 'Book Reviews', icon: MdBook };
        case 'sports':
            return { title: 'Sports Blogs', icon: MdSportsSoccer };
        case 'movies-sitcoms':
            return { title: 'Movies & Sitcoms', icon: MdLocalMovies };
        default:
            return { title: 'Blogs', icon: MdArticle };
    }
};

const BlogCategory = () => {
    const { category } = useParams();
    const { title, icon } = getCategoryDetails(category);

    return (
        <HobbyPage title={title} icon={icon}>
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                    {title} Content Coming Soon!
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg">
                    I'm currently writing some interesting articles for this section. Stay tuned!
                </p>
            </div>
        </HobbyPage>
    );
};

export default BlogCategory;
