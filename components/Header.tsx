
import React from 'react';
import type { Language } from '../types';
import { UI_TEXT } from '../constants';

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
            <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 3-1.9 1.9a10 10 0 0 0-5.2 5.2L3 12l1.9-1.9a10 10 0 0 1 5.2-5.2L12 3Z"/>
                        <path d="m3 12 1.9 1.9a10 10 0 0 0 5.2 5.2L12 21l-1.9-1.9a10 10 0 0 1-5.2-5.2L3 12Z"/>
                        <path d="M12 3 10.1 4.9a10 10 0 0 1-5.2 5.2L3 12"/>
                        <path d="m21 12-1.9-1.9a10 10 0 0 0-5.2-5.2L12 3v0"/>
                        <path d="m12 21 1.9-1.9a10 10 0 0 0 5.2-5.2L21 12h0"/>
                    </svg>
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{UI_TEXT[language].title}</h1>
                </div>
                <button
                    onClick={toggleLanguage}
                    className="px-4 py-2 text-sm font-medium text-indigo-300 bg-indigo-900/50 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
                >
                    {UI_TEXT[language].language}
                </button>
            </div>
        </header>
    );
};

export default Header;
