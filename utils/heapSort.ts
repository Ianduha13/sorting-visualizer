export const heapSort = async (
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  sleep: (ms: number) => Promise<void>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>
): Promise<void> => {
  const arr = array.slice();
  const n = arr.length;

  const heapify = async (n: number, i: number): Promise<void> => {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n) {
      setComparing([i, l]);
      await sleep(1);
      if (arr[l] > arr[largest]) {
        largest = l;
      }
    }

    if (r < n) {
      setComparing([largest, r]);
      await sleep(1);
      if (arr[r] > arr[largest]) {
        largest = r;
      }
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      await sleep(1);
      await heapify(n, largest);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    setArray([...arr]);
    setComparing([0, i]);
    await sleep(1);
    await heapify(i, 0);
  }
  setComparing([]);
};
