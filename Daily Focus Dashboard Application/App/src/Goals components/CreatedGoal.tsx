import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import MyStore from '../GlobalSharedState'
import { getFormatedDateForProductivity } from '../Utlies/UsedMehtods'

export default function CreateGoal() {
    const { t } = useTranslation()
    const goalRef = useRef(null)
    const trackRef = useRef(null)
    const targetRef = useRef(null)

    const onAddGoal = MyStore((state) => state.onAddGoal)

    const closeGoalsPopUp = MyStore((state) => state.closeGoalsPopup)

    function creatGoal() {
        let goalValue = goalRef.current.value.trim()
        let trackByValue = trackRef.current.value.trim()
        let targetValue = targetRef.current.value.trim()
        if (!goalValue || !trackByValue || !targetValue) {
            return;
        }

        const goalDetailsObject = {
            id: crypto.randomUUID(),
            current: 0,
            name: goalValue,
            track: trackByValue,
            target: Number(Math.abs(targetValue)) || 1,
            date: getFormatedDateForProductivity().NumberdDate
        }
        onAddGoal(goalDetailsObject)

        goalRef.current.value = ''
        trackRef.current.value = ''
        targetRef.current.value = ''
    }

    return (
        <>

            <div className="bg-white border border-solid border-[#e8e6e0] rounded-2xl p-5 mb-4">
                <div className='flex justify-between items-center mb-3.5'>
                    <p className='text-[13px]'>{t("goals.New Goal Label")}</p>
                    <button onClick={closeGoalsPopUp}>
                        <X className='w-4 h-4 text-[#8a877e] cursor-pointer' />
                    </button>
                </div>

                <div className='mb-3'>
                    <label className='text-[11px] mb-1.25 block text-[#8a877e]'>{t("goals.Goal Name")}</label>
                    <input type="text" placeholder={t("goals.Goal Name Placeholder")} className="bg-[#f6f5f2] w-full border border-solid border-[#e8e6e0] text-[13px] text-[#211f1a] py-2.25 px-3 rounded-lg outline-none" ref={goalRef} />
                </div>

                <div className='flex flex-col mb-4 md:flex gap-2.5 md:flex-row'>
                    <div className='flex-1'>
                        <label className='text-[11px] mb-1.25 block text-[#8a877e]'>{t("goals.Track By")}</label>
                        <select className="bg-[#f6f5f2] w-full border border-solid border-[#e8e6e0] text-[13px] text-[#211f1a] py-2.25 px-3 rounded-lg outline-none" ref={trackRef}>
                            <option value="count">{t("goals.Count") + " " + t("goals.Count Placholder")}</option>
                            <option value="time">{t("goals.Time") + " " + t("goals.Time Placholder")}</option>
                        </select>
                    </div>

                    <div className='flex-1'>
                        <label className='text-[11px] mb-1.25 block text-[#8a877e]'>{t("goals.Target")}</label>
                        <input type='number' min={1} placeholder={t("goals.Target Placholder")} className="bg-[#f6f5f2] w-full border border-solid border-[#e8e6e0] text-[13px] text-[#211f1a] py-2.25 px-3 rounded-lg outline-none" ref={targetRef} />
                    </div>
                </div>

                <button className={`text-[13px] border-[#e8e6e0] w-full py-2.5 rounded-[9px] font-semibold text-white cursor-pointer bg-[#d98c2b]`} onClick={creatGoal}>{t("goals.Add Goal")}</button>
            </div>
        </>
    )
}