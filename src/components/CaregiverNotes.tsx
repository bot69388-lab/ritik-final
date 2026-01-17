import { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import type { CaregiverNote } from '../types';

interface CaregiverNotesProps {
    notes: CaregiverNote[];
    onAddNote: (note: CaregiverNote) => void;
    onBack: () => void;
}

export function CaregiverNotes({ notes, onAddNote, onBack }: CaregiverNotesProps) {
    const [content, setContent] = useState('');

    const analyzeAndAdd = () => {
        if (!content.trim()) return;

        const lower = content.toLowerCase();
        let status: 'Stable' | 'Concerning' | 'Urgent' = 'Stable';

        if (lower.includes('lost') || lower.includes('wandered') || lower.includes('aggressive')) {
            status = 'Urgent';
        } else if (lower.includes('forgot') || lower.includes('confused') || lower.includes('upset')) {
            status = 'Concerning';
        }

        const newNote: CaregiverNote = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            content,
            status
        };

        onAddNote(newNote);
        setContent('');
    };

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-y-auto pb-24">
            <div className="bg-white p-6 sticky top-0 z-10 shadow-sm border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="text-gray-600" />
                    </button>
                    <h2 className="text-xl font-bold text-gray-800">Caregiver Notes</h2>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Input Area */}
                <div className="bg-white rounded-[32px] p-2 shadow-sm border border-gray-100">
                    <textarea
                        className="w-full h-32 p-4 rounded-t-[24px] resize-none focus:outline-none text-gray-700 placeholder:text-gray-300"
                        placeholder="Log observations here (e.g., 'Patient was confused nearby the park')..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="px-2 pb-2">
                        <button
                            onClick={analyzeAndAdd}
                            disabled={!content.trim()}
                            className="w-full bg-mind-orange text-white py-3 rounded-[24px] font-semibold flex items-center justify-center gap-2 hover:bg-orange-400 transition-colors disabled:opacity-50"
                        >
                            <Send size={18} />
                            Update Log
                        </button>
                    </div>
                </div>

                {/* Log List */}
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-400 text-sm uppercase tracking-wider ml-2">Recent Logs</h3>

                    {notes.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                            <p>No notes yet.</p>
                        </div>
                    ) : (
                        notes.map(note => (
                            <div key={note.id} className="bg-white p-5 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-gray-400">{note.date}</span>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                     ${note.status === 'Urgent' ? 'bg-red-100 text-red-500' :
                                            note.status === 'Concerning' ? 'bg-orange-100 text-orange-500' :
                                                'bg-green-100 text-green-600'}
                   `}>
                                        {note.status}
                                    </span>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{note.content}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
