export function Button({
    onClick,
    btnText,
    btnIcon,
    type = 'button',
    disabled = false,
    height = '35px',
    width = '135px',
}) {
    return (
        <button
            style={{ height, width }}
            onClick={onClick}
            disabled={disabled}
            type={type}
            className="flex items-center justify-center gap-2 bg-[#cd2121] border-[0.01rem] border-transparent hover:border-[#b5b4b4] shadow-sm shadow-slate-600 rounded-full h-full w-full text-nowrap text-lg font-semibold"
        >
            {btnText}
            {btnIcon && <div className="size-[17px] fill-black">{btnIcon}</div>}
        </button>
    );
}
