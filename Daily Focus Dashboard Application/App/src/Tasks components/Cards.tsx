export default function Cards({ details }) {
    return (
        <>
            <div className="flex flex-wrap gap-3.5 mb-5">
                <div className="bg-white flex-1 py-3.5 px-4.5 rounded-2xl border border-[#e8e6e0]">
                    <p className="text-[12px] text-[#8a877e] capitalize mb-1.5">{details[0].label}</p>
                    <p className="text-[20px] text-[#211f1a]">{details[0].value}</p>
                </div>
                <div className="bg-white flex-1 py-3.5 px-4.5 rounded-2xl border border-[#e8e6e0]">
                    <p className="text-[12px] text-[#8a877e] capitalize mb-1.5">{details[1].label}</p>
                    <p className="text-[20px] text-[#211f1a]">{details[1].value}</p>
                </div>
                <div className="bg-white flex-1 py-3.5 px-4.5 rounded-2xl border border-[#e8e6e0]">
                    <p className="text-[12px] text-[#8a877e] capitalize mb-1.5">{details[2].label}</p>
                    <p className="text-[20px] text-[#211f1a]">{details[2].value}</p>
                </div>
            </div>
        </>
    )
}