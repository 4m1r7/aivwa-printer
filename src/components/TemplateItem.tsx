import React from 'react';

import Cog from '../assets/icons/cog-icon.svg';
import Export from '../assets/icons/export.svg';
import EditTemplate from '../assets/icons/edit-template.svg';
import TemplatePreview from '../assets/icons/template-preview.svg';
import Inactive from '../assets/icons/inactive.svg';
import Active from '../assets/icons/active.png';

interface TemplateItemProps {
  slabId: string;
  slabName: string;
  printCount: string;
  lastModified: string;
  previewImageUrl?: string;
  exportUrl: string;
  isActive: boolean;
  onSlabSettingsClick: (slabId: string) => void;
}

const TemplateItem: React.FC<TemplateItemProps> = ({
  slabId,
  slabName,
  printCount,
  lastModified,
  previewImageUrl,
  exportUrl,
  isActive,
  onSlabSettingsClick,
}) => {

  return (
    <div className="w-full h-fit rounded-lg shadow-pane flex justify-start items-center px-8 py-2">
        
        <div className="w-[12%] flex gap-1 text-center">
            <img src={Cog}
                alt="cog"
                className="w-5 h-5 cursor-pointer"
                onClick={() => onSlabSettingsClick(slabId)}
            />
            <p className="w-full text-sm">{slabName}</p>
        </div>

        <div className="w-[12%] flex justify-center text-center">
            <p className="text-sm">{printCount}</p>
        </div>

        <div className="w-[18%] flex justify-center text-center">
            <p className="text-sm">{lastModified}</p>
        </div>

        <div className="w-[30%] flex justify-center text-center">
            <img src={TemplatePreview} alt="template-preview" className="w-72" />
        </div>

         <div className="w-[12.5%] flex justify-center text-center">
            <a
            href={exportUrl}
            className="w-fit flex flex-col justify-center items-center text-center border border-[#DCDCDC] rounded-lg py-1 px-2 cursor-pointer"
            download
            >
                <img src={Export} alt="export" className="w-4 h-4" />
                <p className="text-pico font-light text-[#505050]">Export</p>
            </a>
        </div>

        <div className="w-[11%] flex justify-center text-center cursor-pointer">
            <img src={isActive ? Active : Inactive} alt="templates" className={`${isActive ? 'w-8 h-8' : 'w-4 h-4'}`} />
        </div>

        <div className="w-[4.5%] flex justify-end text-center">
            <img src={EditTemplate} alt="edit-template" className="w-4 h-4 cursor-pointer" />
        </div>

    </div>
  );
};

export default TemplateItem;
