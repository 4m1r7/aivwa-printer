import React from 'react';

import Close from '../assets/icons/close.svg'
import NumberInput from './NumberInput';

interface SlabModalProps {
  slabId: string;
  onClose: () => void;
}

const SlabModal: React.FC<SlabModalProps> = ({ slabId, onClose }) => {

    // Only close the modal if the clicked element is the overlay itself
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
        onClose();
        }
    };


  return (
    <div onClick={handleOverlayClick} className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
        <div className="w-[27rem] bg-white rounded-2xl py-6 px-16 relative flex flex-col gap-2">

            <img
                src={Close}
                alt="templates"
                className="w-7 h-7 absolute top-3 left-3 cursor-pointer"
                onClick={onClose}
            />
            
            <h2 className='text-[#646464] font-medium text-modal-size text-center mb-4'>Document Setting</h2>

            <div className="flex gap-2">
                <div className="w-1/2 flex items-center">
                    <p className='font-light text-modal-size text-customBlue'>Delay Before Print</p>
                </div>

                <div className="w-1/2 flex flex-col gap-2">
                    <NumberInput unit='ms' />
                </div>
            </div>

            <div className="flex gap-2">
                <div className="w-1/2 flex items-center">
                    <p className='font-light text-modal-size text-customBlue'>Quantity</p>
                </div>

                <div className="w-1/2 flex flex-col gap-2">
                    <NumberInput />
                </div>
            </div>

            <div className="flex gap-2">
                <div className="w-1/2 flex items-center">
                    <p className='font-light text-modal-size text-customBlue'>Quantity Delay</p>
                </div>

                <div className="w-1/2 flex flex-col gap-2">
                    <NumberInput unit='ms' />
                </div>
            </div>

            <div className="flex gap-2">
                <div className="w-1/2 flex items-center">
                    <p className='font-light text-modal-size text-customBlue'>Name</p>
                </div>

                <div className="w-1/2 flex flex-col gap-2">
                    <input type="text" className='w-full px-2 py-[.4rem] text-sm text-center border border-customGray rounded-lg' />
                </div>
            </div>

            <div className="flex gap-2">
                <div className="w-1/2 flex items-center">
                    <p className='font-light text-modal-size text-customBlue'>Repeat Document</p>
                </div>

                <div className="w-1/2 flex flex-col gap-2">
                    <NumberInput />
                </div>
            </div>

        </div>
    </div>
  );
};

export default SlabModal;
