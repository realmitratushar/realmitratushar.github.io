import React from 'react';
import Header from './Header';
import Footer from './Footer';

// A wrapper component for the page structure
const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen text-slate-900 dark:text-dark-text transition-colors duration-300 font-sans">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
