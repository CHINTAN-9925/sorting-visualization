import { AlgorithmType } from ".";

export const codeSnippets: Record<AlgorithmType, string[]> = {
  bubble: [
    "for i = 0 to n-1",
    "  if arr[j] > arr[j+1]",
    "  swap arr[j], arr[j+1]",
  ],
  selection: [
    "for i = 0 to n-1",
    "min = i",
    "if arr[j] < arr[min]",
    "min = j",
    "swap arr[i], arr[min]",
  ],
  insertion: [
    "for i = 1 to n-1",
    "key = arr[i]",
    "while j >= 0",
    "if arr[j] > key",
    "shift right",
    "insert key",
  ],
  merge: [
    "divide array",
    "sort halves",
    "merge halves",
  ],
  quick: [
    "choose pivot",
    "partition",
    "swap",
  ],
};
