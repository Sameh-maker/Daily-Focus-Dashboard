import { Trash2, Check } from 'lucide-react'
import MyStore from '../GlobalSharedState';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import DarkLightMode from '../Settings Components/DarkLightMode';
import SessionAlarmSound from '../Settings Components/SessionAlarmSound';

export default function Settings() {
    const { t } = useTranslation()
    const { i18n } = useTranslation();

    const [WarningMessage, setWarningMessage] = useState(false);
    const [confirmedDelete, setConfirmedDelete] = useState(false);


    // const [IsArabic, setIsArabic] = useState(false);
    const IsArabic = MyStore((state) => state.IsArabic)
    const setIsArabic = MyStore((state) => state.setIsArabic);


    const timeObject = MyStore((state) => state.timeObject);
    const setTimeObject = MyStore((state) => state.setTimeObject)

    const IsLight = MyStore((state) => state.IsLight)

    const clearAllTasks = MyStore((state) => state.clearAllTasks)
    const clearAllSessionsRecorded = MyStore((state) => state.clearAllSessionsRecorded)
    const clearAllGoals = MyStore((state) => state.clearAllGoals)
    const clearAllNotes = MyStore((state) => state.clearAllNotes)


    const loginData = MyStore((state) => state.LoginData)


    function handleChange(e) {
        const { name, value } = e.target;
        setTimeObject(name, value)
    }

    function openClearDataPopup() {
        setWarningMessage(true)
    }

    function clearAlData() {
        clearAllTasks()
        clearAllSessionsRecorded()
        clearAllGoals()
        clearAllNotes()
        setConfirmedDelete(true)
    }


    const toggleLanguage = () => {
        setIsArabic(!IsArabic)
        const currentLang = i18n.language;
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLang)
    };

    return (
        <>
            <div className={`max-w-140`}>
                <h1 className={`mb-5 text-[26px] font-serif font-bold ${IsLight ? 'text-[#211f1a]' : 'text-white'}`}>{t("settings.Settings")}</h1>

                {/* Account Settings  */}
                <div className='flex bg-white border border-solid border-[#e8e6e0] rounded-2xl p-5 mb-4 justify-between items-center'>
                    <div className="bg-white flex gap-3.5 items-center">
                        <div className={`w-11.5 h-11.5 rounded-[50%] ${IsLight ? 'bg-[#e6f2ea]' : 'bg-[#d96652] text-white'} flex justify-center items-center`}>{loginData.user[0]}</div>
                        <div>
                            <p className="text-[14px] text-[#211f1a]">{loginData.user}</p>
                            <p className="text-[12px] text-[#8a877e]">{loginData.gmail}</p>
                        </div>
                    </div>
                </div>

                {/* Settings Dark Mode switch */}
                <DarkLightMode />

                {/* Language */}
                <div >
                    <p className="ml-0.5 mb-2 uppercase text-[12px] text-[#8a877e] tracking-[0.4px]">{t("settings.Language")}</p>
                    <div className="bg-white border border-solid border-[#e8e6e0] rounded-2xl p-5 mb-4">
                        <div className="flex justify-between items-center py-1 px-4 border-b border-solid border-[#e8e6e0]">
                            <div>
                                <p className="text-[14px] text-[#211f1a]">{t("settings.Change to Arabic")}</p>
                                <p className="mt-0.5 text-[12px] text-[#8a877e]">{t("settings.Arabic Change Message")}</p>
                            </div>
                            <div className={`w-10 h-5.5 ${IsArabic != true ? 'bg-[#eeece6]' : 'bg-[#d96652]'} rounded-[11px] relative cursor-pointer`} onClick={toggleLanguage}>
                                <div className={`w-4.5 h-4.5 bg-white rounded-[50%] absolute top-0.5 transition-normal duration-300 ${IsArabic != true ? 'left-0.5' : 'left-5'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Focus Timer  */}
                <div>
                    <p className="ml-0.5 mb-2 uppercase text-[12px] text-[#8a877e] tracking-[0.4px]">{t("settings.Focus Timer")}</p>
                    <div className="bg-white border border-solid border-[#e8e6e0] rounded-2xl p-5 mb-4">

                        {/* Settings Focus Timer Inputs focus, break */}
                        <div className="flex flex-col mb-4 md:flex gap-3 md:flex-row">
                            <div className="flex flex-col flex-1">
                                <label className="text-[12px] mb-1.5 text-[#8a877e]">{t("settings.Focus")}</label>
                                <input type="number" min={0} step={5} name='focusTime' value={timeObject.focusTime} className="bg-[#f6f5f2] border border-solid border-[#e8e6e0] text-[14px] py-2.5 px-3.5 rounded-lg outline-none" onChange={handleChange} />
                            </div>

                            <div className="flex flex-col flex-1">
                                <label className="text-[12px] mb-1.5 text-[#8a877e]">{t("settings.Break")}</label>
                                <input type="number" min={0} max={60} step={5} name='breakTime' value={timeObject.breakTime} className="bg-[#f6f5f2] border border-solid border-[#e8e6e0] text-[14px] py-2.5 px-3.5 rounded-lg outline-none" onChange={handleChange} />
                            </div>
                        </div>

                        <p className="text-[12px] mb-1.5 text-[#8a877e]">{t("settings.Focus Timer Message")}</p>

                        {/* Settings Focus Timer Sound */}
                        <SessionAlarmSound />
                    </div>
                </div>

                {/* Settings data Remove */}
                <div>
                    <p className='ml-0.5 mb-2 text-[12px] text-[#d96652] tracking-[0.4px]'>{t("settings.Danger Zone")}</p>
                    <div className="bg-white border border-solid border-[#e8e6e0] rounded-2xl p-5 mb-4">
                        <div className='flex justify-between items-center'>
                            <div>
                                <p className='text-[13px] text-[#211f1a]'>{t("settings.Clear")}</p>
                                <p className='mt-0.5 text-[12px] text-[#8a877e]'>{t("settings.Clear Message")}</p>
                            </div>
                            <button className='flex items-center gap-1.5 text-[#d96652] text-[12px] py-2 px-3.5 bg-[#fbe9e5] rounded-[9px] cursor-pointer' onClick={openClearDataPopup}>
                                <Trash2 className='w-3.5 h-3.5' />
                                <span>{t("settings.Clear Data")}</span>
                            </button>
                        </div>

                    </div>
                    {WarningMessage && (
                        <div className='bg-white p-5 rounded-2xl border-[#e8e6e0]'>
                            {!confirmedDelete ? (
                                <div>
                                    <p className=' capitalize text-[13px] text-center'>{t("settings.Clear Confirmation")}</p>
                                    <div className='flex justify-between w-[50%] mt-2.5 mx-auto'>
                                        <button className='bg-[#fbe9e5] text-[#d96652] text-[13px] py-1.5 px-3.5 rounded-[9px] cursor-pointer' onClick={clearAlData}>{t("settings.Delete")}</button>
                                        <button className='bg-[#e6f2ea] text-[13px] py-1.5 px-3.5 rounded-[9px] cursor-pointer' onClick={() => setWarningMessage(false)}>{t("settings.Cancel")}</button>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex gap-2 items-center justify-center' >
                                    <p className='text-[13px] text-[green]'>{t("settings.Deletion Success")}</p>
                                    <span className='p-1.5 bg-[#e6f2ea] rounded-full'>
                                        <Check className='w-4.5 h-4.5 text-[#4f9970]' />
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
