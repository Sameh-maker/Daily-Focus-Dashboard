import { useTranslation } from 'react-i18next'

function TaskEmptyMessage() {
    const { t } = useTranslation();
    return (
        <p className="text-[red] text-[13px] ml-1">{t("tasks.Empty Message")}</p>
    )
}

export default TaskEmptyMessage