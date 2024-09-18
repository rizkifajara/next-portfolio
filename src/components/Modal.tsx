import React from 'react'

type Props = {
    children: React.ReactNode;
    onClose: () => void;
    title: string;
}

function Modal({ children, onClose, title }: Props) {
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
             onClick={handleBackgroundClick}>
            <div className='bg-[#292929] p-8 rounded-lg w-11/12 max-w-4xl'>
                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-4xl font-light text-gray-400 text-center tracking-[20px] uppercase'>{title}</h2>
                    <button 
                        onClick={onClose} 
                        className='text-white text-xl hover:text-gray-300 transition-colors'
                    >
                        &times;
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal