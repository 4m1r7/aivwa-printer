import React from 'react';

interface ProgessSquaresProps {
  progress: number;
  setProgress: (newValue: number) => void;
  total: number;
}

const ProgessSquares: React.FC<ProgessSquaresProps> = ({ progress, setProgress, total }) => {
  const squares = Array.from({ length: total }).map((_, index) => (
    <div
      key={index}
      className={`${index < progress ? 'bg-customBlue' : 'bg-[#DFDFDF]'}
                w-5 h-5 rounded cursor-pointer`}
      onClick={() => setProgress(index + 1)}
    />
  ));

  return <div className='w-min flex gap-[.1rem] border border-b-color p-[.1rem] rounded'>{squares}</div>;
};

export default ProgessSquares;
