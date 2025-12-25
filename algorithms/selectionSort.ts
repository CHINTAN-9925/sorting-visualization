import { SortStep } from "./bubbleSort";

export function selectionSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];

  for (let i = 0; i < a.length; i++) {
    let min = i;

    for (let j = i + 1; j < a.length; j++) {
      steps.push({ type: "compare", indices: [min, j] });

      if (a[j] < a[min]) {
        min = j;
      }
    }

    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      steps.push({
        type: "swap",
        array: [...a],
        indices: [i, min],
      });
    }

    steps.push({ type: "done", index: i });
  }

  return steps;
}
