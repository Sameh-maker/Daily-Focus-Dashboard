import { Plus, Target, Trash2, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import Cards from '../Tasks components/Cards'
import CreateGoal from '../Goals components/CreatedGoal'

import MyStore from '../GlobalSharedState'

export default function Goals() {
    const { t } = useTranslation()
    const openGoalsPopup = MyStore((state) => state.openGoalsPopup)

    const openGoalsSection = MyStore((state) => state.openGoalsSection)

    const IsLight = MyStore((state) => state.IsLight)

    const goals = MyStore((state) => state.goals)

    const deleteGoal = MyStore((state) => state.deleteGoal)

    const increase = MyStore((state) => state.increase)

    const decrease = MyStore((state) => state.decrease)

    const completed: number = goals.filter((goal) => goal.current === goal.target).length

    const ActiveGoals: number = goals.length

    const PendingGoals = goals.filter((g) => g.current == 0).length


    const details = [
        { label: t("goals.Active Goals"), value: ActiveGoals },
        { label: t("goals.Completed"), value: completed },
        { label: t("goals.Pending"), value: PendingGoals }
    ]


    return (
        <>
            <div className='max-w-155'>
                {/* Goals Header, Sentence, Button*/}
                <div className="md:flex mb-5 justify-between items-center">
                    <div className='mb-6'>
                        <h1 className={`text-[26px] font-bold ${IsLight ? 'text-[#211f1a]' : 'text-white'} font-serif`}>{t("goals.Goals")}</h1>
                        <p className={`mt-1 ${IsLight ? 'text-[#8a877e]' : 'text-white'} text-[13px]`}>{t("goals.Complete Sentence", { goalsCompleted: completed, ActiveGoals: ActiveGoals })}</p>
                    </div>
                    <button className='flex items-center gap-1.5 text-[13px] py-2.25 px-4 bg-[#d98c2b] rounded-[10px] text-white cursor-pointer' onClick={openGoalsPopup}>
                        <Plus className='w-3.75 h-3.75' />
                        <span>{t("goals.New Goal")}</span>
                    </button>
                </div>

                {/* Goals Three Cards, Completed, Streak, Active */}
                <Cards details={details} />

                {/* Goals Add Goal Component */}
                {openGoalsSection && (<CreateGoal />)}

                {/* Goals */}
                <div>
                    {goals.length === 0 ? (<p className="bg-white p-7.5 text-center rounded-2xl text-[13px] text-[#8a877e] border border-solid border-[#e8e6e0]">{t("goals.No Goals Message")}</p>) : (
                        goals.map((goal) => (
                            <div className='bg-white border border-solid border-[#e8e6e0] rounded-2xl py-4 px-4.5 mb-4' key={goal.id}>
                                <div className='flex gap-3.5 items-center'>
                                    <div className='w-9.5 h-9.5 bg-[#e6f2ea] text-[#4f9970] rounded-[10px] flex justify-center items-center'>
                                        <Target className='w-3.5 h-3.5' />
                                    </div>

                                    <div className='flex-1'>
                                        <div className='mb-1.5 flex justify-between items-center'>
                                            <span className='text-[13.5px] text-[#211f1a] font-medium capitalize'>{goal.name}</span>
                                            <span className='text-[12px] text-[#8a877e]'>{`${goal.current}/${goal.target}`}</span>
                                        </div>

                                        <div className='h-1.5 rounded-sm bg-[#eeece6]'>
                                            <div className={`h-full bg-[#00a63e] rounded-sm transition-all duration-650`} style={{ width: `${goal.current > 0 ? (goal.current / goal.target) * 100 : 0}%` }}></div>
                                        </div>
                                    </div>

                                    {goal.current === goal.target ? (<Check className='w-4.5 h-4.5 text-[#4f9970]' />) : (
                                        <div className='flex gap-1.5'>
                                            <button className='w-6 h-6 bg-white border-solid border border-[#e8e6e0] rounded-md cursor-pointer text-[#8a877e]' onClick={() => decrease(goal.id)}> - </button>
                                            <button className='w-6 h-6 bg-white border-solid border border-[#e8e6e0] rounded-md cursor-pointer text-[#8a877e]' onClick={() => increase(goal.id)}> + </button>
                                        </div>
                                    )}

                                    <button className=' p-0.5 text-[#8a877e] cursor-pointer'>
                                        <Trash2 className='w-3.75 h-3.75' onClick={() => deleteGoal(goal.id)} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </>
    )
}