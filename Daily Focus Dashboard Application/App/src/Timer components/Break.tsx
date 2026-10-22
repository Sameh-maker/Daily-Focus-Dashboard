import { useTranslation } from 'react-i18next'
export default function Break() {
    const { t } = useTranslation()
    return (
        <>
            <p className='text-xs mt-1 text-[#8a877e] capitalize'>{t("focus timer.Short Break")}</p>
        </>
    )
}