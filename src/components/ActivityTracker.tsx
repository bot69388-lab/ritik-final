import { ArrowLeft, Moon, AlertOctagon } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ActivityTrackerProps {
    onBack: () => void;
}

export function ActivityTracker({ onBack }: ActivityTrackerProps) {
    const data = [
        { name: 'Mon', tasks: 3 },
        { name: 'Tue', tasks: 5 },
        { name: 'Wed', tasks: 7 },
        { name: 'Thu', tasks: 4 },
        { name: 'Fri', tasks: 6 },
        { name: 'Sat', tasks: 8 },
        { name: 'Sun', tasks: 5 },
    ];

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-y-auto pb-24">
            <div className="bg-white p-6 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="text-gray-600" />
                    </button>
                    <h2 className="text-xl font-bold text-gray-800">Activity Tracker</h2>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4">
                    {/* Sleep */}
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-5 text-white shadow-lg shadow-orange-100">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-2 bg-white/20 rounded-full">
                                <Moon size={24} />
                            </div>
                            <span className="font-semibold text-lg">Sleep Changes</span>
                        </div>
                        <p className="text-white/90 font-medium">Irregular Sleep Pattern</p>
                    </div>

                    {/* Missed */}
                    <div className="bg-gradient-to-r from-red-400 to-pink-500 rounded-3xl p-5 text-white shadow-lg shadow-red-100">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-2 bg-white/20 rounded-full">
                                <AlertOctagon size={24} />
                            </div>
                            <span className="font-semibold text-lg">Missed Tasks</span>
                        </div>
                        <p className="text-white/90 font-medium">2 Days Missed</p>
                    </div>
                </div>

                {/* Chart */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 text-center">
                    <h3 className="text-lg font-bold text-gray-700 mb-6">Weekly Overview</h3>
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                                    dy={10}
                                />
                                <Tooltip
                                    cursor={{ fill: '#F3F4F6' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="tasks" radius={[6, 6, 6, 6]}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.tasks >= 7 ? '#4DB6AC' : entry.tasks >= 4 ? '#FFB74D' : '#EF4444'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
