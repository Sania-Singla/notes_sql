import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notesServices } from "../dbServices/notesService.js";
import { icons } from "../assets/icons.jsx";
import { motion } from "framer-motion";

export default function Home() {
    const [notes, setNotes] = useState([]);
    const [specificNotes, setSpecificNotes] = useState([]);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    useEffect(() => {
        (async function handleGetNotes() {
            const notes = await notesServices.getNotes();
            if (notes && Array.isArray(notes)) {
                // notes.isArray() is not the correct way
                setNotes(notes);
                setSpecificNotes(notes);
            }
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
        // no need since useEffect is filtering at runtime
        // if (!query) {
        //     setSpecificNotes(notes);
        // } else {
        //     setSpecificNotes(
        //         notes.filter((note) => {
        //             if (note.title.includes(query)) return note;
        //         })
        //     );
        // }
    }

    useEffect(() => {
        setSpecificNotes(
            notes.filter((note) => {
                if (note.title.includes(query)) return note;
            })
        );
    }, [query]);

    const notesElements = specificNotes.map((note) => (
            <div key={note.noteId} className="bg-[#fbc9c9] border-[0.01rem] border-black rounded-xl p-4 text-center shadow-sm shadow-black">
                <div className="text-2xl text-black font-semibold">{note.title}</div>
                <div className="mt-6 flex items-center justify-center">
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
        <div className="px-10 py-6 bg-[#000000] min-h-screen w-screen flex flex-col gap-10 items-start justify-start">
            <div className="text-center flex items-center justify-between gap-10 w-full">
                <div className="flex items-center justify-start gap-2 w-full">
                    <div>
                        <div className="size-[17px] fill-[#c2a7a7]">{icons.search}</div>
                    </div>
                    <div className="max-w-[600px] w-full">
                        <form onSubmit={handleSearch} className="flex items-center justify-center">
                            <div className="w-full">
                                <input
                                    type="text"
                                    placeholder="Search here"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                    }}
                                    className="text-lg text-white placeholder:text-lg w-full bg-transparent placeholder-[#a69f9f] outline-none "
                                />
                                <motion.hr
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.4 }}
                                    className="border-[#c2a7a7]"
                                />
                            </div>
                            <button className="ml-1 rounded-full hover:bg-[#3b3b3b] p-[9px]">
                                <div className="size-[20px] fill-[#c2a7a7]">{icons.arrow}</div>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => navigate("/form")}
                        className="flex items-center justify-center gap-2 bg-[#cd2121] border-[0.01rem] border-transparent hover:border-[#b5b4b4] shadow-sm shadow-slate-500 rounded-full w-[110px] h-[33px] text-md font-semibold"
                    >
                        Create <div className="size-[17px] fill-black">{icons.create}</div>
                    </button>

                    <button
                        onClick={handleDeleteNotes}
                        className="flex items-center justify-center gap-2 bg-[#cd2121] border-[0.01rem] border-transparent hover:border-[#b5b4b4] rounded-full shadow-sm shadow-slate-500 w-[110px] h-[33px] text-md font-semibold"
                    >
                        Delete <div className="size-[17px] fill-black">{icons.delete}</div>
                    </button>
                </div>
            </div>

            <div className="w-full">
                {notes?.length > 0 ? (
                    notes.length <= 2 ? (
                        <div className="w-full grid auto-rows-auto grid-cols-[repeat(auto-fit,400px)] gap-6">{notesElements}</div>
                    ) : (
                        <div className="w-full grid auto-rows-auto grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6">{notesElements}</div>
                    )
                ) : (
                    <div className="w-full text-white text-center text-3xl pt-[50px]">NO NOTES FOUND</div>
                )}
            </div>
        </div>
    );
}
