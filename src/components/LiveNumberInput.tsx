import React from 'react';

import LeftChevron from '../assets/icons/left-chevron.svg';
import RightChevron from '../assets/icons/right-chevron.svg';

interface LiveNumberInputProps {
  title?: string;
  alternateStyle?: boolean;
  inputValue: number;
  setInputValue: (newValue: number) => void;
}

export default function LiveNumberInput({ title, inputValue, setInputValue, alternateStyle} : LiveNumberInputProps) {
  

  const handleValueUpdate = (updatedValue: number) => {
    setInputValue(updatedValue);
  };


  return (
    <div className={`w-fit flex items-center relative
                     ${alternateStyle ? 'alternate-style-input h-full' : 'h-full'}
                     ${title ? 'pl-2' : ''}`}
    >

      <img
        src={LeftChevron}
        alt=""
        className={`w-2 h-3 absolute cursor-pointer
                    ${alternateStyle ? 'bottom-[25%] -rotate-90 right-3' : 'left-2'}`}
        onClick={() => {if (inputValue > 0) { handleValueUpdate(inputValue - 1)}}}
      />

      <img
        src={RightChevron}
        alt=""
        className={`w-2 h-3 absolute cursor-pointer
                    ${alternateStyle ? 'top-[25%] -rotate-90 right-3' : 'left-4'}`}
        onClick={(e) => { handleValueUpdate(inputValue + 1) }}
      />

      {title && 
        <label className='text-xs text-customGrayDarker font-light whitespace-nowrap'>{title}</label>
      }

      <input
        type="number"
        value={inputValue}
        className={`w-full py-[.4rem] text-left text-sm outline-none pr-[20%]
                    ${title ? 'pl-2' : 'pl-7'}
                    ${alternateStyle ? '' : 'border border-customGray rounded-lg'}`}
        onChange={(e) => {
          handleValueUpdate(parseInt(e.target.value, 10))
        }}
      />

    </div>
  );
};