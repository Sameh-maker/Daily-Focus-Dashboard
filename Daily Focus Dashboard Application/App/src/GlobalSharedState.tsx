import { create } from "zustand";
import { persist } from 'zustand/middleware'

interface data {
    tasks: object[],
    category: boolean,
    selectedCategory: string,
    IsPaused: boolean,
    IsBreak: boolean,
    IsLight: boolean,
    IsAlarm: boolean,
    timeObject: { focusTime: number, breakTime: number },
    sessionTask: { sessionDuration: number }[],
    goals: { current: number, target: number }[],
    openGoalsSection: boolean,
    notes: Object[],
    isAddingNotes: boolean,
    searchQuery: string,
    LoginData: Object,
    setTasks: (value: object) => void,
    OpenCloseCategory: () => void
    closeCategory: () => void
    toggleId: (id: string) => void,
    deleteTask: (id: string) => void
    setSelectedCategory: (value: string) => void
    setTimeObject: (field: number, value: number) => void
    setSessionTask: (value: string[]) => void
    onAddGoal: (value: []) => void
    deleteGoal: (id: string) => void
    increase: (id: string) => void
    decrease: (id: string) => void
    setIsPaused: () => void
    setPause: () => void
    RunBreakButton: () => void
    RunWorkButton: () => void
    deleteSessionRecorded: (id: string) => void
    togglePlayPause: () => void
    openGoalsPopup: () => void
    setAlarm: () => void
    changeToDarkMode: () => void
}

const MyStore = create(
    persist<data>(
        (set) => ({
            tasks: [],
            category: false,
            selectedCategory: '',
            IsPaused: true,
            IsBreak: false,
            IsLight: true,
            IsAlarm: false,
            timeObject: {
                focusTime: 0,
                breakTime: 0
            },
            sessionTask: [],
            goals: [],
            openGoalsSection: false,
            notes: [],
            isAddingNotes: false,
            searchQuery: '',
            LoginData: {},
            IsArabic: false,
            // Methods Related to Tasks State (Task Component)
            setTasks: (value) => set((state) => {
                const exists = state.tasks.some((t: object) => t.task == value.task);
                return {
                    tasks: exists ? state.tasks : [...state.tasks, value]
                }
            }),
            toggleId: (id) => set((state) => ({ tasks: state.tasks.map((t) => t.id === id ? { ...t, done: !t.done, checked: !t.checked } : t) })),
            deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

            // Methods Related to Category State
            OpenCloseCategory: () => set((state) => ({ category: !state.category })),
            closeCategory: () => set((state) => ({ category: state.category = false })),
            setSelectedCategory: (value) => set(({ selectedCategory: value })),

            // Methods Related to Timer (Timer Component)

            // when stopping the timer
            setIsPaused: () => set((state) => ({ IsPaused: !state.IsPaused })),
            // when reseting the timer
            setPause: () => set((state) => ({ IsPaused: state.IsPaused = true })),
            RunBreakButton: () => set((state) => ({ IsBreak: state.IsBreak = true })),
            RunWorkButton: () => set((state) => ({ IsBreak: state.IsBreak = false })),
            togglePlayPause: () => set((state) => ({ IsPaused: !state.IsPaused })),

            // Methods for Settings
            changeToDarkMode: () => set((state) => ({ IsLight: !state.IsLight })),

            // for alarm settings
            setAlarm: () => set((state) => ({ IsAlarm: !state.IsAlarm })),
            setTimeObject: (field, value) => set((state) => ({
                timeObject: state.timeObject = {
                    ...state.timeObject,
                    [field]: Number(value)
                }
            })),
            // timer sessions
            setSessionTask: (value) => set((state) => {
                const exists = state.sessionTask.some((t) => t.id == value.id);
                return {
                    sessionTask: exists ? state.sessionTask : [...state.sessionTask, { ...value, sessionDuration: state.timeObject.focusTime }]
                };
            }),
            deleteSessionRecorded: (id) => set((state) => ({ sessionTask: state.sessionTask.filter((session) => session.id != id) })),

            // goals component
            onAddGoal: (value) => set((state) => {
                const result = state.goals.some((goal) => goal.name == value.name);
                return {
                    goals: result ? state.goals : [...state.goals, value]
                }
            }),
            openGoalsPopup: () => set((state) => ({ openGoalsSection: state.openGoalsSection = true })),
            closeGoalsPopup: () => set((state) => ({ openGoalsSection: state.openGoalsSection = false })),
            deleteGoal: (id) => set((state) => ({ goals: state.goals.filter((goal) => goal.id != id) })),
            increase: (id) => set((state) => {
                const result = state.goals.map((goal) => {
                    if (goal.id === id) {
                        let object = {
                            ...goal, current: goal.current + 1
                        }
                        return object
                    }
                    return goal
                })
                return {
                    goals: result
                }
            }),

            decrease: (id) => set((state) => {
                const r = state.goals.map((goal) => {
                    if (goal.id == id) {
                        return {
                            ...goal, current: goal.current > 0 ? (goal.current - 1) : 0
                        }
                    }
                    return goal
                })
                return {
                    goals: r
                }
            }),

            clearAllTasks: () => set(() => ({ tasks: [] })),
            clearAllSessionsRecorded: () => set(() => ({ sessionTask: [] })),
            clearAllGoals: () => set(() => ({ goals: [] })),
            clearAllNotes: () => set(() => ({ notes: [] })),
            setLoginData: (value) => set(() => ({ LoginData: { ...value } })),

            // Notes function
            setNotes: (value) => set((state) => {
                const exist = state.notes.some((n) => n.NoteTitle === value.NoteTitle)
                return {
                    notes: exist ? state.notes : [...state.notes, value]
                }
            }),

            deleteNote: (value) => set((state) => ({ notes: state.notes.filter((n) => n.NoteId != value.NoteId) })),

            pinNote: (value) => set((state) => ({ notes: state.notes.map((n) => n.NoteId == value.NoteId ? { ...value, IsPinned: !n.IsPinned } : n) })),

            OpenAddingNotesPopUp: () => set((state) => ({ isAddingNotes: state.isAddingNotes = true })),

            closingNotesAddingPopUp: () => set((state) => ({ isAddingNotes: state.isAddingNotes = false })),

            setSearchQuery: (value) => set((state) => ({ searchQuery: value })),

            setIsArabic: () => set((state) => ({ IsArabic: !state.IsArabic }))

        }),
        { name: 'applicationStorage' }
    )

)

export default MyStore


