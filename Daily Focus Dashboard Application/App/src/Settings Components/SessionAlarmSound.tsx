import MyStore from '../GlobalSharedState';
import { useTranslation } from 'react-i18next'


export default function SessionAlarmSound() {
    const { t } = useTranslation()
    const IsAlarm = MyStore((state) => state.IsAlarm)
    const setAlarm = MyStore((state) => state.setAlarm)

    return (
        <>
            <div className="py-4 px-1 flex items-center justify-between border-b border-solid border-[#e8e6e0]">
                <div>
                    <p className="text-[14px] text-[#211f1a]">{t("settings.Sound On Session End")}</p>
                    <p className="text-[12px] mt-0.5 text-[#8a877e]">{t("settings.Sound On Session End Message")}</p>
                </div>
                <div className={`w-10 h-5.5 rounded-[11px] relative cursor-pointer ${IsAlarm ? 'bg-[#d96652]' : 'bg-[#eeece6]'}`} onClick={setAlarm}>
                    <div className={`w-4.5 h-4.5 bg-white rounded-[50%] absolute transition-normal duration-300 top-0.5 ${IsAlarm ? 'left-5' : 'left-0.5'}`}></div>
                </div>
            </div>
        </>
    )
}