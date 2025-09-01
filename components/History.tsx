
import React from 'react';
import type { Language } from '../types';
import { UI_TEXT } from '../constants';

interface HistoryProps {
    history: string[];
    onClear: () => void;
    onUse: (prompt: string) => void;
    language: Language;
}

const History: React.FC<HistoryProps> = ({ history, onClear, onUse, language }) => {
    return (
        <div className="bg-gray-800/60 p-6 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-indigo-400">{UI_TEXT[language].history}</h2>
                {history.length > 0 && (
                    <button onClick={onClear} className="text-sm text-red-400 hover:text-red-300">
                        {UI_TEXT[language].clearHistory}
                    </button>
                )}
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2 rtl:pl-2 rtl:pr-0">
                {history.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">{UI_TEXT[language].historyEmpty}</p>
                ) : (
                    history.map((prompt, index) => (
                        <div key={index} className="bg-gray-900/70 p-3 rounded-md flex justify-between items-center gap-2">
                            <p className="text-gray-300 text-sm truncate flex-1">{prompt}</p>
                            <button
                                onClick={() => onUse(prompt)}
                                className="bg-indigo-700/80 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded-md text-xs transition-colors flex-shrink-0"
                            >
                                {UI_TEXT[language].usePrompt}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default History;
