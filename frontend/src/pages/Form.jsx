import { useNavigate } from "react-router-dom";
import notesServices from "../dbServices/notesService";
import { useState } from "react";

export default function Form() {
    const navigate = useNavigate();
    const [disabled,setDisabled] = useState(false);
    const [inputs,setInputs] = useState({
        title:"",
        content:""
    });

    async function handleChange(e) {
        const {value,name} = e.target;
        return setInputs(prev=>({...prev,[name]:value}));
    }

    async function handleReset() {
        return setInputs({title:"",content:""});
    }

    async function handelCreateNote(e) {
        e.preventDefault();
        const note = await notesServices.createNote(inputs);
        if(note) {
            return navigate("/");
        }
    }

    async function handleMouseOver() {
        if(!inputs.title || !inputs.content) return setDisabled(true);
        else setDisabled(false);
    }
    
    return (
        <div className="bg-black min-h-screen text-white flex items-center justify-center">
            <form onSubmit={handelCreateNote}>
                <span className="text-[#e20606]">*</span><label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    name="title"
                    id="title"
                    placeholder="enter the title"
                    value={inputs.title}
                    onChange={handleChange}
                    className="bg-transparent mb-2 block border-[0.01rem] border-[#b5b4b4] rounded-md outline-none indent-2 p-2 mt-[3px]"
                />
                <span className="text-[#e20606]">*</span><label htmlFor="content">Content:</label>
                <input 
                    type="text" 
                    name="content"
                    id="content"
                    placeholder="enter the content"
                    value={inputs.content}
                    onChange={handleChange}
                    className="bg-transparent block border-[0.01rem] border-[#b5b4b4]  rounded-md outline-none indent-2 p-2 mt-[3px]"
                />
                <div className="w-full flex items-center justify-center mt-6">
                    <button type="button" onClick={handleReset} className="w-full bg-[#cd2121] rounded-lg py-1 text-lg shadow-md shadow-black hover:border-[#b5b4b4] border-transparent border-[0.01rem] font-medium">Reset</button>
                    <button type="submit" disabled={disabled} onMouseOver={handleMouseOver} className="w-full disabled:cursor-not-allowed bg-[#cd2121] ml-4 rounded-lg py-1 text-lg shadow-md shadow-black hover:border-[#b5b4b4] border-transparent border-[0.01rem] font-medium">Create</button>
                </div>
            </form>
        </div>
    )
}
