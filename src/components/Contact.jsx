import React, { useState } from 'react';
import Section from './ui/Section';
import { personalInfo } from '../data/content';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaPhone, FaEnvelope, FaCopy } from 'react-icons/fa';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            alert("Thanks for reaching out! This is a demo form.");
            setIsSubmitting(false);
            setFormState({ name: '', email: '', message: '' });
        }, 1000);
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(personalInfo.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Section id="contact" title="Get In Touch" className="relative backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    <div>
                        <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Let's Connect</h3>
                        <p className="text-black dark:text-slate-300 leading-relaxed font-medium">
                            I'm always open to discussing new projects, research collaborations, or software engineering roles.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 text-slate-900 dark:text-slate-300">
                            <div className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-sm">
                                <FaEnvelope className="text-primary-500 w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-black font-bold">Email</p>
                                <div className="flex items-center gap-2">
                                    <a href={`mailto:${personalInfo.email}`} className="font-semibold hover:text-primary-500 transition-colors">
                                        {personalInfo.email}
                                    </a>
                                    <button onClick={copyEmail} className="text-slate-500 hover:text-primary-500" aria-label="Copy email">
                                        {copied ? <span className="text-xs text-green-500 font-bold">Copied!</span> : <FaCopy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Optional Phone */}
                        <div className="flex items-center space-x-4 text-slate-900 dark:text-slate-300">
                            <div className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-sm">
                                <FaPhone className="text-primary-500 w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-black font-bold">Phone</p>
                                <p className="font-semibold">{personalInfo.phone}</p>
                            </div>
                        </div>
                    </div>


                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-black dark:text-slate-300 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all dark:text-white text-black font-medium text-base"
                                placeholder="Your Name"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-black dark:text-slate-300 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all dark:text-white text-black font-medium text-base"
                                placeholder="your@email.com"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-bold text-black dark:text-slate-300 mb-2">Message</label>
                            <textarea
                                id="message"
                                required
                                rows="4"
                                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none dark:text-white text-black font-medium text-base"
                                placeholder="How can I help you?"
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 px-6 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed hover-glow"
                        >
                            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                            {!isSubmitting && <FaPaperPlane className="text-sm" />}
                        </button>
                    </form>
                </motion.div>
            </div>
        </Section>
    );
};

export default Contact;
