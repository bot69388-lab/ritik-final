import { Brain, Activity, FileText } from 'lucide-react';
import type { UserData, ViewState } from '../types';

interface HomeScreenProps {
    userData: UserData;
    onNavigate: (view: ViewState) => void;
}

export function HomeScreen({ userData, onNavigate }: HomeScreenProps) {
    // Calculate risk percentage for progress bar (Mock logic for visual)
    const riskColor =
        userData.riskLevel === 'High' ? 'text-red-500' :
            userData.riskLevel === 'Moderate' ? 'text-mind-orange' :
                'text-mind-teal';

    const riskBg =
        userData.riskLevel === 'High' ? 'bg-red-500' :
            userData.riskLevel === 'Moderate' ? 'bg-mind-orange' :
                'bg-mind-teal';

    const riskPercentage =
        userData.riskLevel === 'High' ? 80 :
            userData.riskLevel === 'Moderate' ? 50 : 20;

    return (
        <div className="flex flex-col h-full overflow-y-auto pb-24">
            {/* Header */}
            <header className="px-8 pt-8 pb-6 bg-white sticky top-0 z-10">
                <h1 className="text-gray-400 text-sm font-medium mb-1">Welcome back,</h1>
                <div className="text-3xl font-bold text-gray-800">{userData.name}</div>
            </header>

            <div className="px-6 space-y-6">
                {/* Risk Level Card */}
                <div className="bg-white p-6 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Risk Level</h2>
                        <div className={`px-3 py-1 rounded-full bg-gray-50 text-xs font-bold ${riskColor}`}>
                            {userData.riskLevel.toUpperCase()}
                        </div>
                    </div>

                    <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <div
                            className={`absolute top-0 left-0 h-full ${riskBg} transition-all duration-1000 ease-out rounded-full`}
                            style={{ width: `${riskPercentage}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        Based on your recent activity and memory tests.
                    </p>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 gap-4">
                    <button
                        onClick={() => onNavigate('TEST')}
                        className="group relative p-6 bg-gradient-to-br from-mind-blue to-blue-400 rounded-[32px] text-white shadow-lg shadow-blue-200 overflow-hidden text-left transition-transform active:scale-95"
                    >
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                <Brain size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Daily Memory Test</h3>
                            <p className="text-blue-50 text-sm opacity-90">Take your daily assessment</p>
                        </div>
                        <Brain className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12 group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={() => onNavigate('ACTIVITY')}
                        className="group relative p-6 bg-white rounded-[32px] text-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 text-left transition-transform active:scale-95"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                                    <Activity size={24} className="text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">Activity Tracker</h3>
                                <p className="text-gray-400 text-sm">Monitor your routine</p>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => onNavigate('NOTES')}
                        className="group relative p-6 bg-white rounded-[32px] text-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 text-left transition-transform active:scale-95"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
                                    <FileText size={24} className="text-mind-orange" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">Caregiver Notes</h3>
                                <p className="text-gray-400 text-sm">Log behavioral changes</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
