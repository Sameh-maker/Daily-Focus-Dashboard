import { X } from 'lucide-react'
import MyStore from '../GlobalSharedState';
import { useTranslation } from 'react-i18next'
const Categories = ['Personal', 'Health', 'Work', 'Learning', 'Workout', 'Other'];
export default function TaskCategories() {
    const { t } = useTranslation()
    const closeCategory = MyStore((state) => state.closeCategory)
    const setSelectedCategory = MyStore((state) => state.setSelectedCategory)

    return (
        <>
            <div className='bg-white p-5 mb-4 border border-solid border-[#e8e6e0] rounded-2xl flex flex-col gap-2.5'>
                <div className='flex justify-between items-center mb-1.5'>
                    <label className='text-[11px] text-[#8a877e]'>{t("tasks.Category")}</label>
                    <X className='w-4 h-4 cursor-pointer text-[#8a877e]' onClick={closeCategory} />
                </div>
                <select className='flex-1 text-[13px] outline-none bg-[#f6f5f2] py-2.25 px-3 rounded-lg border-[#e8e6e0]' onChange={(e) => setSelectedCategory(e.target.value)}>
                    {
                        Categories.map((cat, index) => (
                            <option key={index} value={t(`categories.${cat}`)}>{t(`categories.${cat}`)}</option>
                        ))
                    }
                </select>
            </div >
        </>
    )
}