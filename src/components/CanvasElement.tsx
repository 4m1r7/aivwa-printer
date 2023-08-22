import React from 'react';

interface CanvasElementProps {
  name: string;
  icon: string;
  conerIcon: string;
}

const CanvasElement: React.FC<CanvasElementProps> = ({ name, icon, conerIcon }) => {


  return (
    <div className='h-20 w-20 shadow-element rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer relative'>
      <img src={conerIcon} alt="templates" className="w-3 h-3 absolute top-2 left-2" />
      <img src={icon} alt="templates" className="w-7 h-7 mt-2" />
      {name}
    </div>
  );
};

export default CanvasElement;
