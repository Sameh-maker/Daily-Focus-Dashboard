import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getFormatedNoteDate } from '../Utlies/UsedMehtods'
import { useRef } from 'react'
import MyStore from '../GlobalSharedState'

export default function AddingNotesPopUp() {
    const { t } = useTranslation();
    const NoteTitleRef = useRef(null)
    const NoteContentRef = useRef(null)
    const closingNotesAddingPopUp = MyStore((state) => state.closingNotesAddingPopUp)
    const setNotes = MyStore((state) => state.setNotes)

    // Function Adding Notes
    function AddingNewNote() {
        const Title = NoteTitleRef.current.value.trim();
        const Content = NoteContentRef.current.value.trim();
        if (!Content || !Title) return;
        const note = { NoteId: crypto.randomUUID(), NoteTitle: Title, NoteContent: Content, IsPinned: false, NoteDate: getFormatedNoteDate() };
        setNotes(note)
        NoteTitleRef.current.value = ''
        NoteContentRef.current.value = ''
    }
    return (
        <>
            <div className="bg-white border border-solid border-[#e8e6e0] rounded-2xl p-5 mb-4">
                <div className='flex justify-between items-center mb-3.5'>
                    <p className='text-[13px]'>{t("notes.New Note Label")}</p>
                    <button>
                        <X className='w-4 h-4 text-[#8a877e] cursor-pointer' onClick={closingNotesAddingPopUp} />
                    </button>
                </div>
                <div className='mb-3'>
                    <input type="text" placeholder={t('notes.Title Placholder')} className="mb-2 bg-[#f6f5f2] w-full border border-solid border-[#e8e6e0] text-[14px] font-semibold text-[#211f1a] py-2.25 px-3 rounded-lg outline-none" ref={NoteTitleRef} />
                    <textarea placeholder={t("notes.Write Something Placholder")} className="bg-[#f6f5f2] w-full border border-solid border-[#e8e6e0] text-[13px] text-[#211f1a] py-2.25 px-3 rounded-lg outline-none" ref={NoteContentRef} />
                </div>
                <button className={`text-[13px] border-[#e8e6e0] w-full py-2.5 rounded-[9px] font-semibold text-white cursor-pointer bg-[#d98c2b]`} onClick={AddingNewNote}>{t("notes.Add Note")}</button>
            </div>

        </>
    )
}