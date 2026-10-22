import { Plus, Filter } from 'lucide-react'
import { useRef, useState } from 'react'
// Components Used
import Cards from '../Tasks components/Cards'
import NoTasks from '../Tasks components/NoTasksExistsMessage'
import CreateTask from '../Tasks components/CreatedTask'
import TaskCategories from '../Tasks components/TaskCategories'
import TaskEmptyMessage from '../Tasks components/TaskEmptyMessage'
// State Using Zustand
import MyStore from '../GlobalSharedState'
// Functions Utilies
import { getFormatedDate, getFormatedTime, getFormatedDateForProductivity } from '../Utlies/UsedMehtods'
import { useTranslation } from 'react-i18next'



export default function Tasks() {
    // States and Refs
    const tasks = MyStore((state) => state.tasks)
    const setTasks = MyStore((state) => state.setTasks)
    const category = MyStore((state) => state.category);
    const OpenCloseCategory = MyStore((state) => state.OpenCloseCategory)
    const closeCategory = MyStore((state) => state.closeCategory)
    const selectedCategory = MyStore((state) => state.selectedCategory)
    const taskInputRef = useRef(null);
    const IsLight = MyStore((state) => state.IsLight)
    const [emptyMessage, setEmpty] = useState(false)

    const { t } = useTranslation()


    function insertNewTask() {
        let TaskContent: string = taskInputRef.current.value.trim();
        if (!TaskContent) {
            setEmpty(true)
            return;
        }
        const newTask: { id: string, task: string, tag: string, time: string, sessionDuration: number, date: string, day: string, checked: boolean, done: boolean } =
        {
            id: crypto.randomUUID(),
            task: TaskContent,
            tag: selectedCategory,
            time: getFormatedTime(),
            sessionDuration: 0,
            date: getFormatedDateForProductivity().NumberdDate,
            day: getFormatedDateForProductivity().day,
            checked: false,
            done: false
        }
        setEmpty(false)
        setTasks(newTask)
        closeCategory()
        taskInputRef.current.value = ''
    }

    const totalTasks: number = tasks.length

    const completedTasks: number = tasks.filter((t) => t.done === true).length

    let details = [
        { label: t("tasks.Total"), value: totalTasks },
        { label: t("tasks.Completed"), value: completedTasks },
        { label: t("tasks.Pending"), value: totalTasks - completedTasks }
    ];


    return (
        <>
            <div className='md:max-w-155'>
                {/* Tasks Header, Date, Completed sentence */}
                <div className={`flex mb-5 justify-between items-center`}>
                    <div>
                        <h1 className={`text-[26px] font-bold ${IsLight ? ' text-[#211f1a]' : ' text-white'} font-serif`}>{t("tasks.Tasks")}</h1>
                        <p className={`mt-1 ${IsLight ? 'text-[#8a877e]' : 'text-white'} text-[13px]`}>{t('tasks.Complete Sentence', { Completed: completedTasks, Total: totalTasks })}</p>
                    </div>
                    <span className={`${IsLight ? 'text-[#8a877e]' : 'text-white'} text-[13px]`}>{getFormatedDate()}</span>
                </div>

                {/* Tasks Three Cards, Total, Completed, Pending */}
                <Cards details={details} />

                {/* Tasks Input, AddButton, CategoryButton */}
                <div className="flex gap-2 mb-4" >
                    <input type="text" placeholder={t("tasks.Placeholder Message")}
                        className='flex-1 bg-white border-[#e8e6e0] border-solid border py-2.75 px-3.5 outline-none rounded-[10px] text-[13px]' ref={taskInputRef} />

                    <button className='bg-[#d98c2b] text-white px-4 rounded-[10px] cursor-pointer' onClick={insertNewTask} >
                        <Plus className='w-4 h-4' />
                    </button>

                    <button className='bg-white border-[#e8e6e0] border-solid border px-3.5 rounded-[10px] text-[#8a877e] cursor-pointer' onClick={OpenCloseCategory}>
                        <Filter className='w-4 h-4' />
                    </button>
                </div>

                {/* empty Message */}
                {emptyMessage && (<TaskEmptyMessage />)}

                {/* category page */}
                {category && (<TaskCategories />)}

                {/* Tasks Added */}
                <div className='bg-white p-1.5 border border-solid border-[#e8e6e0] rounded-2xl'>
                    {tasks.length === 0 ? (<NoTasks />) :
                        (tasks.map((task) => (
                            <CreateTask
                                key={task.id}
                                task={task}
                            />
                        )))}
                </div>
            </div>
        </>
    )
}
