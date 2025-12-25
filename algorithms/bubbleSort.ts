export type SortStep =
  | { type: "compare"; indices: [number, number] }
  | { type: "swap"; array: number[]; indices: [number, number] }
  | { type: "done"; index: number };

export function bubbleSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({ type: "compare", indices: [j, j + 1] });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...a],
        });
      }
    }
    steps.push({ type: "done", index: a.length - i - 1 });
  }

  return steps;
}
