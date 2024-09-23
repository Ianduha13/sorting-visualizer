// app/components/SortingDisplays.tsx
'use client';

import React, { useState, useEffect } from 'react';
import SortingDisplay from './SortingDisplay';

interface Algorithm {
  name: string;
  sortFunction: (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    sleep: (ms: number) => Promise<void>,
    setComparing: React.Dispatch<React.SetStateAction<number[]>>
  ) => Promise<void>;
}

interface SortingDisplaysProps {
  algorithms: Algorithm[];
  selectedAlgorithms: string[];
  array: number[];
  isSorting: boolean;
  sleep: (ms: number) => Promise<void>;
  onSortingComplete: () => void;
}

const SortingDisplays: React.FC<SortingDisplaysProps> = ({
  algorithms,
  selectedAlgorithms,
  array,
  isSorting,
  sleep,
  onSortingComplete,
}) => {
  const [completed, setCompleted] = useState<number>(0);

  useEffect(() => {
    if (completed === selectedAlgorithms.length && selectedAlgorithms.length > 0) {
      onSortingComplete();
    }
  }, [completed, selectedAlgorithms.length, onSortingComplete]);

  useEffect(() => {
    if (isSorting) {
      setCompleted(0); // Resetear el contador al iniciar un nuevo ordenamiento
    }
  }, [isSorting]);

  return (
    <div className="displays-container grid md:grid-cols-2 mt-8">
      {selectedAlgorithms.map((algoName) => {
        const algo = algorithms.find((a) => a.name === algoName);
        if (!algo) return null;
        return (
          <SortingDisplay
            key={algo.name}
            algorithm={algo}
            initialArray={array}
            isSorting={isSorting}
            sleep={sleep}
            onComplete={() => setCompleted((prev) => prev + 1)}
          />
        );
      })}
    </div>
  );
};

export default SortingDisplays;
