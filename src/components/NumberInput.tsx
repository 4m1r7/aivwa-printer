import React, { useState } from 'react';

import LeftChevron from '../assets/icons/left-chevron.svg';
import RightChevron from '../assets/icons/right-chevron.svg';

const NumberInput = () => {
  const [value, setValue] = useState(0);

  return (
    <div className="w-24 flex items-center relative">
      <img
        src={LeftChevron}
        alt=""
        className='w-2 h-3 absolute left-2 cursor-pointer'
        onClick={() => {if (value > 0) { setValue(value - 1)}}} />
      <img
        src={RightChevron}
        alt=""
        className='w-2 h-3 absolute left-4 cursor-pointer'
        onClick={() => {setValue(value + 1)}} />
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
        className="w-full pl-7 pr-2 py-[.4rem] text-center text-sm border border-customGray rounded-lg"
      />
    </div>
  );
};

export default NumberInput;
