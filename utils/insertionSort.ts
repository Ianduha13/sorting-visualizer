export const insertionSort = async (
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  sleep: (ms: number) => Promise<void>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>
): Promise<void> => {
  const arr = array.slice();

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      setComparing([j, j + 1]);
      arr[j + 1] = arr[j];
      j--;
      setArray([...arr]);
      await sleep(1);
    }
    arr[j + 1] = key;
    setArray([...arr]);
    await sleep(1);
  }
  setComparing([]);
};
