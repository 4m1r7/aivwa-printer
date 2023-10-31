import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { SERVER_IP } from '../helpers/config';

interface ToggleSwitchProps {
  toggleStatus: boolean;
  apiRoute: string;
  property: string;
}

export default function ToggleSwitch({ toggleStatus, apiRoute, property } : ToggleSwitchProps) {

  
  const [isOn, setIsOn] = useState(toggleStatus);

  useEffect(() => {
    setIsOn(toggleStatus);
  }, [toggleStatus]);


  const handleToggle = () => {
    const newStatus = !isOn;

    // Call the onToggle callback to update the status in the parent component
    setIsOn(newStatus);

    axios
      .post(`http://${SERVER_IP}${apiRoute}?setting=${property}&value=${newStatus ? 'on' : 'off'}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        // Revert the toggle if the API call fails
        setTimeout(() => {setIsOn(!newStatus)}, 250);
      });
  };

  return (
    <div className="flex items-center">
      <span className={`w-[4.1rem] h-8 rounded-full bg-radiobg shadow-radio-inner relative flex justify-between items-center cursor-pointer`} onClick={handleToggle}>
        <p className={`${isOn ? 'text-pico text-customGray pl-[.55rem]' : 'text-micro text-white pl-[.65rem]'}  relative z-10 duration-75`}>Off</p>
        <p className={`${isOn ? 'text-micro text-white pr-[.65rem]' : 'text-pico text-customGray pr-[.5rem]'} relative  z-10 duration-75`}>ON</p>
        <span className={`w-[2.3rem] h-[1.8rem] rounded-full bg-customBlue absolute left-[.1rem] z-0 transform transition-transform ${isOn ? 'translate-x-[1.6rem]' : ''}`} />
      </span>
    </div>
  );
};