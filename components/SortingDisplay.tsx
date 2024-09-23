/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { algorithmDescriptions } from './constants/algorithmsDescriptions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import {Timer} from "lucide-react"

interface Algorithm {
  name: string;
  sortFunction: (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    sleep: (ms: number) => Promise<void>,
    setComparing: React.Dispatch<React.SetStateAction<number[]>>
  ) => Promise<void>;
}

interface SortingDisplayProps {
  algorithm: Algorithm;
  initialArray: number[];
  isSorting: boolean;
  sleep: (ms: number) => Promise<void>;
  onComplete: () => void;
}

const SortingDisplay: React.FC<SortingDisplayProps> = ({
  algorithm,
  initialArray,
  isSorting,
  sleep,
  onComplete,
}) => {
  const [array, setArray] = useState<number[]>([...initialArray]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [hasSorted, setHasSorted] = useState<boolean>(false);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [chartData, setChartData] = useState<{ name: string; value: number; isComparing: boolean }[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null); 
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    setArray([...initialArray]);
    setHasSorted(false);
    setExecutionTime(0); 
  }, [initialArray]);

  useEffect(() => {
    const newChartData = array.map((value, index) => ({
      name: index.toString(),
      value,
      isComparing: comparing.includes(index),
    }));
    setChartData(newChartData);
  }, [array, comparing]);

  useEffect(() => {
    const sortArray = async () => {
      startTimeRef.current = performance.now(); 

      timerRef.current = setInterval(() => {
        const currentTime = performance.now();
        setExecutionTime(currentTime - startTimeRef.current);
      }, 100); 

      await algorithm.sortFunction(
        array.slice(),
        setArray,
        sleep,
        setComparing
      );

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      const endTime = performance.now();
      setExecutionTime(endTime - startTimeRef.current);

      setComparing([]);
      setHasSorted(true);
      onComplete();
    };

    if (isSorting && !hasSorted) {
      sortArray();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isSorting, hasSorted]);

  const formatTime = (milliseconds: number): string => {
    const seconds = milliseconds / 1000;
    return `${seconds.toFixed(1)} s`;
  };

  return (
    <Card className="sorting-display m-4 flex-1 lg:min-w-[420px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{algorithm.name}</CardTitle>
        <CardDescription className="mt-2 text-gray-500 flex items-center gap-1">
          <Timer className='size-5 text-gray-500'/>
          Tiempo de Ejecución: {formatTime(executionTime)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} barCategoryGap="1%" margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Bar
              dataKey="value"
              isAnimationActive={false}
              animationDuration={0}
              label={false}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isComparing ? '#ef4444' : '#1CC558'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="description mt-4 text-gray-700 text-sm">
          {algorithmDescriptions[algorithm.name]}
        </p>
      </CardContent>
    </Card>
  );
};

export default SortingDisplay;
