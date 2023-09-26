import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import BarcodeGenerator from 'react-barcode';

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
import More from '../assets/icons/more.svg';

// Define the CanvasElement types
const canvasElements = [
  { type: 'Barcode',
    icon: Barcode,
    element: <BarcodeGenerator value="sample barcode" background='#0000' height={100} />,
    resizable: true,
    size: {
        width: 400,
        height: 150,
    },
  },
  { type: 'Time',
    icon: DateTime,
    element: <p>2023/06/15 14:34PM</p>,
    resizable: false,
    size: {
        width: 310,
        height: 50,
    },
    exclusiveProps: {
        style: {
            fontSize: '2rem',
        }
    }
  },
  { type: 'Counter',
    icon: Counter,
    element: <p>0055</p>,
    resizable: false,
    size: {
        width: 80,
        height: 50,
    },
    exclusiveProps: {
        style: {
            fontSize: '2rem',
        }
    }
  },
  { type: 'Text',
    icon: Text,
    element: <p>Sample Text</p>,
    resizable: false,
    size: {
        width: 170,
        height: 50,
    },
    exclusiveProps: {
        style: {
            fontSize: '1.2rem',
        }
    }
  },
  { type: 'Image',
    icon: Image,
    element: <img src='/sample-image.png' alt=''/>,
    resizable: true,
    size: {
        width: 200,
        height: 200,
    },
    exclusiveProps: {
    }
  },
  { type: 'Shape',
    options: ['Circle', 'Rectangle', 'Line'],
    icon: Shape,
    resizable: true,
    element: [<svg width="100%" height="100%">
                <ellipse cx="50%" cy="50%" rx="50%" ry="50%" stroke="black" stroke-width="1" fill="transparent" />
             </svg>,
             <svg width="100%" height="100%">
                <rect x="0" y="0" width="100%" height="100%" stroke="black" stroke-width="3" fill="transparent" />
             </svg>,
             <svg width="100%" height="100%">
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="black" strokeWidth="1" />
            </svg>],
    size: {
        width: 150,
        height: 150,
    },
    exclusiveProps: {
    }
  },
];


const CreateTemplate: React.FC = () => {

    const [canvasItems, setCanvasItems] = useState<Record<string, any>[]>([]);
    const [activeLayer, setActiveLayer] = useState<number>(0);
    const [isShapeSelectorOpen, setIsShapeSelectorOpen] = useState<boolean>(false);
    const itemRefs = canvasItems.map(() => React.createRef<Rnd>());

    const ShapesObject = useMemo(() => {
        return canvasElements.find(canvasElement => canvasElement.type === "Shape");
    }, []);

    // Function to handle element creation(CanvasElement click)
    const handleCanvasElementClick = (canvasElement: any) => {
        if (canvasElement.type === 'Shape') {
            setIsShapeSelectorOpen(!isShapeSelectorOpen);
        } else {
            const newCanvasItem = {
                type: canvasElement.type,
                name: `Layer ${canvasItems.length + 1} – ${canvasElement.type}`,
                id: Math.random().toString(),
                icon: canvasElement.icon,
                element: canvasElement.element,
                visiblity: true,
                resizable: canvasElement.resizable,
                xPos: 700,
                yPos: 100,
                width: canvasElement.size.width,
                height: canvasElement.size.height,
                rotation: 0,
                order: canvasItems.length + 1,
                exclusiveProps: {...canvasElement.exclusiveProps}
            };
            // Add the element to the canvasItems state
            setCanvasItems((prevCanvasItems) => [...prevCanvasItems, newCanvasItem]);
        }
    };

    
    // Toggle the visibility of a layer and its corresponding canvas item
    const toggleElementVisibility = (isVisible: boolean, index: number) => {

        // Create a copy of the canvasItems array to avoid mutating state directly
        const updatedCanvasItems = [...canvasItems];
        const updatedCanvasItem = { ...updatedCanvasItems[index] };

        // Update the visibility of the canvas item
        updatedCanvasItem.visiblity = isVisible;
        updatedCanvasItems[index] = updatedCanvasItem;

        // Update the canvasItems state
        setCanvasItems([...updatedCanvasItems]);
        console.log(canvasItems);
    }


    // Update canvas item after drag and resize events using Rnd
    const handleCanvasItemEvents = (index: number, position: { x: number, y: number }, size: { width: number, height: number }) => {
        
        // Activate the clicked items'layer
        setActiveLayer(index)
        
        // Create a copy of the canvasItems array to avoid mutating state directly
        const updatedCanvasItems = [...canvasItems];
        const updatedCanvasItem = { ...updatedCanvasItems[index] };

        // Update the position and size of the canvas item
        updatedCanvasItem.xPos = position.x;
        updatedCanvasItem.yPos = position.y;
        updatedCanvasItem.width = size.width;
        updatedCanvasItem.height = size.height;

        updatedCanvasItems[index] = updatedCanvasItem;

        // Update the canvasItems state
        setCanvasItems(updatedCanvasItems);
    };



    // Update canvas item after manual position/size changes
    const handlePositionSizeChange = (property: string, value: number) => {
        
        // Create a copy of the canvasItems array to avoid mutating state directly
        const updatedCanvasItems = [...canvasItems];
        const updatedCanvasItem = { ...updatedCanvasItems[activeLayer] };

        // Update the changed value of the canvas item
        updatedCanvasItem[property] = value;
        updatedCanvasItems[activeLayer] = updatedCanvasItem;

        // Update the canvasItems state
        setCanvasItems(updatedCanvasItems);
    };





  return (
    <div className="h-screen w-full flex flex-col justify-start items-center gap-8 pt-24">

        {/* Top Section */}
        <div className="w-full px-8 flex flex-none">

            {/* Tabs */}
            <Tabs titles={['Design', 'Parameters']}>

                {/* Design */}
                <div className='flex gap-6 text-pico font-light px-2'>
                    {/* All elements except shapes */}
                    {canvasElements.filter(canvasElement => canvasElement.type !== "Shape").map((canvasElement, index) => (
                        <div onClick={() => handleCanvasElementClick(canvasElement)} key={canvasElement.type}>
                            <CanvasElement
                                key={`element-${index}`}
                                name={canvasElement.type}
                                icon={canvasElement.icon}
                                conerIcon={Add}
                            />
                        </div>
                    ))}
                    {/* Shape element and its children */}
                    <div onClick={() => handleCanvasElementClick({type:'Shape'})} key='Shape' className='relative flex justify-center items-center'>
                        <CanvasElement
                            key='element-last'
                            name='Shape'
                            icon={Shape}
                            conerIcon={More}
                        />
                        {isShapeSelectorOpen && (
                            <div className='absolute h-4/5 left-[120%] pl-2 border-l border-customBlue flex flex-col'>
                                {ShapesObject?.options?.map((option, index) => (
                                    <div 
                                        onClick={() => handleCanvasElementClick({...ShapesObject, type:option, element:ShapesObject.element[index]})} 
                                        key={`shape-type-${option}`}
                                        className='w-full px-1 flex-1 flex items-center hover:bg-customBlue hover:text-white cursor-pointer'
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
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
        <div className='w-full h-72 flex-none overflow-scroll'>
            <div
                className="w-full h-full canvas relative ml-16"
            >
                {canvasItems.map((canvasItem, index) => {
                    
                    // Spread canvasItem's other properties (excluding 'element') into props
                    const { element, ...props } = canvasItem;

                    return (
                        <Rnd
                            key={`item-${index}`}
                            ref={itemRefs[index]}
                            enableResizing={canvasItem.resizable}
                            dragHandleClassName="drag-handle"
                            bounds='parent'
                            style={{cursor: 'move'}}
                            className={`
                                absolute drag-handle overflow-hidden
                                ${canvasItem.resizable ? 'border border-dashed border-gray-400' : ''}
                                ${canvasItem.type}-element
                            `}
                            default={{
                                x: canvasItem.xPos,
                                y: canvasItem.yPos,
                                width: canvasItem.width,
                                height: canvasItem.height,
                            }}
                            size={{ width: canvasItem.width, height: canvasItem.height }}
                            position={{ x: canvasItem.xPos, y: canvasItem.yPos }}
                            {...props.exclusiveProps}

                            onDrag={(e, d) => handleCanvasItemEvents(index, d, { width: canvasItem.width, height: canvasItem.height })}
                            onResize={(e, direction, ref, delta, position) => handleCanvasItemEvents(index, position, ref.getBoundingClientRect().toJSON())}
                                
                        >
                            <div className={`w-full h-full ${canvasItem.visiblity ? 'flex' : 'hidden'}`}>
                                {canvasItem.element}
                            </div>
                        </Rnd>
                    );
                })}
            </div>
        </div>

        {/* Controls */}
        <div className="w-full h-56 px-8 flex gap-2">
            {/* Layers */}
            <div className="w-2/12 h-full flex flex-col gap-1 overflow-scroll">
                {canvasItems.length < 1 && 
                    <LayerItem
                    icon={Text}
                    name={'Layer 0'}
                    visibilityIcons={[EyeShow]}
                    activeLayer={false}
                    index={0}
                    toggleElementVisibility={() => {}}
                    onClick={() => {}}
                    />
                }
                {canvasItems.map((canvasItem, index) => {

                // Define props for the LayerItem based on canvasItem
                const layerItemProps = {
                    icon: canvasItem.icon,
                    name: canvasItem.name,
                    visibilityIcons: [EyeShow, EyeHide]
                };

                return (
                    <LayerItem
                        key={`layer-${index}`}
                        {...layerItemProps}
                        index={index}
                        toggleElementVisibility={toggleElementVisibility}
                        activeLayer ={index === activeLayer}
                        onClick={() => setActiveLayer(index)}
                    />
                );
            })}

            </div>


            {/* Settings */}
            <div className="w-10/12 h-full rounded-xl border border-customBlue bg-customGrayLight flex gap-2 p-4">
                
                {/* Position/Size */}
                <div className="w-1/4 flex flex-col">
                    <p className='text-xs font-medium text-customGrayDark ml-2 flex-none'>Position/Size:</p>
                    <div className='canvas-items-setting flex-grow bg-white rounded border border-customGray grid grid-cols-2 gap-0 p-5 justify-center items-center'>
                        <NumberInput
                            currentValue={ canvasItems[activeLayer] ? canvasItems[activeLayer].xPos : null }
                            title='X :'
                            alternateStyle
                            onValueChange={(value: number) => handlePositionSizeChange('xPos', value)}
                        />
                        <NumberInput
                            currentValue={ canvasItems[activeLayer] ? canvasItems[activeLayer].yPos : null }
                            title='Y :'
                            alternateStyle
                            onValueChange={(value: number) => handlePositionSizeChange('yPos', value)}
                        />
                        <NumberInput
                            currentValue={ canvasItems[activeLayer] ? canvasItems[activeLayer].width : null }
                            title='Width :'
                            alternateStyle
                            onValueChange={(value: number) => handlePositionSizeChange('width', value)}
                        />
                        <NumberInput
                            currentValue={ canvasItems[activeLayer] ? canvasItems[activeLayer].height : null }
                            title='Height :'
                            alternateStyle
                            onValueChange={(value: number) => handlePositionSizeChange('height', value)}
                        />
                        <NumberInput alternateStyle />
                    </div>
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
