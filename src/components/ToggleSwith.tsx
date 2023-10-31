import React, { useEffect, useState } from 'react';
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
    console.log(newStatus);

    // Call the onToggle callback to update the status in the parent component
    setIsOn(newStatus);

    // Prepare the data for the POST request
    const value = newStatus ? 'on' : 'off';
    const requestData = {
      setting: property,
      value: value,
    };

    console.log(`${SERVER_IP}${apiRoute}`, JSON.stringify(requestData))

    fetch(`${SERVER_IP}${apiRoute}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.text(); // Get the text response
        } else {
          throw new Error(`API request failed with status: ${response.status}`);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        // Revert the toggle if the API call fails
        setIsOn(!newStatus);
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