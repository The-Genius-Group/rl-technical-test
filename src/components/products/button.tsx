"use client";

export default function ProductToggleButton({ callback, message }: ProductToggleButtonProps) {
    return (
        <button
        type="button"
        onClick={callback}
        className="bg-green-500 text-white py-2 px-4 rounded"
        aria-label={message}
        >
            { message }
        </button>
    );
}

interface ProductToggleButtonProps {
    callback: React.MouseEventHandler<HTMLButtonElement>;
    message: string;
}