import React from 'react';

import Tabs from '../components/Tabs';
import CanvasElement from '../components/CanvasElement';
import NumberInput from '../components/NumberInput';
import LayerItem from '../components/LayerItem';

import Information from '../assets/icons/information.svg';
import Preview from '../assets/icons/preview.svg';
import Save from '../assets/icons/save.svg';
import Barcode from '../assets/icons/barcode.svg';
import DateTime from '../assets/icons/date-time.svg';
import Counter from '../assets/icons/counter.svg';
import Text from '../assets/icons/text.svg';
import Image from '../assets/icons/image.svg';
import Shape from '../assets/icons/shape.svg';
import Add from '../assets/icons/add.svg';
import EyeShow from '../assets/icons/eye-show.svg';
import EyeHide from '../assets/icons/eye-hide.svg';


const CreateTemplate: React.FC = () => {


  return (
    <div className="h-screen w-full flex flex-col justify-start items-center gap-8 pt-24">

        {/* Top Section */}
        <div className="w-full px-8 flex flex-none">

            {/* Tabs */}
            <Tabs titles={['Design', 'Parameters']}>
                {/* Design */}
                <div className='flex gap-6 text-pico font-light px-2'>
                    <CanvasElement
                        name='Barcode'
                        icon={Barcode}
                        conerIcon={Add}
                    />
                    <CanvasElement
                        name='Date/Time'
                        icon={DateTime}
                        conerIcon={Add}
                    />
                    <CanvasElement
                        name='Counter'
                        icon={Counter}
                        conerIcon={Add}
                    />
                    <CanvasElement
                        name='Text'
                        icon={Text}
                        conerIcon={Add}
                    />
                    <CanvasElement
                        name='Image'
                        icon={Image}
                        conerIcon={Add}
                    />
                    <CanvasElement
                        name='Shape'
                        icon={Shape}
                        conerIcon={Add}
                    />
                </div>
                {/* Parameters */}
                <div className='grid grid-cols-3 gap-x-20 gap-y-2 px-2 py-[1px] text-modal-size text-customBlue'>
                    <div className="flex justify-between">
                        <p className='flex items-center'>
                            Delay Before Print
                        </p>
                        <div className="w-36">
                            <NumberInput unit='ms' />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <p className='flex items-center'>
                            Quantity Delay
                        </p>
                        <div className="w-36">
                            <NumberInput unit='ms' />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <p className='flex items-center'>
                            Repeat Document
                        </p>
                        <div className="w-36">
                            <NumberInput />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <p className='flex items-center'>
                            Quantity
                        </p>
                        <div className="w-36">
                            <NumberInput />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <p className='flex items-center'>
                            Name
                        </p>
                        <div className="w-36">
                            <input type="text" className='w-full px-2 py-[.4rem] text-sm text-center border border-customGray rounded-lg' />
                        </div>
                    </div>

                </div>
            </Tabs>

            {/* Buttons */}
            <div className='flex justify-center items-end gap-4 pl-8 pb-4 text-pico font-light'>
                <button className='h-[72px] w-20 shadow-pane rounded-xl flex flex-col justify-center items-center gap-2'>
                    <img src={Information} alt="templates" className="w-7 h-7" />
                    Information
                </button>
                <button className='h-[72px] w-20 shadow-pane rounded-xl flex flex-col justify-center items-center gap-2'>
                    <img src={Preview} alt="templates" className="w-7 h-7" />
                    Preview
                </button>
                <button className='h-[72px] w-24 shadow-pane rounded-xl flex flex-col justify-center items-center gap-2 bg-customBlue text-white'>
                    <img src={Save} alt="templates" className="w-7 h-7" />
                    Save
                </button>
            </div>

        </div>

        {/* Canvas */}
        <div className="w-full h-72 pl-14 flex-none canvas">

        </div>

        {/* Controls */}
        <div className="w-full h-56 px-8 flex gap-2">
            {/* Layers */}
            <div className="w-2/12 h-full flex flex-col gap-1 overflow-scroll">
                <LayerItem
                    icon={Image}
                    name={'Image No.1'}
                    visibility={EyeShow}
                />
                <LayerItem
                    icon={Text}
                    name={'Sentence'}
                    visibility={EyeShow}
                />
                <LayerItem
                    icon={Shape}
                    name={'Circle'}
                    visibility={EyeHide}
                />
                <LayerItem
                    icon={Image}
                    name={'Image No.2'}
                    visibility={EyeShow}
                />
                <LayerItem
                    icon={Barcode}
                    name={'Serial Number'}
                    visibility={EyeShow}
                />
            </div>

            {/* Settings */}
            <div className="w-10/12 h-full rounded-xl border border-customBlue bg-customGrayLight flex gap-2 p-4">
                
                {/* Position/Size */}
                <div className="w-1/4 flex flex-col">
                    <p className='text-xs font-medium text-customGrayDark ml-2 flex-none'>Position/Size:</p>
                    <div className='flex-grow bg-white rounded border border-customGray'></div>
                </div>

                {/* More Settings */}
                <div className="w-3/4 flex flex-col">
                    <p className='text-xs font-medium text-customGrayDark ml-2 flex-none'>More Settings:</p>
                    <div className='flex-grow bg-white rounded border border-customGray'></div>
                </div>

            </div>
        </div>


    </div>
  );
};

export default CreateTemplate;
