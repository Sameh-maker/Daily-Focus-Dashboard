import { PinIcon, Trash2 } from 'lucide-react'
import MyStore from '../GlobalSharedState'


export default function DisplayingNotesInScreen() {
    const notes = MyStore((state) => state.notes)
    const searchQuery = MyStore((state) => state.searchQuery)
    const deleteNote = MyStore((state) => state.deleteNote)
    const pinNote = MyStore((state) => state.pinNote)
    const filteredNotes = notes.filter((note) => note.NoteTitle.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
            <div className='grid grid-cols-1 gap-3'>
                {filteredNotes.map((note) => (
                    <div className='flex flex-col gap-2 bg-white rounded-2xl p-4 border border-[#e8e6e0] border-l-4 border-l-[#d98c2b]' key={note.NoteId}>
                        <div className='flex justify-between items-center'>
                            <span className='capitalize text-[14px] text-[#211f1a] font-semibold'>{note.NoteTitle}</span>
                            <div className='flex gap-1'>
                                <button className={`${note.IsPinned ? 'text-[#d98c2b]' : 'text-black'} hover:cursor-pointer`} onClick={() => pinNote(note)}>
                                    <PinIcon className='w-3.25 h-3.25' />
                                </button>
                                <button className='hover:cursor-pointer' onClick={() => deleteNote(note)}>
                                    <Trash2 className='w-3.25 h-3.25' />
                                </button>
                            </div>
                        </div>
                        <p className=' capitalize text-[12px] text-[#8a877e]'>{note.NoteContent}</p>
                        <span className=' capitalize text-[12px] text-[red]'>{note.date}</span>
                    </div>
                ))}
            </div>
        </>
    )
}