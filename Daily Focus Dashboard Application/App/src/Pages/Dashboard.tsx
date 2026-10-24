import { Flame, Timer, PinIcon } from 'lucide-react'
import { LineChart, Line, XAxis, Tooltip, BarChart, Bar } from 'recharts'
import { useTranslation } from 'react-i18next'
import { getFormatedDate } from '../Utlies/UsedMehtods'
import MyStore from '../GlobalSharedState'
import { useNavigate } from 'react-router'
import { useMemo } from 'react'

export default function Dashboard() {

    const { t } = useTranslation();
    const nav = useNavigate()
    const Tasks = MyStore((state) => state.tasks)
    const goals = MyStore((state) => state.goals)
    const IsLight = MyStore((state) => state.IsLight)
    const sessionTask = MyStore((state) => state.sessionTask)

    // login data carried from login
    const loginData = MyStore((state) => state.LoginData)

    // tasks
    const completedTasks = Tasks.filter((t) => t.done === true).length

    // goals
    const completedgoals = goals.filter((goal) => goal.current === goal.target).length
    const totalGoals = goals.length

    // Notes
    const notes = MyStore((state) => state.notes);


    function completedgoalsPercentage() {
        let percentage = ((completedgoals / totalGoals) * 100)
        if (isNaN(percentage)) {
            return percentage = 0
        }
        return Math.floor(percentage)
    }

    // navigations
    function redirectToTimer() {
        nav('/timer')
    }

    function redirectToTasks() {
        nav('/tasks')
    }

    function redirectToGoals() {
        nav('/goals')
    }

    function redirectToNotes() {
        nav('/notes')
    }

    function getTime() {
        let total = 0
        for (let session of sessionTask) {
            total += session.sessionDuration
        }

        //  minutes
        return total
    }

    function MinutsAndHours() {
        const time = getTime()
        const minutes = Math.floor(time % 60)
        const hours = Math.floor(time / 60)
        return {
            minutes: minutes,
            hours: hours
        }
    }

    function WeeklyFocus() {
        const WeeklyFocus = history7Days.WeeklyFocus
        const minutes = Math.floor(WeeklyFocus % 60)
        const hours = Math.floor(WeeklyFocus / 60)
        return {
            minutes: minutes,
            hours: hours
        }
    }

    const history7Days = useMemo(() => {
        const historyList = [];
        let focus = 0
        let currentStreak;

        for (let i = 6; i >= 0; i--) {

            let d = new Date();

            // to get the day of the week
            d.setDate(d.getDate() - i); // Go back i days

            let dd = (d.getDate()) + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

            const dateKey = dd

            const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });

            // Filter your tasks and goals using your date format!
            const dayTasks = Tasks.filter((t) => t.date === dateKey);
            const dayGoals = goals.filter((g) => g.date === dateKey);
            const focusSessions = sessionTask.filter((s) => s.date === dateKey);


            const tasksCompleted = dayTasks.filter((t) => t.done === true).length;
            const goalsCompleted = dayGoals.filter((g) => g.current === g.target).length;
            const sessions = sessionTask.length

            const tasksProductivity = dayTasks.length > 0 ? (tasksCompleted / dayTasks.length) * 100 : 0;
            const goalsProductivity = dayGoals.length > 0 ? (goalsCompleted / dayGoals.length) * 100 : 0;
            const sessionsProductivity = focusSessions.length > 0 ? ((focusSessions.length / sessions) * 100) : 0;

            focus = sessionTask.reduce((acc, curr) => acc += curr.sessionDuration, 0);

            const score = Math.min(100, (tasksProductivity + goalsProductivity) / 2);

            currentStreak = historyList.length > 0 ? historyList.filter((t) => t.pct > 80).length : 0;

            historyList.push({
                weekday: t(`days.${weekday}`),
                pct: Math.round(score),
                focusPct: Math.round(sessionsProductivity)
            });

        }

        return {
            historyList: historyList,
            WeeklyFocus: focus,
            CurrentStreak: currentStreak
        };

    }, [Tasks, goals]);

    function MorningAndNoonAEvening() {

        let period = new Date().toLocaleDateString('en-EG', { dayPeriod: 'narrow' })
        if (period.includes('evening')) {
            if (document.documentElement.dir == 'rtl') {
                return 'مساء الخير '
            }
            return 'Good evening'
        } else if (period.includes('afternoon')) {
            if (document.documentElement.dir == 'rtl') {
                return 'مساء الخير '
            }
            return 'Good afternoon'
        } else if (period.includes('morning')) {
            if (document.documentElement.dir == 'rtl') {
                return 'صباح الخير '
            }
            return 'Good morning'
        } else if (period.includes('night')) {
            if (document.documentElement.dir == 'rtl') {
                return 'اهلا بك في المساء'
            }
            return 'Welcome at night'
        }
    }


    return (
        <>
            <div>
                {/* header div */}
                <div className="mb-5 md:flex items-center justify-between">
                    <div className='mb-2'>
                        <h1 className={`text-[22px] font-serif font-bold md:text-[26px] ${IsLight ? 'text-[#211f1a]' : 'text-white'} `}>{`${MorningAndNoonAEvening()} `}, {loginData.user} 👋</h1>
                        <p className={`mt-1 text-[13px] ${IsLight ? 'text-[#8a877e]' : 'text-white'} `}>{t('dashboard.Greeting')}</p>
                    </div>
                    <span className={`text-[12px] text-center ${IsLight ? 'text-[#8a877e]' : 'text-white'} `}>{getFormatedDate()}</span>
                </div>

                {/* Cards Tasks Completed, Focus Time, Current Streak, Daily Goal */}
                <div className="flex flex-wrap gap-2 md:gap-3.5 mb-4">

                    <div className="bg-white grow shrink-0 md:flex-1 py-4 px-4.5 rounded-2xl border border-[#e8e6e0] ">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[12px] mb-1.5 text-[#8a877e]">{t("dashboard.Tasks Completed")}</p>
                                <p className="text-[22px]">{completedTasks}</p>
                            </div>
                            <svg className='w-8.5 h-8.5 -rotate-90'>
                                <circle cx={17} cy={17} r={15} stroke='#eeece6' strokeWidth={4} fill='none'></circle>
                                <circle cx={17} cy={17} r={15} stroke='#d98c2b' strokeWidth={4} fill='none' strokeLinecap='round' strokeDasharray={2 * Math.PI * 15}
                                    strokeDashoffset={(2 * Math.PI * 15) * ((1 - (completedTasks / (Tasks.length || 1))))}>
                                </circle>
                            </svg>
                        </div>
                    </div>

                    <div className="bg-white grow shrink-0 md:flex-1 py-4 px-4.5 rounded-2xl border border-[#e8e6e0]">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[12px] mb-1.5 text-[#8a877e]">{t("dashboard.Focus Time")}</p>
                                <p className="text-[22px]">{t("dashboard.Focus Time Result", { hours: MinutsAndHours().hours, minutes: MinutsAndHours().minutes })}</p>
                            </div>
                            <div className='w-8.5 h-8.5 flex items-center justify-center bg-[#faecd8] rounded-[10px]'>
                                <Timer className='w-4 h-4 ' stroke='#d96652' />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white grow shrink-0 md:flex-1 py-4 px-4.5 rounded-2xl border border-[#e8e6e0]">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[12px] mb-1.5 text-[#8a877e]">{t("dashboard.Current Streak")}</p>
                                <p className="text-[22px]">{t("dashboard.Current Streak Result", { currentStreak: history7Days.CurrentStreak })}</p>
                            </div>
                            <div className='w-8.5 h-8.5 flex items-center justify-center bg-[#faecd8] rounded-[10px]'>
                                <Flame className='w-4 h-4 ' stroke='#d96652' />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white grow shrink-0 md:flex-1 py-4 px-4.5 rounded-2xl border border-[#e8e6e0]">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[12px] mb-1.5 text-[#8a877e]">{t("dashboard.Daily Goal")}</p>
                                <p className="text-[22px]">{completedgoalsPercentage()} %</p>
                            </div>
                            <svg className='w-8.5 h-8.5 -rotate-90'>
                                <circle cx={17} cy={17} r={15} stroke='#eeece6' strokeWidth={4} fill='none'></circle>
                                <circle cx={17} cy={17} r={15} stroke='#d98c2b' strokeWidth={4} fill='none' strokeLinecap='round' strokeDasharray={2 * Math.PI * 15}
                                    strokeDashoffset={(2 * Math.PI * 15) * ((1 - (completedgoals / (totalGoals || 1))))}>
                                </circle>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* tasks representation, focus timer representaiton, goals representation, pinned notes */}
                <div className='flex gap-3.5 mb-3.5 w-full flex-wrap'>
                    {/* Tasks */}
                    <div className='grow shrink-0 md:flex-1 bg-white p-5 rounded-2xl border border-[#e8e6e0] h-66.25 overflow-y-scroll scrollbar-none max-[450px]:w-full'>
                        <div className='flex justify-between items-center mb-3.5'>
                            <p className='text-[14px] font-semibold'>{t("dashboard.Todays Tasks")}</p>
                            <button className='text-[12px] text-[#d98c2b] cursor-pointer' onClick={() => redirectToTasks()}>{t("dashboard.ViewAll")}</button>
                        </div>

                        {Tasks.length === 0 ? (<p className='text-[18px] text-center text-[#8a877e] mt-10'>{t("dashboard.NoData")}</p>) :
                            (Tasks.map((task) => (
                                <div className='flex gap-2.5 items-center py-2.5 border-t border-[#e8e6e0]' key={task.id}>
                                    <input type='checkbox' className='w-3.75 h-3.75 accent-green-600 rounded-lg border border-solid border-[#d5d2c9] cursor-pointer' checked={task.checked} readOnly />
                                    <span className={`flex-1 text-[13px] capitalize text-[#211f1a]`}>{task.task}</span>
                                    <span className='text-[10px] capitalize font-semibold text-[#4f9970] bg-[#4f99701a] rounded-[20px] py-0.5 px-2'>{task.tag}</span>
                                    <span className='text-[11px] w-15 text-right text-[#8a877e] capitalize'>{task.time}</span>
                                </div>
                            )))
                        }
                    </div>

                    {/* Timer */}
                    <div className='grow shrink-0 md:flex-1 bg-white p-5 rounded-2xl border border-[#e8e6e0] max-[450px]:w-full'>
                        <div className='flex flex-col items-center'>
                            <div className='self-start mb-3.5'>
                                <p className='text-[14px] font-semibold'>{t("dashboard.Focus Timer")}</p>
                            </div>
                            <div className='relative' >
                                <svg className='w-32.5 h-32.5'>
                                    <circle cy={65} cx={65} r={60.5} stroke='#eeece6' strokeWidth={8} fill='none'> </circle>
                                    <circle cy={65} cx={65} r={60.5} stroke='#d98c2b' strokeWidth={8} fill='none'> </circle>
                                </svg>
                                <span className='absolute inset-0 flex items-center justify-center text-[24px] font-semibold'>{t("dashboard.Focus Timer Period")}</span>
                            </div>
                            <button className='bg-[#d98c2b] mt-4 py-2.25 px-7 rounded-[10px] text-white cursor-pointer' onClick={() => redirectToTimer()}>{t("dashboard.Start")}</button>
                        </div>
                    </div>

                    {/* goals */}
                    <div className='grow shrink-0 md:flex-1 bg-white p-5 rounded-2xl border border-[#e8e6e0] h-66.25 overflow-y-scroll scrollbar-none max-[450px]:w-full'>

                        <div className='flex justify-between items-center mb-3.5'>
                            <p className='text-[14px] font-semibold'>{t("dashboard.Daily Goals")}</p>
                            <button className='text-[12px] text-[#d98c2b] cursor-pointer' onClick={() => redirectToGoals()}>{t("dashboard.ViewAll")}</button>
                        </div>

                        {goals.length === 0 ? (<p className='text-[18px] text-center text-[#8a877e] mt-10'>{t("dashboard.NoData")}</p>) :
                            (goals.map((goal) => (
                                <div className='flex gap-3.5 items-center mb-3' key={goal.id}>
                                    <div className='flex-1'>
                                        <div className='mb-1.5 flex justify-between items-center'>
                                            <span className='text-[13.5px] text-[#211f1a] font-medium capitalize'>{goal.name}</span>
                                            <span className='text-[12px] text-[#8a877e]'>{`${goal.current} /${goal.target}`}</span >
                                        </div >

                                        <div className='h-1.5 rounded-sm bg-[#eeece6]'>
                                            <div className={`h-full bg-[#00a63e] rounded-sm transition-all duration-650`} style={{ width: `${goal.current > 0 ? (goal.current / goal.target) * 100 : 0}%` }}></div>
                                        </div>
                                    </div >

                                    <button className=' p-0.5 text-[#8a877e] cursor-pointer'>
                                    </button>
                                </div >
                            )))
                        }

                    </div >

                    {/* notes */}
                    < div className='grow shrink-0 md:flex-1 bg-white p-5 rounded-2xl border border-[#e8e6e0] h-66.25 overflow-y-scroll scrollbar-none max-[450px]:w-full' >
                        <div className='flex justify-between items-center mb-3.5'>
                            <div className='flex  gap-1.5 items-center'>
                                <p className='text-[14px] font-semibold'>{t("dashboard.Notes")}</p>
                            </div>
                            <button className='text-[12px] text-[#d98c2b] cursor-pointer' onClick={() => redirectToNotes()}>{t("dashboard.ViewAll")}</button>
                        </div>

                        {
                            notes.length === 0 ? (<p className='text-[18px] text-center text-[#8a877e] mt-10'>{t("dashboard.NoData")}</p>) :
                                (notes.map((note) => (
                                    <div className='flex justify-between items-center py-2.5 border-t border-[#e8e6e0]' key={note.NoteId}>
                                        <div className='flex items-center gap-2.5'>
                                            <PinIcon className={`w-3.25 h-3.25 ${note.IsPinned ? 'text-[#d98c2b]' : 'text-black'}`} />
                                            <span className='capitalize text-[14px] text-[#211f1a] font-semibold'>{note.NoteTitle}</span>
                                        </div>
                                        <span className='capitalize text-[12px] text-[green]'>{note.NoteDate}</span>
                                    </div>
                                )))
                        }
                    </div >

                </div >

                {/* charts */}
                < div className='flex gap-3.5 flex-wrap' >
                    <div className='flex-1 bg-white p-5 rounded-2xl border border-[#e8e6e0]'>
                        <div className='flex justify-between mb-8'>
                            <p className='text-[14px] font-semibold text-[#211f1a]'>{t("dashboard.Productivity header")} </p>
                            <span className='flex items-center gap-1 text-[12px] text-[#8a877e]'>{t("dashboard.This Week")}
                            </span>
                        </div>
                        <div className='min-w-62.5 md:w-125 m-auto'>
                            <LineChart width='100%' height={100} data={history7Days.historyList}>
                                <Tooltip />
                                <Line dataKey='pct' stroke='#d98c2b' strokeWidth={2.5} type='monotone' />
                                <XAxis dataKey='weekday' axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600 }} />
                            </LineChart>
                        </div>
                    </div>

                    <div className='flex-1 bg-white p-5 rounded-2xl border border-[#e8e6e0]'>
                        <div>
                            <p className='text-[14px] mb-1 font-semibold'>{t("dashboard.Barchart header")}</p>
                            <span className='text-[20px] text-[#211f1a] font-semibold'>{t("dashboard.Weekly Focus", { hours: WeeklyFocus().hours, minutes: WeeklyFocus().minutes })}</span>
                        </div>
                        <div className='min-w-62.5 md:w-125 m-auto'>
                            <BarChart width='100%' height={100} data={history7Days.historyList}>
                                <Bar dataKey='focusPct' stroke='#d98c2b' strokeWidth={2.5} fill='#d98c2b' />
                                <XAxis dataKey='weekday' axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600 }} />
                            </BarChart>
                        </div>
                    </div>
                </div >
            </div >
        </>

    )
}
