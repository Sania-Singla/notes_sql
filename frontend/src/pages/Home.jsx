import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notesServices from "../dbServices/notesService";

export default function Home() {
    const [notes,setNotes] = useState([]);
    const navigate = useNavigate(); 

    useEffect(()=>{
        async function handleGetNotes() {
            const notes = await notesServices.getNotes();
            if(notes) {
                setNotes(notes);
            }
        }
        handleGetNotes();
    },[])

    async function handleDeleteNotes() {
        const res = await notesServices.deleteNotes();
        if(res) {
            setNotes([]);
            console.log(notes);
        }
    }

    const notesElements = notes?.map(note=>(
        <div key={note._id} className="bg-[#fbc9c9] border-[0.01rem] border-black rounded-xl p-4 text-center shadow-sm shadow-black">
            <div className="text-2xl text-black font-medium">{note.title}</div>
            <div className="mt-6">
                <button onClick={()=>navigate(`/note/${note._id}`)} className="bg-[#cd2121] rounded-lg py-1 px-2 text-lg shadow-md shadow-black hover:border-[#b5b4b4] border-transparent border-[0.01rem] font-medium">get the note</button>
            </div>
        </div>
    ))

  return (
    <div className="p-4 bg-[#000000] min-h-screen w-screen">
        <div className="text-center">
            <button onClick={()=>navigate("/form")} className="bg-[#cd2121] border-[0.01rem] border-transparent hover:border-[#b5b4b4] rounded-md p-2 font-medium">CREATE A NEW NOTE</button>
        </div>

        {
            notes.length>0 && 
            <div className="mt-10">
                <div className="grid auto-rows-auto grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">{notesElements}</div>
                <div className="mt-10 text-center">
                    <button onClick={handleDeleteNotes} className="bg-[#cd2121] border-[0.01rem] border-transparent hover:border-[#b5b4b4] rounded-md p-2 font-medium">DELETE ALL NOTES</button>
                </div>
            </div>
        }
    </div>
  )
}
