import { LineChart, Line, XAxis, Tooltip, AreaChart, Area, YAxis, CartesianGrid } from 'recharts';

import { useTranslation } from 'react-i18next'
// import { Flame, ChevronDown } from 'lucide-react'
import MyStore from '../GlobalSharedState'
import { getFormatedDate } from '../Utlies/UsedMehtods'
import { useMemo } from 'react';

export default function Analytics() {
    const { t } = useTranslation()
    const tasks = MyStore((state) => state.tasks)
    const IsLight = MyStore((state) => state.IsLight)
    const sessionTask = MyStore((state) => state.sessionTask)
    const goals = MyStore((state) => state.goals)


    // completed tasks
    const completedTasks: number = tasks.filter((t) => t.done === true).length

    // daily avg time calculations
    function dailyAvgFocus(): number {
        let total = 0
        for (let session of sessionTask) {
            total += session.sessionDuration
        }
        return total / (sessionTask.length || 1)
    }

    function MinutsAndHours(): { minutes: number, hours: number } {
        const avg = dailyAvgFocus()
        const minutes: number = Math.floor(avg % 60)
        const hours: number = Math.floor(avg / 60)
        return {
            minutes: minutes,
            hours: hours
        }
    }


    // category progress
    function getCategories() {
        let ob = tasks.reduce((acc, curr) => {
            acc[curr.tag] = (acc[curr.tag] || 0) + 1
            return acc
        }, {})
        return Object.entries(ob)
    }

    function totalCategories() {
        let categories = getCategories()
        let total = 0
        for (let [, num] of categories) {
            total += num
        }
        return total
    }

    const history7Days = useMemo(() => {
        const historyList = [];
        let focus = 0
        let currentStreak;

        for (let i = 6; i >= 0; i--) {

            let d = new Date();

            d.setDate(d.getDate() - i); // Go back i days

            let dd = (d.getDate()) + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

            const dateKey = dd

            const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });

            // Filter your tasks and goals using your date format!
            const dayTasks = tasks.filter((t) => t.date === dateKey);
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


            currentStreak = historyList.length > 0 ? historyList.filter((t) => t.pct > 80).length : 0

            historyList.push({
                weekday: t(`days.${weekday}`),
                pct: Math.round(score),
                focusPct: Math.round(sessionsProductivity),
                tasksProductivity: Math.round(tasksProductivity)
            });
        }

        return {
            historyList: historyList,
            WeeklyFocus: focus,
            currentStreak: currentStreak
        };

    }, [tasks, goals]);


    return (
        <>
            <div className="max-w-155">
                {/* header */}
                <div className="mb-5 md:flex justify-between items-center">
                    <h1 className={`text-[26px] font-serif font-bold  ${IsLight ? 'text-[#211f1a]' : 'text-white'}`} onClick={dailyAvgFocus}>{t("analytics.Analytics")}</h1>
                    <span className={`text-[12px]  ${IsLight ? 'text-[#8a877e]' : 'text-white'}`}>{getFormatedDate()}</span>
                </div>

                {/* Cards Tasks Completed, Focus Time, Current Streak, Daily Goal */}
                <div className="flex flex-wrap gap-3.5 mb-4">

                    <div className="bg-white grow shrink-0 md:flex-1 py-4 px-4.5 rounded-2xl border border-[#e8e6e0]">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[12px] mb-1.5 text-[#8a877e]">{t("analytics.Sessions Today")}</p>
                                <p className="text-[22px]">{sessionTask.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white grow shrink-0 md:flex-1 py-4 px-4.5 rounded-2xl border border-[#e8e6e0]">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[12px] mb-1.5 text-[#8a877e]">{t("analytics.Tasks Completed")}</p>
                                <p className="text-[22px]">{completedTasks}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white grow shrink-0 md:flex-1 py-4 px-4.5 rounded-2xl border border-[#e8e6e0]">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[12px] mb-1.5 text-[#8a877e]">{t("analytics.Current Streak")}</p>
                                <p className="text-[22px]">{t("analytics.Current Streak Result", { currentStreak: history7Days.currentStreak })}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white grow shrink-0 md:flex-1 py-4 px-4.5 rounded-2xl border border-[#e8e6e0]">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[12px] mb-1.5 text-[#8a877e]">{t("analytics.Avg Daily Focus")}</p>
                                <p className="text-[22px]">{t("analytics.Avg Daily Result", { hours: MinutsAndHours().hours, minutes: MinutsAndHours().minutes })}</p>
                            </div>
                        </div>
                    </div>

                </div>


                {/* charts */}

                {/* productivity chart  */}
                <div className='flex-1 bg-white p-5 rounded-2xl border border-[#e8e6e0] mb-5'>
                    <div className='flex justify-between mb-8'>
                        <p className='text-[14px] font-semibold text-[#211f1a]'>{t("analytics.Productivity header")} </p>
                        <span className='flex items-center gap-1 text-[12px] text-[#8a877e]'>{t("analytics.This Week")}
                        </span>
                    </div>
                    <div className='m-w-62.5 md:w-full'>
                        <LineChart width='100%' height={100} data={history7Days.historyList} className='m-auto'>
                            <Tooltip />
                            <Line dataKey='pct' stroke='#d98c2b' strokeWidth={2.5} type='monotone' />
                            <XAxis dataKey='weekday' axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600 }} />
                        </LineChart>
                    </div>
                </div>

                {/* daily charts  */}
                <div className='bg-white p-5 rounded-2xl border border-[#e8e6e0] mb-5 m-w-62.5 md:w-full'>
                    <div className='flex justify-between mb-8'>
                        <p className='text-[14px] font-semibold text-[#211f1a]'>{t("analytics.Tasks Completion Per Day Overview")} </p>
                        <span className='flex items-center gap-1 text-[12px] text-[#8a877e]'>{t("analytics.This Week")}
                        </span>
                    </div>
                    <AreaChart
                        width='100%'
                        height={200}
                        data={history7Days.historyList}

                    >
                        <CartesianGrid />
                        <XAxis dataKey="weekday" tick={{ fontSize: 11, fontWeight: 600 }} axisLine={true} tickLine={false} />
                        <YAxis dataKey='tasksProductivity' tick={{ fontSize: 11, fontWeight: 600 }} axisLine={true} tickLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="tasksProductivity" />
                    </AreaChart>
                </div>

                {/* category progress */}
                <div className='flex-1 bg-white p-5 rounded-2xl border border-[#e8e6e0]'>
                    <div className='flex justify-between mb-8'>
                        <p className='text-[14px] font-semibold text-[#211f1a]'>{t("analytics.Tasks By Category")} </p>
                    </div>

                    <div>
                        {getCategories().length == 0 ? (<p className='text-center text-[#8a877e] text-[13px]'>{t("analytics.No Data Available Message")}</p>) :

                            getCategories().map(([tag, iteration]) => (
                                (<div className='flex gap-3.5 items-center mb-3' key={1}>
                                    <div className='flex-1'>
                                        <div className='mb-1.5 flex justify-between items-center'>
                                            <span className='text-[13.5px] text-[#211f1a] font-medium capitalize'>{t(`categories.${tag}`)}</span>
                                            <span className='text-[12px] text-[#8a877e]'>{Math.floor((iteration / totalCategories() * 100))}%</span>
                                        </div>

                                        <div className='h-1.5 rounded-sm bg-[#eeece6]'>
                                            <div className={`h-full bg-[#00a63e] rounded-sm transition-all duration-650`} style={{ width: `${(iteration / totalCategories()) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>)
                            ))}
                    </div>
                </div>

            </div >
        </>
    )
}

