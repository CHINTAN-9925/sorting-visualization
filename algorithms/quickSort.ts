import { SortStep } from "./bubbleSort";

export function quickSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];

  function partition(low: number, high: number) {
    const pivot = a[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({ type: "compare", indices: [j, high] });

      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({
          type: "swap",
          array: [...a],
          indices: [i, j],
        });
      }
    }

    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    steps.push({
      type: "swap",
      array: [...a],
      indices: [i + 1, high],
    });

    return i + 1;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  }

  sort(0, a.length - 1);

  for (let i = 0; i < a.length; i++) {
    steps.push({ type: "done", index: i });
  }

  return steps;
}
