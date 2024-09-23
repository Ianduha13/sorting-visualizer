
export const algorithmDescriptions: { [key: string]: string } = {
  'Bubble Sort':
    'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  'Quick Sort':
    'Quick Sort picks an element as pivot and partitions the array around the pivot, recursively sorting the partitions.',
  'Merge Sort':
    'Merge Sort divides the array into halves, recursively sorts them, and then merges the sorted halves.',
  'Heap Sort':
    'Heap Sort converts the array into a heap data structure and repeatedly extracts the maximum element.',
  'Insertion Sort':
    'Insertion Sort builds the final sorted array one item at a time by comparing and inserting elements into their correct position.',
  'Selection Sort':
    'Selection Sort divides the array into a sorted and unsorted part and repeatedly selects the minimum element from the unsorted part.',
  'Counting Sort':
    'Counting Sort counts the number of objects that have distinct key values, then does arithmetic to calculate positions.',
  'Radix Sort':
    'Radix Sort processes each digit of the numbers, grouping numbers by their digit value, starting from the least significant digit.',
};
