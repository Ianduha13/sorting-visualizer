export const selectionSort = async (
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  sleep: (ms: number) => Promise<void>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>
): Promise<void> => {
  const arr = array.slice();
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < n; j++) {
      setComparing([min_idx, j]);
      await sleep(1);
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    if (min_idx !== i) {
      [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
      setArray([...arr]);
      await sleep(1);
    }
  }
  setComparing([]);
};
