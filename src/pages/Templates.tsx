import React, { useState } from 'react';
import Layout from '../components/Layout';
import TemplateItem from '../components/TemplateItem';

import Import from '../assets/icons/import.svg';
import Plus from '../assets/icons/plus.svg';
import SlabModal from '../components/SlabModal';
import { Link } from 'react-router-dom';

const Templates: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalSlabId, setModalSlabId] = useState('');

    const openModal = (slabId: string) => {
        setModalSlabId(slabId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalSlabId('');
        setIsModalOpen(false);
    };

  return (
    <Layout>
      <div className="h-full w-full flex justify-center items-center">
        <div className='w-full h-[85%] max-w-full max-h-full py-8 flex flex-col'>

            <div className="w-full px-3 flex flex-col gap-4">
                
                {/* Title & Buttons */}
                <div className="w-full flex justify-between items-center">
                    
                    <h2 className='text-customBlue text-xl font-normal tracking-wide'>Your Templates</h2>

                    <div className="w-fit flex gap-2">

                        <button className='text-customBlue text-xs font-normal px-4 py-[.6rem] border border-customBlue rounded-lg'>
                            Select
                        </button>

                        <button className='text-customBlue text-xs font-normal px-4 py-[.6rem] border border-customBlue rounded-lg flex justify-center items-center gap-1'>
                            <img src={Import} alt="templates" className="w-4 h-4" />
                            Import
                        </button>
                        
                        <Link
                            to='/create-template'
                            className='text-white bg-customBlue text-xs font-normal px-4 py-[.6rem] rounded-lg flex justify-center items-center gap-1'
                        >
                                <img src={Plus} alt="templates" className="w-4 h-4" />
                                Create New
                        </Link>

                    </div>

                </div>

                {/* List Header */}
                <div className='w-full h-12 bg-customGrayLight rounded-lg flex justify-start items-center px-8 py-2'>
                    
                        <p className='w-[14%] text-xs text-center font-light'>Name</p>
                    
                        <p className='w-[8%] text-xs text-center font-light'>Print Count</p>
                    
                        <p className='w-[22%] text-xs text-center font-light'>Last Updated</p>

                        <p className='w-[26%] text-xs font-light text-center'>Preview</p>

                        <p className='w-[16%] text-xs text-center font-light'>Export</p>

                        <p className='w-[8%] text-xs text-center font-light'>Set as Active</p>

                </div>
            </div>
            
            {/* List Items */}
            <div className="w-full flex flex-col gap-4 overflow-y-scroll px-3 py-3">
                <TemplateItem
                    slabId={'4297'}
                    slabName={'Granite'}
                    printCount={'103'}
                    lastModified={'2023/8/11'}
                    exportUrl={''}
                    isActive={true}
                    onSlabSettingsClick={openModal}
                />

                <TemplateItem
                    slabId={'5251'}
                    slabName={'Onyx'}
                    printCount={'13459'}
                    lastModified={'2023/4/23'}
                    exportUrl={''}
                    isActive={false}
                    onSlabSettingsClick={openModal}
                />

                <TemplateItem
                    slabId={'5251'}
                    slabName={'Onyx'}
                    printCount={'13459'}
                    lastModified={'2023/4/23'}
                    exportUrl={''}
                    isActive={false}
                    onSlabSettingsClick={openModal}
                />

                <TemplateItem
                    slabId={'5251'}
                    slabName={'Onyx'}
                    printCount={'13459'}
                    lastModified={'2023/4/23'}
                    exportUrl={''}
                    isActive={false}
                    onSlabSettingsClick={openModal}
                />


                <TemplateItem
                    slabId={'5251'}
                    slabName={'Onyx'}
                    printCount={'13459'}
                    lastModified={'2023/4/23'}
                    exportUrl={''}
                    isActive={false}
                    onSlabSettingsClick={openModal}
                />

                <TemplateItem
                    slabId={'5251'}
                    slabName={'Onyx'}
                    printCount={'13459'}
                    lastModified={'2023/4/23'}
                    exportUrl={''}
                    isActive={false}
                    onSlabSettingsClick={openModal}
                />

                <TemplateItem
                    slabId={'5251'}
                    slabName={'Onyx'}
                    printCount={'13459'}
                    lastModified={'2023/4/23'}
                    exportUrl={''}
                    isActive={false}
                    onSlabSettingsClick={openModal}
                />

                <TemplateItem
                    slabId={'5251'}
                    slabName={'Onyx'}
                    printCount={'13459'}
                    lastModified={'2023/4/23'}
                    exportUrl={''}
                    isActive={false}
                    onSlabSettingsClick={openModal}
                />

                <TemplateItem
                    slabId={'5251'}
                    slabName={'Onyx'}
                    printCount={'13459'}
                    lastModified={'2023/4/23'}
                    exportUrl={''}
                    isActive={false}
                    onSlabSettingsClick={openModal}
                />

                <TemplateItem
                    slabId={'5251'}
                    slabName={'Onyx'}
                    printCount={'13459'}
                    lastModified={'2023/4/23'}
                    exportUrl={''}
                    isActive={false}
                    onSlabSettingsClick={openModal}
                />
            </div>

            {/* Render the modal if open */}
            {isModalOpen && (
                <SlabModal slabId={modalSlabId} onClose={closeModal} />
            )}
          
        </div>
      </div>
    </Layout>
  );
};

export default Templates;
