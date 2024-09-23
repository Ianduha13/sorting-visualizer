export const countingSort = async (
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  sleep: (ms: number) => Promise<void>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>
): Promise<void> => {
  const arr = array.slice();
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);

  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
    setComparing([i]);
    await sleep(1);
  }

  let index = 0;
  for (let i = 0; i < range; i++) {
    while (count[i] > 0) {
      arr[index] = i + min;
      setArray([...arr]);
      setComparing([index]);
      index++;
      count[i]--;
      await sleep(1);
    }
  }
  setComparing([]);
};
