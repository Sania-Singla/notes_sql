import { useNavigate } from "react-router-dom";
import { notesServices } from "../dbServices/notesService.js";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Form() {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
    });

    async function handleChange(e) {
        const { value, name } = e.target;
        return setInputs((prev) => ({ ...prev, [name]: value }));
    }

    async function handleReset() {
        return setInputs({ title: "", content: "" });
    }

    async function handelCreateNote(e) {
        e.preventDefault();
        const note = await notesServices.createNote(inputs);
        if (note) {
            return navigate("/");
        }
    }

    async function handleMouseOver() {
        if (!inputs.title || !inputs.content) return setDisabled(true);
        else setDisabled(false);
    }

    return (
        <div className="bg-black min-h-screen text-white flex items-start justify-center pt-10">
            <form onSubmit={handelCreateNote} className="flex flex-col items-center justify-center w-full h-full gap-6">
                <div className="mb-6">
                    <div className="text-center text-[85px] mb-5">😏</div>
                    <div className="flex items-center justify-center text-[1.4rem]">
                        <span>✨</span>
                        <div>
                            <div className="font-semibold px-2">Create a New Note</div>
                            <motion.hr
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.4 }}
                                className="border-[#c2a7a7]"
                            />
                        </div>
                        <span>✨</span>
                    </div>
                </div>
                <div className="w-[300px]">
                    <span className="text-[#e20606]">*</span>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="enter the title"
                        value={inputs.title}
                        onChange={handleChange}
                        className="w-full bg-transparent block border-[0.01rem] border-[#b5b4b4] rounded-md outline-none indent-2 p-2"
                    />
                </div>
                <div className="w-[300px]">
                    <span className="text-[#e20606]">*</span>
                    <label htmlFor="content">Content:</label>
                    <input
                        type="text"
                        name="content"
                        id="content"
                        placeholder="enter the content"
                        value={inputs.content}
                        onChange={handleChange}
                        className="w-full bg-transparent block border-[0.01rem] border-[#b5b4b4] rounded-md outline-none indent-2 p-2"
                    />
                </div>
                <div className="w-[270px] flex items-center justify-center mt-6 gap-8">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center justify-center text-black disabled:cursor-not-allowed bg-[#cd2121] rounded-full w-full h-[34px] text-[1.25rem] shadow-sm shadow-slate-800 hover:border-[#b5b4b4] border-transparent border-[0.01rem] font-semibold"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={disabled}
                        onMouseOver={handleMouseOver}
                        className="flex items-center justify-center text-black disabled:cursor-not-allowed bg-[#cd2121] rounded-full w-full h-[34px] text-[1.25rem] shadow-sm shadow-slate-800 hover:border-[#b5b4b4] border-transparent border-[0.01rem] font-semibold"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
