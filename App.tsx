
import React, { useState, useEffect, useCallback } from 'react';
import type { Language, PromptInputs } from './types';
import { generatePrompt } from './services/geminiService';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import GeneratedPrompt from './components/GeneratedPrompt';
import History from './components/History';
import { UI_TEXT } from './constants';

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('en');
    const [promptInputs, setPromptInputs] = useState<PromptInputs>({
        subject: '',
        style: '',
        colors: '',
        lighting: '',
        composition: '',
        negative: ''
    });
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        const savedHistory = localStorage.getItem('promptHistory');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('promptHistory', JSON.stringify(history));
    }, [history]);
    
    useEffect(() => {
        document.body.className = `lang-${language}`;
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedPrompt('');
        try {
            const result = await generatePrompt(promptInputs, language);
            setGeneratedPrompt(result);
            if (result && !history.includes(result)) {
                setHistory(prev => [result, ...prev.slice(0, 19)]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : UI_TEXT[language].errorGeneral);
        } finally {
            setIsLoading(false);
        }
    }, [promptInputs, history, language]);

    const handleClearHistory = () => {
        setHistory([]);
    };
    
    const handleUseHistoryItem = (prompt: string) => {
        setGeneratedPrompt(prompt);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header language={language} setLanguage={setLanguage} />
            <main className="container mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <PromptForm 
                            inputs={promptInputs}
                            setInputs={setPromptInputs}
                            onSubmit={handleGenerate}
                            isLoading={isLoading}
                            language={language}
                        />
                    </div>
                    <div className="lg:col-span-2 space-y-8">
                        <GeneratedPrompt
                            prompt={generatedPrompt}
                            isLoading={isLoading}
                            error={error}
                            language={language}
                        />
                        <History
                            history={history}
                            onClear={handleClearHistory}
                            onUse={handleUseHistoryItem}
                            language={language}
                        />
                    </div>
                </div>
            </main>
             <footer className="text-center py-6 text-gray-500 text-sm">
                <p>{UI_TEXT[language].footer}</p>
            </footer>
        </div>
    );
};

export default App;
