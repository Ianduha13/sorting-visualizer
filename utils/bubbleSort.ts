export const bubbleSort = async (
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  sleep: (ms: number) => Promise<void>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>
): Promise<void> => {
  const arr = array.slice();
  const n = arr.length;
  let swapped;
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      setComparing([j, j + 1]);
      await sleep(1);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        setArray([...arr]);
        await sleep(1);
      }
    }
    if (!swapped) break;
  }
  setComparing([]);
};
