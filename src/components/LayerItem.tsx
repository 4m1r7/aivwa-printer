import React, { useEffect, useState } from 'react';

interface LayerItemProps {
  icon: string;
  name: string;
  visibilityIcons: Array<string>;
  activeLayer: boolean;
  index: number;
  toggleElementVisibility: (isVisible: boolean, index: number) => void;
  onClick: () => void;
}

const LayerItem: React.FC<LayerItemProps> = ({ icon, name, visibilityIcons, index, toggleElementVisibility, activeLayer, onClick }) => {

  const [isVisible, setIsVisible] = useState(true);

  const handleVisibilityToggle = () => {
    setIsVisible(!isVisible);
  }

  useEffect(() => {
    toggleElementVisibility(isVisible, index);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])


  return (
    <div className={` flex items-center gap-4 p-3 relative rounded-lg border border-[#DCDCDC] bg-customGrayLight cursor-pointer
                    ${activeLayer ? 'border-1 border-customBlue' : ''} `}
          onClick={onClick}
    >
        <img src={icon} alt="templates" className="w-5 h-5" />
        <p className='text-sm text-[#505050] font-light'>{name}</p>
        <img
          className="w-4 h-4 absolute right-2 cursor-pointer"
          src={isVisible ? visibilityIcons[0] : visibilityIcons[1]}
          alt="templates"
          onClick={handleVisibilityToggle}
        />
    </div>
  );
};

export default LayerItem;
