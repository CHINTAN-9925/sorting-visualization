import { SortStep } from "./bubbleSort";

export function insertionSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    while (j >= 0) {
      steps.push({ type: "compare", indices: [j, j + 1] });

      if (a[j] > key) {
        a[j + 1] = a[j];
        steps.push({
          type: "swap",
          array: [...a],
          indices: [j, j + 1],
        });
        j--;
      } else {
        break;
      }
    }

    a[j + 1] = key;
    steps.push({
      type: "swap",
      array: [...a],
      indices: [j + 1, j + 1],
    });

    steps.push({ type: "done", index: i });
  }

  return steps;
}
