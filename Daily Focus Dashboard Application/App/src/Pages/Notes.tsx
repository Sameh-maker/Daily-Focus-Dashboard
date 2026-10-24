import { Plus, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next'
import MyStore from '../GlobalSharedState';
import AddingNotesPopUp from '../NotesComponents/AddingNotesPopUp';
import NoNotesMessage from '../NotesComponents/NoNotesMessage';
import DisplayingNotesInScreen from '../NotesComponents/DisplayNotesInScreen';
import NoSearchResultsFound from '../NotesComponents/NoSearchResultsFound';

export default function Notes() {
    const { t } = useTranslation()
    const IsLight = MyStore((state) => state.IsLight);
    const notes = MyStore((state) => state.notes);
    const OpenAddingNotesPopUp = MyStore((state) => state.OpenAddingNotesPopUp);
    const isAddingNotes = MyStore((state) => state.isAddingNotes);
    const searchQuery = MyStore((state) => state.searchQuery);
    const setSearchQuery = MyStore((state) => state.setSearchQuery);

    // notes length
    const NotesNumber = notes.length;
    const filteredNotes = notes.filter((note) => note.NoteTitle.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
            <div className='max-w-155'>
                {/* Notes Header, Add Note Button */}
                <div className={`md:flex mb-6 justify-between items-center`}>
                    <div className='mb-6'>
                        <h1 className={`text-[26px] font-bold ${IsLight ? ' text-[#211f1a]' : ' text-white'} font-serif`}>{t("notes.Notes")}</h1>
                        <p className={`mt-1  ${IsLight ? 'text-[#8a877e]' : 'text-white'} text-[13px]`}>{t("notes.Notes Number", { NotesNumber: NotesNumber })}</p>
                    </div>
                    <button className='flex items-center gap-1.5 text-[13px] py-2.25 px-4 bg-[#d98c2b] rounded-[10px] text-white cursor-pointer' onClick={OpenAddingNotesPopUp}>
                        <Plus className='w-3.75 h-3.75' />
                        <span>{t("notes.New Note")}</span>
                    </button>
                </div>

                {/* Search bar */}
                <div className='flex gap-2 items-center py-2.5 px-3.5 mb-4.5 bg-white border-[#e8e6e0] border-solid border rounded-[10px] '>
                    <Search className='w-4 h-4 text-[#8a877e]' />
                    <input type="text" placeholder={t("notes.Search Notes Placholder")}
                        className='flex-1 bg-white outline-none text-[13px]' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>

                {/* add note section */}
                {isAddingNotes && (
                    <AddingNotesPopUp />
                )}

                {/* pinned Notes */}
                {NotesNumber === 0 ? (<NoNotesMessage />) : (
                    <div>
                        <div>
                            {filteredNotes.length != 0 ? (<DisplayingNotesInScreen />) : (<NoSearchResultsFound />)}
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}
