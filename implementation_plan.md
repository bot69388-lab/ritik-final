# MindAlert Implementation Plan

## Goal Description
Build "MindAlert", a high-fidelity, mobile-first React application for Dementia Detection and Cognitive Monitoring. The app will be entirely local (no external APIs), use state-driven routing, and feature a "Trustworthy Health" aesthetic. It includes an Authentication flow (by name), Memory Test, Activity Tracker, and Caregiver Notes.

## User Review Required
> [!IMPORTANT]
> - Tech Stack: Vite + React + TypeScript + Tailwind CSS is chosen to ensure ".tsx" support and "production-ready" status, as browsers cannot run raw .tsx/JSX without a build step.
> - Images: The uploaded images will be moved to `src/assets` and used in the Memory Test.

## Proposed Changes

### Project Setup
- Initialize Vite project with React/SWC and TypeScript.
- Install `tailwindcss`, `postcss`, `autoprefixer`.
- Install `recharts` for charts.
- Install `lucide-react` or `react-icons` (FontAwesome) for icons.

### Architecture
- **Single Page App**: `App.tsx` will hold the `currentView` state (`'AUTH' | 'HOME' | 'TEST' | 'ACTIVITY' | 'NOTES'`).
- **Data Model**: `UserData` context/interface to store:
  - `name`: string
  - `riskLevel`: 'Low' | 'Moderate' | 'High'
  - `testResults`: array of past scores
  - `caregiverNotes`: array of log entries

### Components

#### [NEW] `src/App.tsx`
- Main entry point. Defines layout constraints (max-w-md, centered, white bg).
- Handles routing switch.

#### [NEW] `src/components/AuthScreen.tsx`
- Simple form to input user name.
- Updates global user state.
- "Get Started" button transition.

#### [NEW] `src/components/HomeScreen.tsx`
- **Header**: "Hello, [Name]!"
- **Risk Indicator**: Progress bar/meter component showing current risk.
- **Nav Cards**: Large clickable cards for the 3 main modules using glassmorphism.

#### [NEW] `src/components/MemoryTest.tsx`
- Multi-step wizard.
- **Step 1**: Text Question (e.g., "What year is it?").
- **Step 2**: Image Recognition (Use uploaded image - "Who is this?" or "Select the [City]").
- **Step 3**: Object ID (Icon based).
- **Result**: Calculates score, updates Risk Level.

#### [NEW] `src/components/ActivityTracker.tsx`
- **Chart**: Recharts BarChart showing weekly task completion.
- **Status Cards**: "Sleep Patterns" (static/mocked for now or toggle), "Missed Tasks".

#### [NEW] `src/components/CaregiverNotes.tsx`
- **Input**: TextArea for observations.
- **Logic Engine**:
  - `analyzeNote(text)` function.
  - Keywords: 'lost', 'wandered', 'aggressive' -> **Urgent** (Red).
  - Keywords: 'forgot', 'confused' -> **Concerning** (Orange).
  - Else -> **Stable** (Green).
- **List**: Display recent notes with tags.

#### [NEW] `src/components/Navbar.tsx`
- Fixed bottom navigation.
- Icons for Home, Test, History, Care.
- Active state highlighting.

## Verification Plan
### Automated Tests
- Build verification: `npm run build`.
- Lint check: `eslint`.

### Manual Verification
- **Auth**: Verify entering name updates Home screen greeting.
- **Memory Test**: Run through all questions, check if score updates and Risk Level changes.
- **Notes**: Type "Patient was confused today" -> Verify "Concerning" tag appears.
- **Responsive**: Check on mobile view (448px width).
