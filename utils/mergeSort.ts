export const mergeSort = async (
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  sleep: (ms: number) => Promise<void>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>
): Promise<void> => {
  const arr = array.slice();

  const merge = async (left: number, mid: number, right: number): Promise<void> => {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < n1 && j < n2) {
      setComparing([k]);
      await sleep(1);
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      setArray([...arr]);
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      setArray([...arr]);
      setComparing([k]);
      await sleep(1);
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      setArray([...arr]);
      setComparing([k]);
      await sleep(1);
      j++;
      k++;
    }
  };

  const sort = async (left: number, right: number): Promise<void> => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await sort(left, mid);
      await sort(mid + 1, right);
      await merge(left, mid, right);
    }
  };

  await sort(0, arr.length - 1);
  setComparing([]);
};
