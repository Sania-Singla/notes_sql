import { icons } from '../assets/icons';

export function Button({ onClick, btnText, btnIcon }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center gap-2 bg-[#cd2121] border-[0.01rem] border-transparent hover:border-[#b5b4b4] shadow-sm shadow-slate-600 rounded-full w-[140px] h-[35px] text-lg font-semibold"
        >
            {btnText}
            {btnIcon && <div className="size-[17px] fill-black">{btnIcon}</div>}
        </button>
    );
}
