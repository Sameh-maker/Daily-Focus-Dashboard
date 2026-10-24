import { NavLink, Outlet } from "react-router"
import { LayoutDashboard, ListTodo, Timer, Target, BarChart3, Settings, Focus, StickyNote, LogOut, Menu } from "lucide-react";
import { useTranslation } from 'react-i18next'

import MyStore from "../GlobalSharedState";
import { useState } from "react";
export default function SideBar() {
    const { t } = useTranslation()
    const IsLight = MyStore((state) => state.IsLight);
    const loginData = MyStore((state) => state.LoginData)
    const [OpenSideBar, SetOpenSideBar] = useState(false)

    function OpSideBar() {
        SetOpenSideBar(!OpenSideBar)
    }

    function ClSideBar() {
        SetOpenSideBar(false)
    }

    return (
        <>
            <div className={`relative md:flex flex-row h-full ${IsLight ? 'bg-[#f6f5f2]' : 'bg-[black]'}`}>

                <div className={`${OpenSideBar ? "flex" : "hidden"} ${document.documentElement.dir === 'rtl' ? "right-0" : "left-0"} absolute top-0 z-1 w-50 flex flex-col h-screen justify-between overflow-y-scroll scrollbar-none md:z-0 md:static md:flex ${IsLight ? 'bg-[#ffffff] text-[#8a877e]' : 'bg-black text-white'}`}>
                    {/* SideBar and Header styling */}
                    <nav className="flex flex-col py-5.5 px-3.5">
                        <div className={`flex gap-2 items-center mb-6.5 px-2 ${IsLight ? 'text-[#211f1a]' : 'text-white'}`}>
                            <Focus />
                            <span className="md:block text-[16px] font-bold">{t("navbar.Focus Flow")}</span>
                        </div>

                        <NavLink to='/' className={({ isActive }) => `flex gap-2.5 items-center py-2.25 px-3 mb-0.5 rounded-[9px] hover:text-[#d98c2b] 
                             hover:bg-[#faecd8] text-[13px] font-semibold transition-colors duration-200 ${isActive ? 'bg-[#faecd8] text-[#d98c2b]' : "bg-transparent"}`} onClick={ClSideBar}>
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="md:block justify-center">{t("navbar.Dashboard")}</span>
                        </NavLink>

                        <NavLink to='/tasks' className={({ isActive }) => `flex gap-2.5 items-center py-2.25 px-3 mb-0.5 rounded-[9px]  hover:text-[#d98c2b] 
                             hover:bg-[#faecd8] text-[13px] font-semibold transition-colors duration-200 ${isActive ? 'bg-[#faecd8] text-[#d98c2b]' : "bg-transparent"}`} onClick={ClSideBar}>
                            <ListTodo className="w-4 h-4" />
                            <span className="md:block">{t("navbar.Tasks")}</span>
                        </NavLink>

                        <NavLink to='/timer' className={({ isActive }) => `flex gap-2.5 items-center py-2.25 px-3 mb-0.5 rounded-[9px] hover:text-[#d98c2b] 
                             hover:bg-[#faecd8] text-[13px] font-semibold transition-colors duration-200 ${isActive ? 'bg-[#faecd8] text-[#d98c2b]' : "bg-transparent"}`} onClick={ClSideBar}>
                            <Timer className="w-4 h-4" />
                            <span className="md:block">{t("navbar.Focus Timer")}</span>
                        </NavLink>

                        <NavLink to='/goals' className={({ isActive }) => `flex gap-2.5 items-center py-2.25 px-3 mb-0.5 rounded-[9px] hover:text-[#d98c2b] 
                             hover:bg-[#faecd8] text-[13px] font-semibold transition-colors duration-200 ${isActive ? 'bg-[#faecd8] text-[#d98c2b]' : "bg-transparent"}`} onClick={ClSideBar}>
                            <Target className="w-4 h-4" />
                            <span className="md:block">{t('navbar.Goals')}</span>
                        </NavLink>

                        <NavLink to='/notes' className={({ isActive }) => `flex gap-2.5 items-center py-2.25 px-3 mb-0.5 rounded-[9px] hover:text-[#d98c2b] 
                             hover:bg-[#faecd8] text-[13px] font-semibold transition-colors duration-200 ${isActive ? 'bg-[#faecd8] text-[#d98c2b]' : "bg-transparent"}`} onClick={ClSideBar}>
                            <StickyNote className="w-4 h-4" />
                            <span className="md:block">{t("navbar.Notes")}</span>
                        </NavLink>

                        <NavLink to='/analytics' className={({ isActive }) => `flex gap-2.5 items-center py-2.25 px-3 mb-0.5 rounded-[9px] hover:text-[#d98c2b] 
                             hover:bg-[#faecd8] text-[13px] font-semibold transition-colors duration-200 ${isActive ? 'bg-[#faecd8] text-[#d98c2b]' : "bg-transparent"}`} onClick={ClSideBar}>
                            <BarChart3 className="w-4 h-4" />
                            <span className="md:block">{t("navbar.Analytics")}</span>
                        </NavLink>

                        <NavLink to='/settings' className={({ isActive }) => `flex gap-2.5 items-center py-2.25 px-3 mb-0.5 rounded-[9px] hover:text-[#d98c2b] 
                             hover:bg-[#faecd8] text-[13px] font-semibold transition-colors duration-200 ${isActive ? 'bg-[#faecd8] text-[#d98c2b]' : "bg-transparent"}`} onClick={ClSideBar}>
                            <Settings className="w-4 h-4" />
                            <span className="md:block">{t("navbar.Settings")}</span>
                        </NavLink>

                    </nav>

                    <div className={`flex items-center justify-start gap-2 bg-[#e6f2ea] py-2.25 px-3 round-[9px] cursor-pointer md:hidden`} onClick={ClSideBar} >
                        <button title="close sidebar">
                            <LogOut className="w-4.5 h-4.5" />
                        </button>
                        <span>{t("menu.Close")}</span>
                    </div>

                    {/* Account styling */}
                    <div className="flex py-2.5 px-2 gap-2 justify-center items-center border-t-2 border-[#e8e6e0]">
                        <div className={`w-7 h-7 rounded-[50%] ${IsLight ? 'bg-[#e6f2ea]' : 'bg-[#d96652]'} flex justify-center items-center`}>{loginData.user[0]}</div>
                        <div>
                            <p className={`text-[13px] ${IsLight ? 'text-[#211f1a]' : 'text-white'} `}>{loginData.user}</p>
                            <p className={`text-[10px]  ${IsLight ? 'text-[#8a877e]' : 'text-white'}`}>{loginData.gmail}</p>
                        </div>
                    </div>
                </div>

                {/* we make the Menu Button out of normal flow so we can add it in the main page  */}
                <button className={`${IsLight ? "text-black" : "text-white"} ${document.documentElement.dir === 'rtl' ? "left-5.5" : "right-5.5"} absolute top-6.5 cursor-pointer md:hidden`} onClick={OpSideBar}>
                    <Menu />
                </button>

                {/* other Components appears here */}
                <div className={`flex-1 pt-6.5 pb-7.5 px-5.5 max-h-screen overflow-y-scroll scrollbar-none`}>
                    <Outlet />
                </div>
            </div>

        </>
    )
}

