import MyStore from '../GlobalSharedState';
import { useTranslation } from 'react-i18next'


export default function DarkLightMode() {
    const { t } = useTranslation()
    const IsLight = MyStore((state) => state.IsLight);
    const changeToDarkMode = MyStore((state) => state.changeToDarkMode)
    return (
        <>
            <div >
                <p className="ml-0.5 mb-2 text-[12px] text-[#8a877e] tracking-[0.4px]">{t("settings.Apperance")}</p>
                <div className="bg-white border border-solid border-[#e8e6e0] rounded-2xl p-5 mb-4">
                    <div className="flex justify-between items-center py-1 px-4 border-b border-solid border-[#e8e6e0]">
                        <div>
                            <p className="text-[14px] text-[#211f1a]">{t("settings.Dark Mode")}</p>
                            <p className="mt-0.5 text-[12px] text-[#8a877e]">{t("settings.Dark Mode Message")}</p>
                        </div>
                        <div className={`w-10 h-5.5 ${IsLight ? 'bg-[#eeece6]' : 'bg-[#d96652]'} rounded-[11px] relative cursor-pointer`} onClick={changeToDarkMode}>
                            <div className={`w-4.5 h-4.5 bg-white rounded-[50%] absolute top-0.5 transition-normal duration-300 ${IsLight ? 'left-0.5' : 'left-5'}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}