import { Home, Brain, Activity, FileText } from 'lucide-react';
import type { ViewState } from '../types';

interface NavbarProps {
    currentView: ViewState;
    onNavigate: (view: ViewState) => void;
}

export function Navbar({ currentView, onNavigate }: NavbarProps) {
    if (currentView === 'AUTH') return null;

    const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => {
        const isActive = currentView === view;
        return (
            <button
                onClick={() => onNavigate(view)}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-mind-teal' : 'text-gray-400'}`}
            >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{label}</span>
            </button>
        );
    };

    return (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-100 flex items-center justify-around px-2 pb-2 rounded-b-[40px]">
            <NavItem view="HOME" icon={Home} label="Home" />
            <NavItem view="TEST" icon={Brain} label="Test" />
            <NavItem view="ACTIVITY" icon={Activity} label="Activity" />
            <NavItem view="NOTES" icon={FileText} label="Notes" />
        </div>
    );
}
