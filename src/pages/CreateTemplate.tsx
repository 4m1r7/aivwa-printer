import React, { useEffect, useMemo, useState } from 'react';
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
import TextInput from '../components/TextInput';
import DropdownSelect from '../components/DropdownSelect';

// Define the CanvasElement types
const canvasElements = [
  { type: 'Barcode',
    icon: Barcode,
    element: BarcodeGenerator,
    closingTag: false,
    resizable: false,
    width: 'fit-content',
    height: 'fit-content',
    attributes: {
        width: 2,
        height: 100,
        value:'sample barcode',
        font:'monospace',
        fontSize: 10,
        background:'#0000',
    }
  },
  { type: 'Time',
    icon: DateTime,
    element: 'p',
    closingTag: true,
    content: '2023-03-31 20:48',
    resizable: false,
    width: 'fit-content',
    height: 'fit-content',
    attributes: {
        style: {
            fontSize: '2rem',
            fontFamily: 'Arial',
        },
        'data-year': '2023',
        'data-month': '03',
        'data-day': '31',
        'data-hour': '20',
        'data-minute': '48',
        'data-separator': '-',
        'data-live-time': true,
    }
  },
  { type: 'Counter',
    icon: Counter,
    element: 'p',
    closingTag: true,
    content: '1001',
    resizable: false,
    width: 'fit-content',
    height: 'fit-content',
    attributes: {
        style: {
            fontSize: '2rem',
            fontFamily: 'Arial',
        }
    }
  },
  { type: 'Text',
    icon: Text,
    element: 'p',
    closingTag: true,
    content: 'Sample Text',
    resizable: false,
    width: 'fit-content',
    height: 'fit-content',
    attributes: {
        style: {
            fontSize: '2rem',
            fontFamily: 'Arial',
        },
    }
  },
  { type: 'Image',
    icon: Image,
    element: 'img',
    closingTag: false,
    resizable: false,
    width: 200,
    height: 200,
    attributes: {
        src: '/sample-image.png',
    }
  },
  { type: 'Shape',
    icon: Shape,
    element: 'svg',
    closingTag: true,
    resizable: true,
    options: ['Circle', 'Rectangle', 'Line'],
    content: [
                <ellipse cx="50%" cy="50%" rx="50%" ry="50%" stroke="black" stroke-width="1" fill="transparent" />,
                <rect x="0" y="0" width="100%" height="100%" stroke="black" stroke-width="3" fill="transparent" />,
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="black" strokeWidth="2" />,
            ],
    width: [200, 250, 300],
    height: [200, 150, 20],
    attributes: {
        width: "100%",
        height: "100%",
    }
  },
];


const CreateTemplate: React.FC = () => {

    const [canvasItems, setCanvasItems] = useState<Record<string, any>[]>([]);
    const [activeLayer, setActiveLayer] = useState<number>(0);
    const [isShapeSelectorOpen, setIsShapeSelectorOpen] = useState<boolean>(false);
    // remove refs if not used - TODO
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
                id: Math.random().toString(),
                order: canvasItems.length + 1,
                name: `Layer ${canvasItems.length + 1} – ${canvasElement.type}`,
                visiblity: true,
                xPos: 700,
                yPos: 100,
                ...canvasElement,
            };
            // Add the element to the canvasItems state
            setCanvasItems((prevCanvasItems) => [...prevCanvasItems, newCanvasItem]);
            setActiveLayer(canvasItems.length);
        }
    }

    
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
    }


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
    }


    // Update canvas item after changes in more settings
    const handleMoreSettingsChange = (property:string, value:any, unit= '', attribute=false, style=false) => {

        // Create a copy of the canvasItems array to avoid mutating state directly
        const updatedCanvasItems = [...canvasItems];
        const updatedCanvasItem = { ...updatedCanvasItems[activeLayer] };
        
        // Update the changed value of the canvas item
        if (style) {
            const updatedCanvasItemAtts = { ...updatedCanvasItems[activeLayer].attributes };
            updatedCanvasItemAtts.style = {...updatedCanvasItemAtts.style, [property]: `${value}${unit}` };
            updatedCanvasItem.attributes = updatedCanvasItemAtts;
        } else if (attribute) {
            const updatedCanvasItemAtts = { ...updatedCanvasItems[activeLayer].attributes };
            updatedCanvasItemAtts[property] = unit ? `${value}${unit}` : value;
            updatedCanvasItem.attributes = updatedCanvasItemAtts;
        } else {
            updatedCanvasItem.content = value;
        }

        // Update the content if changed element is of type 'Time'
        if (updatedCanvasItem.type === 'Time') {
            const separator = updatedCanvasItem.attributes['data-separator'];
            updatedCanvasItem.content = `${updatedCanvasItem.attributes['data-year']}${separator}${updatedCanvasItem.attributes['data-month']}${separator}${updatedCanvasItem.attributes['data-day']}
                                     ${updatedCanvasItem.attributes['data-hour']}:${updatedCanvasItem.attributes['data-minute']}`;
        }

        updatedCanvasItems[activeLayer] = updatedCanvasItem;

        // Update the canvasItems state
        setCanvasItems(updatedCanvasItems);
    }

    // Update canvas item after changes in more settings
    const deleteActiveItem = () => {
        
        const sliceIndex = activeLayer;

        if (activeLayer + 1 === canvasItems.length && activeLayer >= 0) {
            setActiveLayer(prev => prev - 1);
        }

        // Create a new array without the element at the specified index
        const updatedCanvasItems = [...canvasItems.slice(0, sliceIndex), ...canvasItems.slice(sliceIndex + 1)];

        // Update the state variable with the new array
        setCanvasItems(updatedCanvasItems);
    }


  return (
    <div className="h-screen w-full flex flex-col justify-start items-center gap-8 pt-24">

        {/* Top Section */}
        <div className="w-full px-8 flex flex-none">

            {/* Tabs */}
            <Tabs titles={['Design', 'Parameters']}>

                {/* Design */}
                <div className='flex gap-6 text-pico font-light px-2'>
                    {/* All elements except shapes */}
                    {canvasElements
                    .filter(canvasElement => canvasElement.type !== "Shape")
                    .map((canvasElement, index) => (
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
                                        onClick={() => handleCanvasElementClick({ ...ShapesObject, type:option, content:ShapesObject.content[index], width:ShapesObject.width[index], height:ShapesObject.height[index] })} 
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

                    return (
                        <Rnd
                            key={`item-${index}`}
                            ref={itemRefs[index]}
                            enableResizing={canvasItem.type === 'Line' ? { left:true, right:true } : canvasItem.resizable}
                            dragHandleClassName="drag-handle"
                            bounds='parent'
                            style={{cursor: 'move'}}
                            className={`
                                absolute drag-handle overflow-hidden rotate-45
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

                            onDrag={(e, d) => handleCanvasItemEvents(index, d, { width: canvasItem.width, height: canvasItem.height })}
                            onResize={(e, direction, ref, delta, position) => handleCanvasItemEvents(index, position, ref.getBoundingClientRect().toJSON())}   
                            lockAspectRatio = { canvasItem.type === 'Circle' ? true : false }
                        >
                            <div className={`w-full h-full ${canvasItem.visiblity ? 'flex' : 'hidden'}`} >
                                {canvasItem.closingTag === true
                                    ? <canvasItem.element {...canvasItem.attributes}> {canvasItem.content}</canvasItem.element>
                                    : <canvasItem.element {...canvasItem.attributes} />
                                }
                            </div>
                        </Rnd>
                    );
                })}
            </div>
        </div>





        {/* Controls */}
        <div className="w-full h-56 px-8 flex gap-2">
            {/* Layers */}
            <div className="w-2/12 h-full overflow-scroll">
                
                {/* Placholder layer item */}
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

                {/* Main layers */}
                <div className="h-fit flex flex-col-reverse gap-1">
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
                        <NumberInput
                            currentValue={ canvasItems[activeLayer] ? canvasItems[activeLayer].rotation : null }
                            title='° :'
                            alternateStyle
                            onValueChange={(value: number) => handlePositionSizeChange('rotation', value)}
                        />
                    </div>
                </div>






                {/* More Settings */}
                <div className="w-3/4 flex flex-col">
                    <p className='text-xs font-medium text-customGrayDark ml-2 flex-none'>More Settings:</p>
                    <div className='p-5 flex-grow flex gap-3 bg-white rounded border border-customGray relative'>

                        {canvasItems[activeLayer] && (<button 
                            className='absolute right-2 bottom-2 h-fit w-fit py-1 px-2 rounded-lg text-white text-xs bg-red-300 hover:bg-red-500'
                            onClick={() => deleteActiveItem()}
                        >
                            Delete
                        </button>)}

                        {/* More settings' smaller left column */}
                        <div className="w-1/4 h-full flex flex-col">

                            {/* Content change input for 'Text' type */}
                            {canvasItems[activeLayer] && ['Text'].includes(canvasItems[activeLayer].type) &&
                                <div className="flex-1 flex items-center">
                                    <TextInput
                                        currentValue={ canvasItems[activeLayer].content }
                                        title='Text :'
                                        onValueChange={(value: string) => handleMoreSettingsChange('content', value)}
                                    />
                                </div>
                            }

                            {/* Content change input for 'Counter' type */}
                            {canvasItems[activeLayer] && ['Counter'].includes(canvasItems[activeLayer].type) &&
                                <div className="flex-1 flex items-center">
                                    <NumberInput
                                        currentValue={ parseInt(canvasItems[activeLayer].content) }
                                        title='Start from :'
                                        alternateStyle
                                        onValueChange={(value: number) => handleMoreSettingsChange('content', value)}
                                    />
                                </div>
                            }

                            {/* Font Size & Font Family for 'Text', 'Counter', and 'Time' types */}
                            {canvasItems[activeLayer] && ['Text', 'Time', 'Counter'].includes(canvasItems[activeLayer].type) && (<>
                                <div className="flex-1 flex items-center">
                                    <NumberInput
                                        currentValue={ parseInt(canvasItems[activeLayer].attributes.style.fontSize.slice(0, -3)) }
                                        title='Text Size :'
                                        alternateStyle
                                        onValueChange={(value: number) => handleMoreSettingsChange('fontSize', value, 'rem', true, true)}
                                    />
                                </div>
                                <div className="flex-1 flex items-center">
                                    <DropdownSelect 
                                        title='Text Font :'
                                        currentValue={ canvasItems[activeLayer].attributes.style.fontFamily }
                                        options={['Arial', 'Helvetica Neue', 'Roboto']}
                                        onValueChange={(value: string) => handleMoreSettingsChange('fontFamily', value, '', true, true)}
                                    />
                                </div>
                            </>)}

                            {/* Live time Checkbox for 'Time' type */}
                            {canvasItems[activeLayer] && ['Time'].includes(canvasItems[activeLayer].type) &&
                                <div className="flex-1 flex justify-between items-center px-2">
                                    {/* Live time checkbox for 'Time' type */}
                                    <p className='text-xs text-customGrayDark'>Set time from your computer</p>
                                    <input
                                        type="checkbox"
                                        checked={canvasItems[activeLayer].attributes['data-live-time']}
                                        className='w-3.5 h-3.5'
                                        onChange={(e) => handleMoreSettingsChange('data-live-time', e.target.checked, '', true)}
                                    />
                                </div>
                            }

                            {/* Input Text, Font Size, Font Family for 'Barcode' type */}
                            {canvasItems[activeLayer] && ['Barcode'].includes(canvasItems[activeLayer].type) && (<>
                                <div className="flex-1 flex items-center">
                                    <TextInput
                                        currentValue={ canvasItems[activeLayer].attributes.value }
                                        title='Text :'
                                        onValueChange={(value: string) => handleMoreSettingsChange('value', value, '', true)}
                                    />
                                </div>
                                <div className="flex-1 flex items-center">
                                    <NumberInput
                                        currentValue={ parseInt(canvasItems[activeLayer].attributes.fontSize) }
                                        title='Text Size :'
                                        alternateStyle
                                        onValueChange={(value: number) => handleMoreSettingsChange('fontSize', value, '', true)}
                                    />
                                </div>
                                <div className="flex-1 flex items-center">
                                    <DropdownSelect 
                                        title='Text Font :'
                                        currentValue={ canvasItems[activeLayer].attributes.font }
                                        options={['Monospace', 'Arial', 'Helvetica Neue', 'Roboto']}
                                        onValueChange={(value: string) => handleMoreSettingsChange('font', value, '', true)}
                                    />
                                </div>
                            </>)}
                        </div>

                        {/* More settings' larger right column */}
                        <div className='w-1/2 border-l border-customGrayLight pl-2'>

                            {/* Barcode settings and format for 'Barcode' type */}
                            {canvasItems[activeLayer] && ['Barcode'].includes(canvasItems[activeLayer].type) &&
                            <div className='h-full w-1/3 flex flex-col'>

                                <div className="flex-1 flex items-center">
                                    <NumberInput
                                        currentValue={ parseInt(canvasItems[activeLayer].attributes.width) }
                                        title='Bar Width :'
                                        alternateStyle
                                        onValueChange={(value: number) => handleMoreSettingsChange('width', value, '', true)}
                                    />
                                </div>

                                <div className="flex-1 flex items-center">
                                    <NumberInput
                                        currentValue={ parseInt(canvasItems[activeLayer].attributes.height) }
                                        title='Height :'
                                        alternateStyle
                                        onValueChange={(value: number) => handleMoreSettingsChange('height', value, '', true)}
                                    />
                                </div>

                                <div className='flex-1' />

                            </div>}


                            {/* Time settings and format for 'Time' type */}
                            {canvasItems[activeLayer] && ['Time'].includes(canvasItems[activeLayer].type) &&
                            <div className='h-full flex flex-col'>

                                <div className="flex-1 flex justify-start gap-3 items-center">
                                    <DropdownSelect 
                                        title='Date Fromat :'
                                        options={['YYYY-MM-DD', 'YYYY/MM/DD']}
                                        values={['-', '/']}
                                        onValueChange={(value: string) => {
                                            handleMoreSettingsChange('data-separator', value, '', true)
                                        }}
                                    />
                                </div>

                                <div className="flex-1 pl-2 flex items-center relative">
                                    <DropdownSelect 
                                        currentValue={ canvasItems[activeLayer].attributes['data-year'] }
                                        options={['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014']}
                                        onValueChange={(value: string) => {
                                            handleMoreSettingsChange('data-year', value, '', true)
                                        }}
                                    />
                                    <DropdownSelect 
                                        currentValue={ canvasItems[activeLayer].attributes['data-month'] }
                                        options={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']}
                                        onValueChange={(value: string) => {
                                            handleMoreSettingsChange('data-month', value, '', true)
                                        }}
                                    />
                                    <DropdownSelect 
                                        currentValue={ canvasItems[activeLayer].attributes['data-day'] }
                                        options={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']}
                                        onValueChange={(value: string) => {
                                            handleMoreSettingsChange('data-day', value, '', true)
                                        }}
                                    />
                                    <div className='h-full w-6' />
                                    <DropdownSelect 
                                        currentValue={ canvasItems[activeLayer].attributes['data-hour'] }
                                        options={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']}

                                        onValueChange={(value: string) => {
                                            handleMoreSettingsChange('data-hour', value, '', true)
                                        }}
                                    />
                                    <DropdownSelect 
                                        currentValue={ canvasItems[activeLayer].attributes['data-minute'] }
                                        options={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60']}
                                        onValueChange={(value: string) => {
                                            handleMoreSettingsChange('data-minute', value, '', true)
                                        }}
                                    />
                                    {!canvasItems[activeLayer].attributes['data-live-time'] && <div className="absolute inset-0 bg-white/75" />}
                                </div>
                                <div className='flex-1'></div>
                            </div>}

                        </div>

                    </div>
                </div>

            </div>
        </div>


    </div>
  );
};

export default CreateTemplate;
