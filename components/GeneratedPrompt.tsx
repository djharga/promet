
import React, { useState } from 'react';
import type { Language } from '../types';
import { UI_TEXT } from '../constants';

interface GeneratedPromptProps {
    prompt: string;
    isLoading: boolean;
    error: string | null;
    language: Language;
}

const GeneratedPrompt: React.FC<GeneratedPromptProps> = ({ prompt, isLoading, error, language }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <svg className="animate-spin h-10 w-10 text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-lg">{UI_TEXT[language].generating}</p>
                </div>
            )
        }
        if (error) {
            return <div className="text-red-400 bg-red-900/50 p-4 rounded-md text-center">{error}</div>;
        }
        if (prompt) {
            return (
                <div className="relative">
                    <textarea 
                        readOnly
                        value={prompt}
                        className="w-full h-48 bg-gray-900 border border-gray-700 rounded-md p-4 text-gray-200 focus:outline-none resize-none leading-relaxed"
                    />
                    <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-gray-700 hover:bg-indigo-600 text-white font-bold py-2 px-3 rounded-md text-sm transition-colors"
                    >
                        {copied ? UI_TEXT[language].copied : UI_TEXT[language].copy}
                    </button>
                </div>
            );
        }
        return <div className="text-center text-gray-500 py-10">{UI_TEXT[language].subtitle}</div>;
    };

    return (
        <div className="bg-gray-800/60 p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-indigo-400">{UI_TEXT[language].generatedPrompt}</h2>
            <div className="min-h-[224px] flex items-center justify-center">
                {renderContent()}
            </div>
        </div>
    );
};

export default GeneratedPrompt;
