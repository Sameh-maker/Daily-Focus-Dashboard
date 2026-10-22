import { useTranslation } from 'react-i18next';

export function getFormatedTime() {
    // i wrote the Logic for arabic date because it is hard to transfrom an english time into arabic and there are lots of bugs
    const time = new Date().toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit'
    });
    if (document.documentElement.dir === 'rtl') {
        if (time.includes('AM')) {
            return time.slice(0, time.indexOf('A')) + 'ص'
        }
        return time.slice(0, time.indexOf('P')) + 'م'
    }
    return time
}

export function getFormatedDate() {
    const { i18n } = useTranslation()
    return new Date().toLocaleDateString(i18n.language, {
        weekday: 'long',
        month: 'long',
        day: "numeric",
    })
}

export function getFormatedDateForProductivity() {
    let date = new Date();
    const NumberdDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

    return {
        NumberdDate: NumberdDate,
        day: weekday
    }
}

export function getFormatedNoteDate() {
    return new Date().toLocaleDateString([], {
        month: 'long',
        day: 'numeric',
    })
}

