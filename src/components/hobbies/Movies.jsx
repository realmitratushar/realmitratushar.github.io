import React from 'react';
import HobbyPage from './HobbyPage';
import { MdMovie } from 'react-icons/md';
import moviesData from '../../data/movies.json';
import { motion } from 'framer-motion';

const MovieGrid = ({ movies, title }) => (
    <div className="mb-12">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6 border-l-4 border-primary-500 pl-4">
            {title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie, index) => (
                <motion.a
                    key={index}
                    href={movie.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative aspect-[2/3] rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                    <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white text-sm font-semibold truncate w-full">
                            {movie.title}
                        </span>
                    </div>
                </motion.a>
            ))}
        </div>
    </div>
);

const DirectorGrid = ({ directors }) => (
    <div className="mb-12">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6 border-l-4 border-primary-500 pl-4">
            Favorite Directors
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {directors.map((director, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border-2 border-slate-200 dark:border-slate-700 shadow-md">
                        <img
                            src={director.image}
                            alt={director.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-lg font-medium text-black dark:text-white text-center">
                        {director.name}
                    </span>
                </motion.div>
            ))}
        </div>
    </div>
);

const Movies = () => {
    return (
        <HobbyPage title="The Cinema Journal" icon={MdMovie}>
            <p className="text-lg mb-8 leading-relaxed">
                Cinema is not just entertainment; it's an empathy machine.
                Here are the directors I admire, the masterpieces that shaped my taste, and what I plan to watch next.
            </p>

            {moviesData.directors && moviesData.directors.length > 0 && (
                <DirectorGrid directors={moviesData.directors} />
            )}

            {moviesData.top40 && moviesData.top40.length > 0 && (
                <MovieGrid movies={moviesData.top40} title="Top 40 Masterpieces" />
            )}

            {moviesData.watchlist && moviesData.watchlist.length > 0 && (
                <MovieGrid movies={moviesData.watchlist.slice(0, 30)} title="Watchlist" />
            )}

            <div className="mt-8 text-center">
                <a
                    href="https://letterboxd.com/mitratushar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-slate-900 text-white dark:bg-slate-700 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors font-semibold"
                >
                    Follow me on Letterboxd
                </a>
            </div>
        </HobbyPage>
    );
};

export default Movies;
