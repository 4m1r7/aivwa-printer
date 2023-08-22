import React, { useState } from 'react';

interface TabsProps {
  titles: string[];
  children: React.ReactNode[];
}

const Tabs: React.FC<TabsProps> = ({ titles, children }) => {
  
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

  return (
    <div className="w-full flex flex-col">

        <div className="flex tabs-container">

            {titles.map((title, index) => (
            <div
                key={index}
                className={`w-48 py-3 rounded-tl-xl rounded-tr-xl border border-b-0 text-sm cursor-pointer bg-tab-color relative transition duration-150 ${
                index === activeTab
                    ? 'active-tab text-black font-semibold border-customBlue z-10'
                    : 'text-gray-700 font-medium'
                }`}
                onClick={() => handleTabClick(index)}
            >
                <div className='w-full h-full flex items-center justify-center'>
                    {/* wrapped inside an extra div, to use pseudo elements for left corner reverse radius */}
                    {title}
                </div>
            </div>
            ))}

        </div>

        <div className="px-4 py-6 -mt-[2px] z-5 bg-tab-color rounded-xl border border-customBlue relative">
            {children[activeTab]}
        </div>

    </div>
  );
};

export default Tabs;
