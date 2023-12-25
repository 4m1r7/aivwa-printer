import LeftChevron from '../assets/icons/left-chevron.svg';
import RightChevron from '../assets/icons/right-chevron.svg';

interface SettingNumberInputProps {
  title?: string;
  unit?: string;
  value: number;
  alternateStyle?: boolean;
  onValueChange?: (value: number) => void;
}

const SettingNumberInput: React.FC<SettingNumberInputProps> = ({ title, unit, value, alternateStyle, onValueChange }) => {


  const handleValueUpdate = (updatedValue: number) => {
    if (onValueChange) {
      onValueChange(updatedValue);
    }
  };



  return (
    <div className={`w-fit flex items-center relative
                     ${alternateStyle ? 'alternate-style-input h-full' : 'h-fit'}
                     ${title ? 'pl-2' : ''}`}
    >

      <img
        src={LeftChevron}
        alt=""
        className={`w-2 h-3 absolute cursor-pointer
                    ${alternateStyle ? 'bottom-[25%] -rotate-90 right-3' : 'left-2'}`}
        onClick={() => {if (value > 0) { handleValueUpdate(value - 1)}}} />

      <img
        src={RightChevron}
        alt=""
        className={`w-2 h-3 absolute cursor-pointer
                    ${alternateStyle ? 'top-[25%] -rotate-90 right-3' : 'left-4'}`}
        onClick={(e) => { handleValueUpdate(value + 1) }} />

      {title && <label className='text-xs text-customGrayDarker font-light whitespace-nowrap'>{title}</label>}
      <input
        type="number"
        value={value}
        className={`w-full py-[.4rem] text-left text-sm outline-none
                    ${title ? 'pl-2' : 'pl-7'}
                    ${unit ? 'pr-[20%]' : 'pr-2'}
                    ${alternateStyle ? '' : 'border border-customGray rounded-lg'}`}
        onChange={(e) => {
          handleValueUpdate(parseInt(e.target.value, 10))
        }}
        />

      <p className='text-xs text-customGrayDark absolute right-[5%]'>{unit}</p>
    </div>
  );
};

export default SettingNumberInput;
