import { useTranslation } from 'react-i18next'
export default function NoNotesMessage() {
    const { t } = useTranslation();
    return (
        <>
            <p className='bg-white p-7.5 text-center rounded-2xl text-[13px] text-[#8a877e] border border-solid border-[#e8e6e0]'>
                {t("notes.No Notes Message")}
            </p>
        </>
    )

}