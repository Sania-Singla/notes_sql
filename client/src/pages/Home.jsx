import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notesServices } from '../dbServices/notesService.js';
import { icons } from '../assets/icons.jsx';
import { motion } from 'framer-motion';
import formatTimeStamp from '../utils/formatTimeStamp.js';

export default function Home() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function handleGetNotes() {
            setLoading(true);
            const notes = await notesServices.getNotes(query);
            if (notes && Array.isArray(notes)) {
                // notes.isArray() is not the correct way
                setNotes(notes);
            }
            setLoading(false);
        })(); // IIFE
    }, []);

    async function handleDeleteNotes() {
        const res = await notesServices.deleteNotes();
        if (res) {
            setNotes([]);
        }
    }

    async function handleSearch(e) {
        e.preventDefault();
        setLoading(true);
        const notes = await notesServices.getNotes(query);
        if (notes && Array.isArray(notes)) {
            setNotes(notes);
        } else {
            setNotes([]);
        }
        setLoading(false);
    }

    const notesElements = notes.map((note) => (
        <div
            key={note.noteId}
            className="relative bg-[#fbc9c9] border-[0.01rem] border-black rounded-xl py-4 px-5"
        >
            <div className="text-2xl text-black font-semibold line-clamp-1 text-ellipsis">
                {note.title}
            </div>
            <div className="text-[1.1rem] mt-2 text-black font-normal line-clamp-1 text-ellipsis ">
                {note.content}
            </div>
            <div className="absolute bottom-3 right-4 text-[#4c4c4c] text-[0.95rem] font-semibold">
                {formatTimeStamp(note.updatedAt)}
            </div>
            <div className="mt-4 flex items-center justify-start">
                <button
                    onClick={() => navigate(`/note/${note.noteId}`)}
                    className="bg-[#cd2121] rounded-full h-[32px] flex items-center justify-center w-[125px] text-lg shadow-md shadow-black hover:border-[#b5b4b4] border-transparent border-[0.01rem] font-semibold"
                >
                    get the note
                </button>
            </div>
        </div>
    ));

    return (
        <div className="h-full w-full flex flex-col gap-10 items-center justify-start">
            <div className="text-center flex sm:flex-row flex-col items-center justify-between gap-10 w-full">
                <div className="flex items-center justify-start gap-2 w-full">
                    <div>
                        <div className="size-[18px] fill-[#b7b1b1]">
                            {icons.search}
                        </div>
                    </div>
                    <div className="max-w-[600px] w-full">
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center justify-center"
                        >
                            <div className="w-full">
                                <input
                                    type="text"
                                    placeholder="Search here"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                    }}
                                    className="text-lg text-white placeholder:text-lg w-full bg-transparent placeholder-[#908c8c] outline-none "
                                />
                                <motion.hr
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 0.4 }}
                                    className="border-[#b7b1b1]"
                                />
                            </div>
                            <button className="ml-1 rounded-full hover:bg-[#3b3b3b] p-[9px]">
                                <div className="size-[20px] fill-[#b7b1b1]">
                                    {icons.arrow}
                                </div>
                            </button>
                        </form>
                    </div>
                </div>

                <div className=" flex items-center justify-center gap-4">
                    <button
                        onClick={() => navigate('/form')}
                        className="flex items-center justify-center gap-2 bg-[#cd2121] border-[0.01rem] border-transparent hover:border-[#b5b4b4] shadow-sm shadow-slate-500 rounded-full w-[125px] h-[33px] text-md font-semibold"
                    >
                        Create One
                        <div className="size-[17px] fill-black">
                            {icons.create}
                        </div>
                    </button>

                    <button
                        onClick={handleDeleteNotes}
                        className="flex items-center justify-center gap-2 bg-[#cd2121] border-[0.01rem] border-transparent hover:border-[#b5b4b4] rounded-full shadow-sm shadow-slate-500 w-[120px] h-[33px] text-md font-semibold"
                    >
                        Delete All
                        <div className="size-[17px] fill-black">
                            {icons.delete}
                        </div>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-white text-xl text-center w-full mt-10">
                    Loading...
                </div>
            ) : (
                <div className="w-full px-[5px] h-full overflow-y-scroll overflow-x-hidden">
                    {notes?.length > 0 ? (
                        notes.length <= 2 ? (
                            <div className="w-full grid auto-rows-auto grid-cols-[repeat(auto-fit,300px)] gap-6">
                                {notesElements}
                            </div>
                        ) : (
                            <div className="w-full grid auto-rows-auto grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                                {notesElements}
                            </div>
                        )
                    ) : (
                        <div className="w-full text-white text-center p-10">
                            <div className="text-[85px] mb-4">😑</div>
                            <div className="text-4xl">NO NOTES FOUND !!</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
