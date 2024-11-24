import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notesServices } from '../dbServices/notesService.js';
import { icons } from '../assets/icons.jsx';
import { motion } from 'framer-motion';
import formatTimeStamp from '../utils/formatTimeStamp.js';
import { Button } from '../components/button.jsx';

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
                <Button
                    onClick={() => navigate(`/note/${note.noteId}`)}
                    btnText="Read more"
                    btnIcon={icons.arrow}
                />
            </div>
        </div>
    ));

    return (
        <div className="py-8 px-5 h-full w-full flex flex-col gap-10 items-center justify-start">
            <div className="text-center flex sm:flex-row flex-col items-center justify-between gap-10 w-full">
                <div className="flex items-center justify-start gap-3 w-full">
                    {/* search icon */}
                    <div>
                        <div className="size-[22px] fill-[#b7b1b1] hover:fill-[#cd2121]">
                            {icons.search}
                        </div>
                    </div>
                    {/* search input */}
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
                                    className="text-lg text-white w-full bg-transparent placeholder-[#817d7d] outline-none"
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

                {/* create/delete buttons */}
                <div className=" flex items-center justify-center gap-4">
                    <Button
                        onClick={() => navigate('/form')}
                        btnText="Create One"
                        btnIcon={icons.create}
                    />

                    <Button
                        onClick={handleDeleteNotes}
                        btnText="Delete All"
                        btnIcon={icons.delete}
                    />
                </div>
            </div>

            {/* notes */}
            {loading ? (
                <div className="text-white text-xl text-center w-full mt-10">
                    Loading...
                </div>
            ) : (
                <div className="w-full px-[5px] h-full overflow-y-scroll overflow-x-hidden">
                    {notes?.length > 0 ? (
                        notes.length > 2 ? (
                            <div className="w-full grid auto-rows-auto grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                                {notesElements}
                            </div>
                        ) : (
                            <div className="w-full grid auto-rows-auto grid-cols-[repeat(auto-fit,300px)] gap-6">
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
