/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect } from 'react';
import { bubbleSort } from '@/utils/bubbleSort';
import SortingDisplays from './SortingDisplays';
import Controls from './Controls';
import { countingSort } from '@/utils/countingSort';
import { heapSort } from '@/utils/heapSort';
import { insertionSort } from '@/utils/insertionSort';
import { mergeSort } from '@/utils/mergeSort';
import { quickSort } from '@/utils/quickSort';
import { radixSort } from '@/utils/radixSort';
import { selectionSort } from '@/utils/selectionSort';

interface Algorithm {
  name: string;
  sortFunction: (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    sleep: (ms: number) => Promise<void>,
    setComparing: React.Dispatch<React.SetStateAction<number[]>>
  ) => Promise<void>;
}

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(50);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const algorithms: Algorithm[] = [
    { name: 'Bubble Sort', sortFunction: bubbleSort },
    { name: 'Quick Sort', sortFunction: quickSort },
    { name: 'Merge Sort', sortFunction: mergeSort },
    { name: 'Heap Sort', sortFunction: heapSort },
    { name: 'Insertion Sort', sortFunction: insertionSort },
    { name: 'Selection Sort', sortFunction: selectionSort },
    { name: 'Counting Sort', sortFunction: countingSort },
    { name: 'Radix Sort', sortFunction: radixSort },
  ];

  const generateArray = () => {
    const newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 500) + 5);
    }
    setArray(newArray);
    setIsSorting(false); 
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  const sleep = (milliseconds: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

const handleAlgorithmSelection = (algorithmName: string) => {
  setSelectedAlgorithms((prev) => {
    if (prev.includes(algorithmName)) {
      return prev.filter((name) => name !== algorithmName);
    } else if (prev.length < 3) {
      return [...prev, algorithmName];
    } else {
      return prev;
    }
  });
  setIsSorting(false); 
};


  const startSorting = () => {
    if (selectedAlgorithms.length === 0) return;
    setIsSorting(true);
  };

  return (
    <div className="p-4 max-w-[1100px] mx-auto ">
      <Controls
        arraySize={arraySize}
        setArraySize={setArraySize}
        generateArray={generateArray}
        isSorting={isSorting}
        algorithms={algorithms}
        selectedAlgorithms={selectedAlgorithms}
        handleAlgorithmSelection={handleAlgorithmSelection}
        startSorting={startSorting}
      />
      <SortingDisplays
        algorithms={algorithms}
        selectedAlgorithms={selectedAlgorithms}
        array={array}
        isSorting={isSorting}
        sleep={sleep}
        onSortingComplete={() => setIsSorting(false)}
      />
    </div>
  );
};

export default SortingVisualizer;
