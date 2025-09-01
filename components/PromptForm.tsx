
import React from 'react';
import type { PromptInputs, Language } from '../types';
import { UI_TEXT, ART_STYLES } from '../constants';

interface PromptFormProps {
    inputs: PromptInputs;
    setInputs: React.Dispatch<React.SetStateAction<PromptInputs>>;
    onSubmit: () => void;
    isLoading: boolean;
    language: Language;
}

const FormField: React.FC<{
    id: keyof PromptInputs;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    type?: 'text' | 'textarea' | 'select';
    language: Language;
}> = ({ id, label, placeholder, value, onChange, type = 'text', language }) => {
    const commonClasses = "w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";
    
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-sm font-medium text-gray-300">
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea id={id} name={id} rows={3} placeholder={placeholder} value={value} onChange={onChange} className={commonClasses}></textarea>
            ) : type === 'select' ? (
                <select id={id} name={id} value={value} onChange={onChange} className={commonClasses}>
                    <option value="">{UI_TEXT[language].styleSelect}</option>
                    {Object.keys(ART_STYLES).map(style => (
                        <option key={style} value={ART_STYLES[style]}>{style}</option>
                    ))}
                </select>
            ) : (
                <input type="text" id={id} name={id} placeholder={placeholder} value={value} onChange={onChange} className={commonClasses} />
            )}
        </div>
    );
};


const PromptForm: React.FC<PromptFormProps> = ({ inputs, setInputs, onSubmit, isLoading, language }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-gray-800/60 p-6 rounded-lg shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-center text-indigo-400">{UI_TEXT[language].subtitle}</h2>
            
            <FormField id="subject" label={UI_TEXT[language].subject} placeholder={UI_TEXT[language].subjectPlaceholder} value={inputs.subject} onChange={handleChange} type="textarea" language={language} />
            <FormField id="style" label={UI_TEXT[language].style} placeholder={UI_TEXT[language].styleSelect} value={inputs.style} onChange={handleChange} type="select" language={language} />
            <FormField id="colors" label={UI_TEXT[language].colors} placeholder={UI_TEXT[language].colorsPlaceholder} value={inputs.colors} onChange={handleChange} language={language} />
            <FormField id="lighting" label={UI_TEXT[language].lighting} placeholder={UI_TEXT[language].lightingPlaceholder} value={inputs.lighting} onChange={handleChange} language={language} />
            <FormField id="composition" label={UI_TEXT[language].composition} placeholder={UI_TEXT[language].compositionPlaceholder} value={inputs.composition} onChange={handleChange} language={language} />
            <FormField id="negative" label={UI_TEXT[language].negative} placeholder={UI_TEXT[language].negativePlaceholder} value={inputs.negative} onChange={handleChange} language={language} />
            
            <button
                onClick={onSubmit}
                disabled={isLoading || !inputs.subject.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {UI_TEXT[language].generating}
                    </>
                ) : (
                    <>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v1h-2V4H7v1H5V4zM3 7v10a2 2 0 002 2h10a2 2 0 002-2V7H3zm3 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
                     </svg>
                     {UI_TEXT[language].generate}
                    </>
                )}
            </button>
        </div>
    );
};

export default PromptForm;
