import { SortStep } from "./bubbleSort";

export function quickSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];

  function partition(low: number, high: number) {
    const pivot = a[high];
    let i = low - 1;

    steps.push({
      type: "compare",
      indices: [high, high],
      values: [pivot, pivot],
      vars: { low, high, pivot },
      line: 2,
    });

    for (let j = low; j < high; j++) {
      steps.push({
        type: "compare",
        indices: [j, high],
        values: [a[j], pivot],
        vars: { low, high, i, j, pivot },
        line: 2,
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
          line: 3,
        });
      }
    }

    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    const pivotIndex = i + 1;

    steps.push({
      type: "swap",
      array: [...a],
      indices: [pivotIndex, high],
      values: [a[pivotIndex], a[high]],
      vars: { pivotIndex, pivot },
      line: 3,
    });

    return pivotIndex;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const pivotIndex = partition(low, high);

      steps.push({
        type: "compare",
        indices: [low, high],
        values: [a[low], a[high]],
        vars: { low, high, pivotIndex },
        line: 4,
      });

      sort(low, pivotIndex - 1);
      sort(pivotIndex + 1, high);
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
