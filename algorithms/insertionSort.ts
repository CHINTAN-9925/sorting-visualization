import { SortStep } from "./bubbleSort";

export function insertionSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    while (j >= 0) {
      steps.push({
        type: "compare",
        indices: [j, j + 1],
        values: [a[j], key],
        vars: { i, j, key },
        line: 2,
      });

      if (a[j] > key) {
        a[j + 1] = a[j];

        steps.push({
          type: "swap",
          array: [...a],
          indices: [j, j + 1],
          values: [a[j], key],
          vars: { i, j, key },
          line: 3,
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
      values: [key, key],
      vars: { i, j: j + 1, key },
      line: 4,
    });

    steps.push({
      type: "done",
      index: i,
      line: 0,
    });
  }

  return steps;
}
