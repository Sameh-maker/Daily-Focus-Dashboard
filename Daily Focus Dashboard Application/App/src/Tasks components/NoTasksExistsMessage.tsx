import { useTranslation } from 'react-i18next'
export default function NoTasks() {
    const { t } = useTranslation()
    return <p className="text-center capitalize text-[#8a877e] p-1 text-[13px]">{t("tasks.No Tasks Message")}</p>
}