import { Pause, RotateCcw, Play, Flame, X } from 'lucide-react'
// Components
import Cards from '../Tasks components/Cards';
import Break from '../Timer components/Break';
import BreakDuration from '../Timer components/BreakDuration';
import { useEffect, useState } from 'react';
// Functions Utilies
import { getFormatedDate } from '../Utlies/UsedMehtods'
// Mystore
import MyStore from '../GlobalSharedState';
import alarmSound from '../Projects Assets/mixkit-alarm-clock-beep-988.wav'
import { useTranslation } from 'react-i18next'


// returns Minuts and Seconds for Timer
function FomratedMinutsAndSeconds(totalSeconds: number) {
    const Minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
    const Seconds = String(totalSeconds % 60).padStart(2, '0')
    return { Minutes: Minutes, Seconds: Seconds }
}

export default function Timer() {
    const { t } = useTranslation()
    const IsPaused = MyStore((state) => state.IsPaused);
    const setPause = MyStore((state) => state.setPause);
    const IsBreak = MyStore((state) => state.IsBreak);
    const RunBreakButton = MyStore((state) => state.RunBreakButton);
    const RunWorkButton = MyStore((state) => state.RunWorkButton);
    const IsLight = MyStore((state) => state.IsLight);
    const sessionTask = MyStore((state) => state.sessionTask)
    const timeObject = MyStore((state) => state.timeObject);
    const IsAlarm = MyStore((state) => state.IsAlarm);
    const deleteSessionRecorded = MyStore((state) => state.deleteSessionRecorded)
    const togglePlayPause = MyStore((state) => state.togglePlayPause)



    // Timer Details
    let workDuration = (timeObject.focusTime || 25) * 60
    let breakDuration = (timeObject.breakTime || 15) * 60;
    let [workTimer, setWorkTimer] = useState(workDuration);
    let [breakTimer, setBreakTimer] = useState(breakDuration);

    const ActiveTimer = IsBreak ? breakTimer : workTimer
    // const ActiveDuration = IsBreak ? breakDuration : workDuration


    useEffect(() => {
        if (IsPaused || ActiveTimer <= 0) return;
        const intervalId = setInterval(() => {
            if (IsBreak) {
                setBreakTimer((prevTimer) => prevTimer - 1)
            } else {
                setWorkTimer((prevTimer) => prevTimer - 1)
            }
        }, 1000)
        return () => clearInterval(intervalId)

    }, [ActiveTimer, IsPaused, IsBreak])


    useEffect(() => {
        if (workTimer === 0) {
            if (IsAlarm) {
                alarm().play()
            }
        }
    }, [workTimer])


    // Resets Timer
    const resetTimer = () => {
        setPause()
        if (IsBreak) {
            setBreakTimer(breakDuration)
        } else {
            setWorkTimer(workDuration)
        }
    }

    function alarm() {
        return new Audio(alarmSound)
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
    const { Minutes, Seconds } = FomratedMinutsAndSeconds(ActiveTimer);

    const currentStreak = sessionTask.filter((t) => t).length

    // Array Of data Props
    const details = [
        { label: t("focus timer.Sessions Today"), value: sessionTask.length },
        { label: t("focus timer.Focus Time"), value: t("focus timer.Focus Time Result", { hours: MinutsAndHours().hours, minutes: MinutsAndHours().minutes }) },
        { label: t("focus timer.Started"), value: currentStreak }
    ];


    // Ring Timer SetUp
    const Ring = () => {
        const r = 105;
        const circumference = 2 * Math.PI * r;
        const ratio = IsBreak ? (breakTimer / breakDuration) : (workTimer / workDuration)
        const offset = circumference * (1 - ratio);
        return { r: r, offset: offset, circumference: circumference }
    }

    const { r, offset, circumference } = Ring();

    return (
        <>
            <div className='max-w-155'>
                {/* Focus Timer Header, Date and Sentence */}
                <div className="flex mb-5 justify-between items-center">
                    <div>
                        <h1 className={`text-[26px] font-bold font-serif ${IsLight ? ' text-[#211f1a]' : ' text-white'}`} onClick={getTime}>{t("focus timer.Focus Timer")}</h1>
                        <p className={`mt-1 text-[13px] capitalize ${IsLight ? 'text-[#8a877e]' : 'text-white'}`}> {t("focus timer.Complete Sentence", { SessionsCompleted: sessionTask.length })}</p>
                    </div>
                    <span className={`capitalize text-[13px] ${IsLight ? 'text-[#8a877e]' : 'text-white'}`}>{getFormatedDate()}</span>
                </div>

                {/* Focus Timer Cards */}
                <Cards details={details} />

                {/* Focus Timer Ring, Start, Restart Buttons, Toggle */}
                <div className='bg-white rounded-2xl border border-solid border-[#e8e6e0] p-6 mb-4 flex flex-col items-center'>
                    <div className='flex gap-1.5 mb-6 p-1 rounded-[10px] bg-[#f6f5f2 border border-solid border-[#e8e6e0]'>
                        <button className={`bg-[#d98c2b] py-2 px-5 rounded-lg text-[13px] font-semibold ${IsBreak ? 'bg-transparent text-[#8a877e]' : 'text-white'}  border-current cursor-pointer`} onClick={RunWorkButton} >{t("focus timer.Work")}</button>
                        <button className={`py-2 px-5 rounded-lg text-[13px] font-semibold text-[#8a877e] border-current cursor-pointer ${IsBreak ? 'bg-[#d96652] text-white' : ''}`} onClick={RunBreakButton}>{t("focus timer.Break")}</button>
                    </div>

                    <div className='w-55 h-55 relative'>
                        <svg className='w-full h-full -rotate-90'>
                            <circle cx={110} cy={110} r={105} stroke='#eeece6' strokeWidth={9} fill='none'></circle>
                            <circle cx={110} cy={110} r={r} stroke={IsBreak ? '#d96652' : '#d98c2b'} strokeWidth={9} fill='none'
                                strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap='round'>
                            </circle>
                        </svg>
                        <div className='w-full h-full absolute inset-0 flex flex-col justify-center items-center'>
                            {IsBreak ? (<BreakDuration Minuts={Minutes} Seconds={Seconds} />) : (<p className='text-[44px] font-semibold text-[#211f1a]'>{Minutes}:{Seconds}</p>)}
                            {IsBreak ? (<Break />) : (<p className='text-xs mt-1 text-[#8a877e] capitalize'>{t("focus timer.Session Focus")}</p>)}
                        </div>
                    </div>

                    <div className='mt-6.5 flex gap-3.5'>
                        <button className={`w-12.5 h-12.5 ${IsBreak ? 'bg-[#d96652]' : 'bg-[#d98c2b]'} rounded-[50%] flex justify-center items-center border-current cursor-pointer`} onClick={togglePlayPause} >
                            {IsPaused || workTimer == 0 || breakTimer == 0 ? (<Pause className='w-4.75 h-4.75 text-white' />) : <Play className='w-4.75 h-4.75 text-white' />}
                        </button>
                        <button className={`w-12.5 h-12.5 bg-transparent rounded-[50%] border border-solid border-[#e8e6e0] flex justify-center items-center cursor-pointe `} onClick={resetTimer}>
                            <RotateCcw className='w-4.25 h-4.25' />
                        </button>
                    </div>
                </div>

                {/* Focus Timer sessions recorded */}
                <div className='p-5 bg-white border-solid border border-[#e8e6e0] rounded-2xl'>
                    {/* recent session header */}
                    <div className='flex gap-2 items-center mb-3.5'>
                        <Flame className='w-3.5 h-3.5 text-[#d98c2b]' />
                        <span className='text-[13px]'>{t("focus timer.Recent Sessions")}</span>
                    </div>
                    {sessionTask.length == 0 ? (
                        <p className='text-center text-[#8a877e] capitalize text-[13px]'>{t("focus timer.No Recent Sessions Recorded")}</p>
                    ) : (
                        sessionTask.map((session) => (
                            <div className='flex justify-between items-center capitalize p-2' key={session.id}>
                                <p className='text-[13px]'>{session.task}</p>
                                <div className='flex gap-3'>
                                    <span className='text-[11px] text-[#8a877e]'>{t("focus timer.Session Started", { time: session.time })}</span>
                                    <span className='text-[11px] text-[#8a877e]'>{t("focus timer.Minutes", { minutes: session.sessionDuration })}</span>
                                    {/* <span className='text-[11px] text-[#8a877e]'>{session.sessionDuration} min</span> */}
                                    <span className='text-[11px] text-[#8a877e] cursor-pointer' onClick={() => deleteSessionRecorded(session.id)}>
                                        <X className='w-3.5 h-3.5' />
                                    </span>
                                </div>
                            </div>
                        ))
                    )}

                </div>
            </div>
        </>
    )
}

