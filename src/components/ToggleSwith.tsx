import React from 'react';

interface ToggleSwitchProps {
  toggleStatus: boolean;
  setToggleStatus: (newStatus:boolean) => void;
}

export default function ToggleSwitch({ toggleStatus, setToggleStatus } : ToggleSwitchProps) {

  const handleToggle = () => {
    const newStatus = !toggleStatus;
    setToggleStatus(newStatus);
  };

  return (
    <div className="flex items-center">
      <span className={`w-[4.1rem] h-8 rounded-full bg-radiobg shadow-radio-inner relative flex justify-between items-center cursor-pointer`} onClick={handleToggle}>
        <p className={`${toggleStatus ? 'text-pico text-customGray pl-[.55rem]' : 'text-micro text-white pl-[.65rem]'}  relative z-10 duration-75`}>Off</p>
        <p className={`${toggleStatus ? 'text-micro text-white pr-[.65rem]' : 'text-pico text-customGray pr-[.5rem]'} relative  z-10 duration-75`}>ON</p>
        <span className={`w-[2.3rem] h-[1.8rem] rounded-full bg-customBlue absolute left-[.1rem] z-0 transform transition-transform ${toggleStatus ? 'translate-x-[1.6rem]' : ''}`} />
      </span>
    </div>
  );
};