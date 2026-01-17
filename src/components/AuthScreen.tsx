import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';

interface AuthScreenProps {
    onLogin: (name: string) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onLogin(name.trim());
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-b from-teal-50 to-white">
            <div className="w-24 h-24 bg-mind-teal rounded-full flex items-center justify-center mb-8 shadow-lg shadow-teal-100">
                <User size={48} className="text-white" />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">MindAlert</h1>
            <p className="text-gray-500 mb-10 text-center">Your companion for cognitive health and peace of mind.</p>

            <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                        What should we call you?
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl border-none bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-mind-teal focus:outline-none text-lg placeholder:text-gray-300 transition-all"
                        placeholder="Enter your name"
                        autoFocus
                    />
                </div>

                <button
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full bg-mind-teal text-white py-4 rounded-2xl font-semibold text-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    Get Started
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </form>
        </div>
    );
}
