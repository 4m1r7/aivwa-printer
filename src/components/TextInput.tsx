import React, { useEffect, useState } from 'react';

interface TextInputProps {
  title?: string;
  placeholder?: string;
  currentValue?: string | null;
  onValueChange?: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ title, placeholder, currentValue, onValueChange }) => {

  const [value, setValue] = useState(currentValue ? currentValue : '');
  
  useEffect(() => {
    if (currentValue) {
      setValue(currentValue);
    }
  }, [currentValue])

  const handleValueUpdate = (updatedValue: string) => {
    setValue(updatedValue);
    if (onValueChange) {
      onValueChange(updatedValue);
    }
  };

  

  return (
    <div className='w-fit flex items-center gap-4 pr relative px-2' >

      {title && <label className='text-xs text-customGrayDarker font-light whitespace-nowrap'>{title}</label>}
      
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className={`w-full py-[.4rem] text-left text-sm outline-none ${title ? 'pl-2' : ''} border border-customGray rounded-lg`}
        onChange={(e) => {
          handleValueUpdate(e.target.value)
        }}
      />
    </div>
  );
};

export default TextInput;
