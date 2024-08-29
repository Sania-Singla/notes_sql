import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import notesServices from "../dbServices/notesService";

export default function Note() {
  const {id} = useParams();
  const [note,setNote] = useState({});
  const [editing,setEditing] = useState(false);
  const [disabled,setDisabled] = useState(false);
  const navigate = useNavigate();
  const [inputs,setInputs] = useState({
    title:"",
    content:""
  });

  async function handleChange(e) {
      const {value,name} = e.target;
      return setInputs(prev=>({...prev,[name]:value}));
  }

  useEffect(() => {
    async function getNote() {
      const note = await notesServices.getNote(id);
      if(note) {
        setInputs({title:note.title,content:note.content});
        setNote(note);
      }
    }
    getNote();
  },[])

  async function handleDeleteNote() {
    const res = await notesServices.deleteNote(id);
    if(res) {
      navigate("/");
    }
  }

  async function handleMouseOver() {
    if(!inputs.title || !inputs.content) return setDisabled(true);
    else setDisabled(false);
  }

  async function handleEditNote(e) {
    e.preventDefault();
    const note = await notesServices.editNote(id,inputs);
    if(note) {
      setEditing(false);
    }
  }

  async function handleReset() {
    setInputs({title:note.title,content:note.content});
    setEditing(false);
  }
   
  if(note) return (
    <div className="bg-black min-h-screen p-4">
      <div className="relative bg-[#fbc9c9] rounded-lg p-4">
      {
        editing ? 
        <form onSubmit={handleEditNote}>
          <span className="text-[#e20606]">*</span><label htmlFor="title">Title:</label>
          <input
            type="text" 
            name="title"
            id="title"
            placeholder="enter the title"
            value={inputs.title}
            autoFocus
            onChange={handleChange}
            className="bg-transparent mb-2 block border-[0.01rem] border-black rounded-md outline-none indent-2 p-1"
          />
          <span className="text-[#e20606]">*</span><label htmlFor="content">Content:</label>
          <input 
              type="text" 
              name="content"
              id="content"
              placeholder="enter the content"
              value={inputs.content}
              onChange={handleChange}
              className="bg-transparent mb-2 block border-[0.01rem] border-black rounded-md outline-none indent-2 p-1"
          />
          <button onClick={handleReset} type="button" className="mt-4 bg-[#cd2121] rounded-lg py-1 px-2 text-md shadow-md shadow-black hover:border-[#b5b4b4] border-transparent border-[0.01rem] font-medium">cancel</button>
          <button disabled={disabled} onMouseOver={handleMouseOver} type="submit" className="disabled:cursor-not-allowed ml-4 bg-[#cd2121] rounded-lg py-1 px-2 text-md shadow-md shadow-black hover:border-[#b5b4b4] border-transparent border-[0.01rem] font-medium">update</button>
        </form>:
        <div className="w-full">
          <div className="text-2xl font-semibold text-start">{inputs.title}</div>
          <div className="text-lg mt-4 text-start w-full">{inputs.content}</div>
        </div>
      }
        <div className="absolute top-2 right-2">
          <button onClick={handleDeleteNote} className="mr-4 bg-[#cd2121] rounded-lg py-1 px-2 text-md shadow-md shadow-black hover:border-[#b5b4b4] border-transparent border-[0.01rem] font-medium">delete</button>
          {!editing && <button onClick={()=>setEditing(true)} className="bg-[#cd2121] rounded-lg py-1 px-2 text-md shadow-md shadow-black hover:border-[#b5b4b4] border-transparent border-[0.01rem] font-medium">edit</button>}
        </div>
      </div>
    </div>
  )
}
