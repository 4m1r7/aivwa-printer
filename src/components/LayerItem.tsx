import React from 'react';

interface LayerItemProps {
  icon: string;
  name: string;
  visibility: string;
}

const LayerItem: React.FC<LayerItemProps> = ({ icon, name, visibility }) => {


  return (
    <div className='flex items-center gap-4 p-3 relative rounded-lg border border-[#DCDCDC] bg-customGrayLight cursor-pointer'>
        <img src={icon} alt="templates" className="w-5 h-5" />
        <p className='text-sm text-[#505050] font-light'>{name}</p>
        <img src={visibility} alt="templates" className="w-4 h-4 absolute right-2 cursor-pointer" />
    </div>
  );
};

export default LayerItem;
