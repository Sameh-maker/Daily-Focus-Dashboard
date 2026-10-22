import { ArrowRight, Check } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import MyStore from '../GlobalSharedState';
import confetti from 'canvas-confetti';

export default function Login({ handle }) {
    const [state, setState] = useState(false)
    const loginData = MyStore((state) => state.LoginData)
    const setLoginData = MyStore((state) => state.setLoginData)
    const [emptyInputMessage, setEmptyInputMessage] = useState(false)

    const userNameRef = useRef(null)
    const userGmailRef = useRef(null)

    const nav = useNavigate()

    function submitData() {
        const userName = userNameRef.current.value.trim()
        const userGmail = userGmailRef.current.value.trim()

        if (!userName || !userGmail) {
            setEmptyInputMessage(true)
            return;
        }

        setEmptyInputMessage(false)

        const data = {
            user: userName[0].toUpperCase() + userName.slice(1),
            gmail: userGmail
        }

        setLoginData(data)

        confetti()

        localStorage.setItem('LogginToken', 'true');

        setState(true)

        setTimeout(() => {
            handle(true)

            nav('/', { replace: true })
        }, 7000)
    }

    return (
        <>
            <div className="h-screen bg-[#f6f5f2] flex justify-center items-center">
                {state === false ? (
                    <div className="bg-white w-100 py-10 px-9 rounded-[20px]">
                        <h1 className="text-center text-2xl font-bold mb-1.5 text-[#211f1a]">Welcome to DailyFocus</h1>
                        <p className="text-center text-[13px] text-[#8a877e] mb-7">Let's set up your space — takes 10 seconds.</p>
                        <div className="flex flex-col mb-3.5">
                            <label className="mb-1.5 text-[11px] text-[#8a877e]">Your name</label>
                            <input type='text' placeholder="e.g. Cap" className={`w-full bg-[#f6f5f2] py-2.75 pr-3.5 pl-2 border ${emptyInputMessage ? 'border-[red]' : 'border-[#e8e6e0]'} outline-none text-[13px] rounded-[10px]`} ref={userNameRef} />
                        </div>
                        <div className="flex flex-col mb-6.5">
                            <label className="mb-1.5 text-[11px] text-[#8a877e]">Gmail address</label>
                            <input type='email' placeholder="e.g. you@gmail.com" className={`w-full bg-[#f6f5f2] py-2.75 pr-3.5 pl-2 border ${emptyInputMessage ? 'border-[red]' : 'border-[#e8e6e0]'} outline-none text-[13px] rounded-[10px]`} ref={userGmailRef} />
                        </div>
                        <button className='flex justify-center items-center gap-2 bg-[#d98c2b] w-full text-white text-[14px] font-semibold cursor-pointer py-3.25 rounded-[11px] border[1px] border-current' onClick={submitData}>
                            Get started
                            <ArrowRight className='w-4 h-4' />
                        </button>
                        <p className='mt-4 text-[11px] text-[#8a877e] text-center'>No account, no password — this just personalizes your
                            dashboard, stored on this device only.
                        </p>
                    </div>
                ) : (
                    <div className='bg-white w-100 py-10 px-9 rounded-[20px]'>
                        <div className='flex flex-col items-center'>
                            <span className='p-1.5 bg-[#e6f2ea] rounded-full w-20 h-20 flex items-center justify-center mb-5'>
                                <Check className='w-12.5 h-12.5 text-[green]' />
                            </span>
                            <p className='text-[#211f1a] text-[22px] font-bold mb-2'>You're all set, {loginData.user} 👋</p>
                            <p className='text-[13px] text-[#8a877e] mb-1.5 animate-pulse'>Taking you to your dashboard...</p>
                            <q className='text-[13px] text-center'>
                                The secret of getting ahead is getting started.
                            </q>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

// The secret of getting ahead is getting started.