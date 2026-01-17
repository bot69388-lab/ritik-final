import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
// Importing assets directly to ensure Vite includes them
// Note: In a real app we'd map these dynamically or rename them
import imgCity from '../assets/uploaded_image_1_1768639635338.jpg';   // Assuming City
import imgObject from '../assets/uploaded_image_2_1768639635338.jpg'; // Assuming Object

interface MemoryTestProps {
    onComplete: (risk: 'Low' | 'Moderate' | 'High') => void;
    onBack: () => void;
}

export function MemoryTest({ onComplete, onBack }: MemoryTestProps) {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    // Questions Configuration
    const questions = [
        {
            type: 'text',
            question: "What is your son's name?",
            options: ["Arjun", "Varun", "Rahul"],
            correct: 0 // Index
        },
        {
            type: 'image',
            question: "Which city do you live in?",
            image: imgCity,
            options: ["Delhi", "Mumbai", "Bangalore"],
            correct: 1 // Mock correct answer
        },
        {
            type: 'object',
            question: "Identify this object",
            image: imgObject, // Using the 3rd image as an object
            options: ["Watch", "Banana", "Chair"],
            correct: 0
        }
    ];

    const handleNext = () => {
        if (selectedOption !== null) {
            if (selectedOption === questions[step].correct) {
                setScore(curr => curr + 1);
            }

            if (step < questions.length - 1) {
                setStep(curr => curr + 1);
                setSelectedOption(null);
            } else {
                // Finished
                // Basic Logic: 3/3 -> Low, 2/3 -> Moderate, <=1 -> High
                const finalScore = score + (selectedOption === questions[step].correct ? 1 : 0);
                const risk = finalScore === 3 ? 'Low' : finalScore === 2 ? 'Moderate' : 'High';
                onComplete(risk);
            }
        }
    };

    const currentQ = questions[step];

    return (
        <div className="h-full flex flex-col bg-blue-50">
            {/* Header */}
            <div className="bg-mind-blue p-6 pb-12 rounded-b-[40px] shadow-lg relative z-0">
                <button onClick={onBack} className="absolute top-6 left-6 text-white p-2 hover:bg-white/20 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div className="text-center text-white pt-2">
                    <h2 className="text-xl font-bold">Memory Test</h2>
                    <p className="opacity-90 text-sm">Question {step + 1} of {questions.length}</p>
                </div>
            </div>

            {/* Content Card */}
            <div className="flex-1 -mt-6 px-6 relative z-10">
                <div className="bg-white rounded-[32px] p-6 shadow-xl h-full max-h-[600px] flex flex-col">

                    <div className="mb-6 text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">{currentQ.question}</h3>

                        {/* Image display if available */}
                        {currentQ.image && (
                            <div className="rounded-2xl overflow-hidden h-48 w-full mb-6 shadow-md">
                                <img src={currentQ.image} alt="Question Context" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    {/* Options */}
                    <div className="space-y-3 flex-1">
                        {currentQ.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedOption(idx)}
                                className={`w-full p-4 rounded-xl border-2 text-left transition-all relative
                  ${selectedOption === idx
                                        ? 'border-mind-teal bg-teal-50 text-mind-teal font-semibold shadow-sm'
                                        : 'border-gray-100 text-gray-600 hover:border-gray-200'}
                `}
                            >
                                {opt}
                                {selectedOption === idx && (
                                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-mind-teal" size={20} />
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={selectedOption === null}
                        className="w-full bg-mind-teal text-white py-4 rounded-2xl font-bold text-lg mt-6 shadow-lg shadow-teal-200 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
                    >
                        {step === questions.length - 1 ? 'Finish Test' : 'Next Question'}
                    </button>
                </div>
            </div>
        </div>
    );
}
