import { object } from "./main.js";

const get_notes = async (req,res) => {
    const result = await object.get_all_notes();
    return res.status(200).json(result);
}

const create_note = async (req,res) => {
    const {title,content} = req.body;
    if(!title || !content) return res.status(400).json({message:"title and content are required."}); 
    const resultId = await object.create_a_note(title,content);
    return res.status(200).json({id:resultId});
}

const get_note = async (req,res) => {
    const {id} = req.params;
    if(!id) return res.status(400).json({message:"id is missing."}); 
    const result = await object.get_a_note(id);
    return res.status(200).json(result);
}

const delete_all_notes = async (req,res) => {
    await object.delete_all_notes();
    return res.status(200).json({message:"all notes deleted!!"});
}

const delete_note = async (req,res) => {
    const {id} = req.params;
    if(!id) return res.status(400).json({message:"id is missing."}); 
    await object.delete_a_note(id);
    return res.status(200).json({message:"note deleted successfully!!"});
}

const edit_note = async (req,res) => {
    const {id} = req.params;
    const {title,content} = req.body;
    await object.edit_a_note(title,content,id);
    const result = await object.get_a_note(id);
    return res.status(200).json(result);
}

export {
    get_notes,
    get_note,
    delete_all_notes,
    create_note,
    delete_note,
    edit_note,
};