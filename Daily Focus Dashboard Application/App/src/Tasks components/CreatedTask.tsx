import { X } from "lucide-react"
import MyStore from "../GlobalSharedState";
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next'

export default function CreateTask({ task }) {
    const { t } = useTranslation()
    const toggleId = MyStore((state) => state.toggleId);
    const deleteTask = MyStore((state) => state.deleteTask);
    const setSessionTask = MyStore((state) => state.setSessionTask);
    let nav = useNavigate();
    function redirect() {
        nav('/timer')
        setSessionTask(task)
    }

    return (
        <>
            <div className='flex gap-2.5 items-center p-2.5 border-t-current border-t border-none' key={task.id}>
                <input type='checkbox' className='w-3.75 h-3.75 accent-green-600 rounded-lg border border-solid border-[#d5d2c9] cursor-pointer' checked={task.checked} onChange={() => toggleId(task.id)} />
                <span className={`flex-1 text-[13px] capitalize ${task.done ? 'text-[#8a877e] line-through' : ''}`}>{task.task}</span>
                <span className='text-[10px] capitalize transition-transform hover:scale-105 font-semibold text-[#4f9970] bg-[#4f99701a] rounded-[20px] py-0.5 px-2 cursor-pointer' onClick={redirect
                }>{t("tasks.Open Session")}</span>
                <span className='text-[10px] font-semibold text-[#4f9970] bg-[#4f99701a] rounded-[20px] py-0.5 px-2'>{task.tag || t('tasks.Category Specification')}</span>
                <div className="flex flex-col">
                    <span className='text-[11px] w-15 text-center text-[#8a877e] capitalize'>{task.time}</span>
                    <span className='text-[9px] w-15 text-center text-[#8a877e] capitalize'>{task.date}</span>
                    <span className='text-[9px] w-15 text-center text-[#8a877e] capitalize'>{task.day}</span>
                </div>
                <button className='cursor-pointer text-[#8a877e]'>
                    <X className='w-3.5 h-3.5' onClick={() => deleteTask(task.id)} />
                </button>
            </div>
        </>
    )
}