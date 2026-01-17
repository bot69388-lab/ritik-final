export type ViewState = 'AUTH' | 'HOME' | 'TEST' | 'ACTIVITY' | 'NOTES';

export interface TestResult {
    date: string;
    score: number;
    riskLevel: 'Low' | 'Moderate' | 'High';
}

export interface ActivityLog {
    date: string;
    completedTasks: number;
    missedTasks: number;
}

export interface CaregiverNote {
    id: string;
    date: string;
    content: string;
    status: 'Stable' | 'Concerning' | 'Urgent';
}

export interface UserData {
    name: string;
    riskLevel: 'Low' | 'Moderate' | 'High';
    history: TestResult[];
    activity: ActivityLog[];
    notes: CaregiverNote[];
}
