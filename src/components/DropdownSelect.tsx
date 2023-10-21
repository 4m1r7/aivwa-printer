import React, { useEffect, useState } from 'react';

import LeftChevron from '../assets/icons/left-chevron.svg';

interface DropdownSelectProps {
  title?: string;
  options: any[];  // Array of options for the dropdown
  values?: any[]; // Optional array of custom values
  currentValue?: any;
  onValueChange?: (value: string) => void;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({ title, options, values, currentValue, onValueChange }) => {

  const [value, setValue] = useState<any>();

  const handleValueUpdate = (updatedValue: string) => {
    setValue(updatedValue);
    if (onValueChange) {
      onValueChange(updatedValue);
    }
  };

  useEffect(() => {
    if (currentValue) {
      setValue(currentValue);
    }
  }, [currentValue])

  return (
    <div className={`w-fit flex items-center gap-4 pr relative pr-2
                      ${title ? 'pl-2' : '' }`} >

      {title && <label className='text-xs text-customGrayDarker font-light whitespace-nowrap'>{title}</label>}

      <img
        src={LeftChevron}
        alt=""
        className='w-2 h-3 absolute right-4 -rotate-90 pointer-events-none' />

      <select 
        value={value}
        className='custom-select w-full py-[.4rem] px-2 text-left text-xs outline-none border border-customGrayDark rounded-lg bg-transparent'
        onChange={(e) => {
          handleValueUpdate(e.target.value)
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={values ? values[index] : option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelect;
