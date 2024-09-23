export const quickSort = async (
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  sleep: (ms: number) => Promise<void>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>
): Promise<void> => {
  const arr = array.slice();

  const partition = async (low: number, high: number): Promise<number> => {
    const pivot = arr[high];
    let i = low;

    for (let j = low; j < high; j++) {
      setComparing([j, high]);
      await sleep(1);
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        i++;
      }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]];
    setArray([...arr]);
    return i;
  };

  const sort = async (low: number, high: number): Promise<void> => {
    if (low < high) {
      const pi = await partition(low, high);
      await sort(low, pi - 1);
      await sort(pi + 1, high);
    }
  };

  await sort(0, arr.length - 1);
  setComparing([]);
};
