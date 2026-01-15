import React from 'react';
import Section from './ui/Section';
import { projects } from '../data/content';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 flex flex-col h-full group transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 active:border-blue-600 cursor-pointer"
    >
        <div className="relative overflow-hidden h-48">
            <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full text-slate-900 hover:text-primary-600 transition-colors"
                    title="View Source"
                >
                    <FaGithub className="w-5 h-5" />
                </a>
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full text-slate-900 hover:text-primary-600 transition-colors"
                    title="Live Demo"
                >
                    <FaExternalLinkAlt className="w-5 h-5" />
                </a>
            </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-black dark:text-white mb-2">{project.title}</h3>
            <p className="text-black dark:text-slate-400 text-sm mb-4 flex-grow line-clamp-3 font-medium">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t) => (
                    <span key={t} className="text-xs font-medium px-2.5 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded">
                        {t}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

const Projects = () => {
    return (
        <Section id="projects" title="Featured Projects" className="relative backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </Section>
    );
};

export default Projects;
