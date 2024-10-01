import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notesServices } from "../dbServices/notesService.js";

export default function Note() {
    const { noteId } = useParams();
    const [note, setNote] = useState({});
    const [editing, setEditing] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
    });

    async function handleChange(e) {
        const { value, name } = e.target;
        return setInputs((prev) => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        async function getNote() {
            setLoading(true);
            const data = await notesServices.getNote(noteId);
            console.log(data);
            if (data && data?.message !== "NOTE_NOT_FOUND" && data?.message !== "INVALID_NOTE_ID") {
                setInputs({ title: data.title, content: data.content });
                setNote(data);
            } else {
                navigate("/not-found");
            }
            setLoading(false);
        }
        getNote();
    }, [noteId]);

    async function handleDeleteNote() {
        const res = await notesServices.deleteNote(noteId);
        if (res) {
            navigate("/");
        }
    }

    async function handleMouseOver() {
        if (!inputs.title || !inputs.content) return setDisabled(true);
        else setDisabled(false);
    }

    async function handleEditNote(e) {
        e.preventDefault();
        const note = await notesServices.editNote(noteId, inputs);
        if (note) {
            setEditing(false);
        }
    }

    async function handleReset() {
        setInputs({ title: note.title, content: note.content });
        setEditing(false);
    }

    return (
        <div className="bg-black h-full w-screen p-4">
            {loading ? (
                <div className="text-white flex items-start justify-center w-full h-full text-xl mt-10">Loading...</div>
            ) : (
                Object.keys(note).length && (
                    // is note object empty
                    <div className="relative bg-[#fbc9c9] rounded-xl p-4 pb-[60px]">
                        {editing ? (
                            <form onSubmit={handleEditNote} className="flex flex-col items-start justify-start gap-4">
                                <div className="w-full h-full">
                                    <span className="text-[#e20606]">*</span>
                                    <label htmlFor="title" className="font-semibold text-[1.15rem]">
                                        Title :
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Enter the Title"
                                        value={inputs.title}
                                        autoFocus
                                        onChange={handleChange}
                                        className="text-lg w-[50%] bg-transparent placeholder-[#464646] block border-[0.01rem] border-[#e2acac] rounded-md outline-none indent-2 p-1"
                                    />
                                </div>

                                <div className="w-full h-full mb-2">
                                    <span className="text-[#e20606]">*</span>
                                    <label htmlFor="content" className="font-semibold text-[1.15rem]">
                                        Content :
                                    </label>
                                    <textarea
                                        type="text"
                                        name="content"
                                        id="content"
                                        placeholder="Enter the Content"
                                        value={inputs.content}
                                        onChange={handleChange}
                                        rows={3}
                                        autoFocus
                                        className="text-lg w-full bg-transparent placeholder-[#464646] block border-[0.01rem] border-[#e2acac] rounded-md outline-none p-2"
                                    />
                                </div>

                                <div className="absolute bottom-4 right-4 flex items-center justify-center gap-4">
                                    <button
                                        onClick={handleReset}
                                        type="button"
                                        className="bg-[#cd2121] rounded-full text-lg w-[80px] h-[30px] flex items-center justify-center shadow-sm shadow-black hover:border-[#141414] border-transparent border-[0.01rem] font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={disabled}
                                        onMouseOver={handleMouseOver}
                                        type="submit"
                                        className="disabled:cursor-not-allowed bg-[#cd2121] rounded-full text-lg w-[80px] h-[30px] flex items-center justify-center shadow-sm shadow-black hover:border-[#141414] border-transparent border-[0.01rem] font-medium"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="w-full flex flex-col items-center justify-center gap-4">
                                <div className="text-[1.8rem] font-bold text-center">{inputs.title}</div>
                                <div className="text-[1.3rem] text-center px-2">{inputs.content}</div>
                            </div>
                        )}

                        {!editing && (
                            <div className="absolute bottom-4 right-4 flex items-center justify-center gap-4">
                                <button
                                    onClick={() => setEditing(true)}
                                    className="bg-[#cd2121] rounded-full text-lg w-[80px] h-[30px] shadow-sm flex items-center justify-center shadow-black hover:border-[#141414] border-transparent border-[0.01rem] font-medium"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={handleDeleteNote}
                                    className="bg-[#cd2121] rounded-full text-lg w-[80px] h-[30px] flex items-center justify-center shadow-sm shadow-black hover:border-[#141414] border-transparent border-[0.01rem] font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    );
}
