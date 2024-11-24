import { useNavigate } from 'react-router-dom';
import { notesServices } from '../dbServices/notesService.js';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/button';

export default function Form() {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [inputs, setInputs] = useState({
        title: '',
        content: '',
    });

    async function handleChange(e) {
        const { value, name } = e.target;
        return setInputs((prev) => ({ ...prev, [name]: value }));
    }

    async function handleReset() {
        return setInputs({ title: '', content: '' });
    }

    async function handelCreateNote(e) {
        e.preventDefault();
        const note = await notesServices.createNote(inputs);
        if (note) {
            return navigate('/');
        }
    }

    async function handleMouseOver() {
        if (!inputs.title || !inputs.content) return setDisabled(true);
        else setDisabled(false);
    }

    return (
        <div className="h-full text-white flex flex-col items-center justify-center gap-12">
            <div className="w-full flex flex-col items-center justify-start gap-6">
                <div className="text-[85px]">😏</div>
                <div className="flex items-center justify-center text-[1.4rem]">
                    <span>✨</span>
                    <div>
                        <div className="font-semibold px-2">
                            Create a New Note
                        </div>
                        <motion.hr
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.4 }}
                            className="border-[#c2a7a7]"
                        />
                    </div>
                    <span>✨</span>
                </div>
            </div>

            <form
                onSubmit={handelCreateNote}
                className="flex flex-col items-center justify-center w-full gap-6"
            >
                <div className="w-[300px]">
                    <span className="text-[#e20606]">* </span>
                    <label htmlFor="title">Title :</label>
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
                    <span className="text-[#e20606]">* </span>
                    <label htmlFor="content">Content :</label>
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

                <div className="w-[270px] flex items-center justify-center gap-8 mt-4">
                    <Button
                        type="button"
                        onClick={handleReset}
                        btnText="Reset"
                        width="110px"
                    />
                    <Button
                        type="submit"
                        disabled={disabled}
                        onMouseOver={handleMouseOver}
                        btnText="Create"
                        width="110px"
                    />
                </div>
            </form>
        </div>
    );
}
