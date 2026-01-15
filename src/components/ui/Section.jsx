import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ id, title, children, className = "" }) => {
    return (
        <section id={id} className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
            <div className="max-w-7xl mx-auto">
                {title && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white inline-block relative after:content-[''] after:block after:w-full after:h-1 after:bg-primary-500 after:mt-2 after:rounded-full">
                            {title}
                        </h2>
                    </motion.div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
