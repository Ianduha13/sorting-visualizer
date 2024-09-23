'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from './ui/slider';

interface ControlsProps {
  arraySize: number;
  setArraySize: (size: number) => void;
  generateArray: () => void;
  isSorting: boolean;
  algorithms: { name: string }[];
  selectedAlgorithms: string[];
  handleAlgorithmSelection: (algorithmName: string) => void;
  startSorting: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  arraySize,
  setArraySize,
  generateArray,
  isSorting,
  algorithms,
  selectedAlgorithms,
  handleAlgorithmSelection,
  startSorting,
}) => {
  const maxAlgorithms = 3;
  const isMaxSelected = selectedAlgorithms.length >= maxAlgorithms;
  const handleSliderChange = (value: number[]) => {
    setArraySize(value[0]);
  };

  return (
    <div className="w-full flex flex-col items-center mb-4 mt-8">
      <header className=' mb-4 max-w-md text-center flex-col items-center'>
        <h1 className="text-3xl font-bold text-[#1CC558]">Algorithm Visualizer</h1>
        <h3 className='mt-2 text-sm'>This site was inspired by reading {" "} 
          <a href='https://www.goodreads.com/book/show/25666050-algorithms-to-live-by' className='font-semibold'>{" "}Algorithms to Live By{" "}</a> 
        by Brian Christian</h3>
      </header>

      <div className="inline-block w-full max-w-sm">
        <label htmlFor="arraySize" className="mr-2">
          Array Size:
        </label>
        <div className="flex items-center w-full">
          <span className="mr-2">5</span>
          <Slider
            value={[arraySize]}
            onValueChange={handleSliderChange}
            min={5}
            max={100}
            step={5}
            disabled={isSorting}
            className="flex-1"
          />
          <span className="ml-2">100</span>
        </div>

      </div>

      <div className="grid grid-cols-3 items-center my-4">
        {algorithms.map((algo) => (
          <label key={algo.name} className="mr-4 flex items-center space-x-2 text-sm">
            <Checkbox
              checked={selectedAlgorithms.includes(algo.name)}
              onCheckedChange={() => handleAlgorithmSelection(algo.name)}
              disabled={isSorting || (!selectedAlgorithms.includes(algo.name) && isMaxSelected)}
            />
            <span>{algo.name}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={startSorting}
          disabled={isSorting || selectedAlgorithms.length === 0}
          className="px-4 py-2 disabled:opacity-50"
        >
          Iniciar Ordenamiento
        </Button>
        <Button
          onClick={generateArray}
          disabled={isSorting}
          className="px-4 py-2 disabled:opacity-50"
          variant="outline"
        >
          Generar Nuevo Arreglo
        </Button>
      </div>
    </div>
  );
};

export default Controls;
