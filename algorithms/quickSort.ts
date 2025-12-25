import { SortStep } from "./bubbleSort";

export function quickSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];

  function partition(low: number, high: number) {
    const pivot = a[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        type: "compare",
        indices: [j, high],
        values: [a[j], pivot],
        vars: { low, high, i, j, pivot },
        line: 1,
      });

      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];

        steps.push({
          type: "swap",
          array: [...a],
          indices: [i, j],
          values: [a[i], a[j]],
          vars: { i, j, pivot },
          line: 2,
        });
      }
    }

    [a[i + 1], a[high]] = [a[high], a[i + 1]];

    steps.push({
      type: "swap",
      array: [...a],
      indices: [i + 1, high],
      values: [a[i + 1], a[high]],
      vars: { pivotIndex: i + 1, pivot },
      line: 3,
    });

    return i + 1;
  }

  function sort(l: number, h: number) {
    if (l < h) {
      const p = partition(l, h);
      sort(l, p - 1);
      sort(p + 1, h);
    }
  }

  sort(0, a.length - 1);

  for (let i = 0; i < a.length; i++) {
    steps.push({
      type: "done",
      index: i,
      line: 0,
    });
  }

  return steps;
}
