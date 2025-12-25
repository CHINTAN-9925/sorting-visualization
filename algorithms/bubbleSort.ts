export type SortStep =
  | {
      type: "compare";
      indices: [number, number];
      values: [number, number];
      vars: Record<string, number>;
      line: number;
    }
  | {
      type: "swap";
      array: number[];
      indices: [number, number];
      values: [number, number];
      vars: Record<string, number>;
      line: number;
    }
  | {
      type: "done";
      index: number;
      line: number;
    };

export function bubbleSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({
        type: "compare",
        indices: [j, j + 1],
        values: [a[j], a[j + 1]],
        vars: { i, j },
        line: 1,
      });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];

        steps.push({
          type: "swap",
          array: [...a],
          indices: [j, j + 1],
          values: [a[j], a[j + 1]],
          vars: { i, j },
          line: 2,
        });
      }
    }
    steps.push({ type: "done", index: a.length - i - 1, line: 0 });
  }

  return steps;
}
