import { SortStep } from "./bubbleSort";

export function mergeSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];

  function merge(l: number, m: number, r: number) {
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      steps.push({ type: "compare", indices: [l + i, m + 1 + j], line: 2 });

      if (left[i] <= right[j]) a[k++] = left[i++];
      else a[k++] = right[j++];

      steps.push({ type: "swap", array: [...a], indices: [k - 1, k - 1], line: 3 });
    }

    while (i < left.length) {
      a[k++] = left[i++];
      steps.push({ type: "swap", array: [...a], indices: [k - 1, k - 1], line: 3 });
    }

    while (j < right.length) {
      a[k++] = right[j++];
      steps.push({ type: "swap", array: [...a], indices: [k - 1, k - 1], line: 3 });
    }
  }

  function divide(l: number, r: number) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    divide(l, m);
    divide(m + 1, r);
    merge(l, m, r);
  }

  divide(0, a.length - 1);

  for (let i = 0; i < a.length; i++) {
    steps.push({ type: "done", index: i, line: 0 });
  }

  return steps;
}
