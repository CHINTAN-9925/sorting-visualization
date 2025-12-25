import { AlgorithmType } from ".";

export const codeSnippets: Record<AlgorithmType, string[]> = {
  bubble: [
    "for i = 0 to n-1",
    "  for j = 0 to n-i-2",
    "    if arr[j] > arr[j+1]",
    "      swap arr[j], arr[j+1]",
  ],

  selection: [
    "for i = 0 to n-1",
    "  min = i",
    "  for j = i+1 to n-1",
    "    if arr[j] < arr[min]",
    "      min = j",
    "  swap arr[i], arr[min]",
  ],

  insertion: [
    "for i = 1 to n-1",
    "  key = arr[i]",
    "  j = i - 1",
    "  while j >= 0 and arr[j] > key",
    "    arr[j+1] = arr[j]",
    "    j = j - 1",
    "  arr[j+1] = key",
  ],

  merge: [
    "mergeSort(arr, left, right)",
    "  if left < right",
    "    mid = (left + right) / 2",
    "    mergeSort(arr, left, mid)",
    "    mergeSort(arr, mid+1, right)",
    "    merge(arr, left, mid, right)",
  ],

  quick: [
    "quickSort(arr, low, high)",
    "  if low < high",
    "    pivotIndex = partition(arr, low, high)",
    "    quickSort(arr, low, pivotIndex - 1)",
    "    quickSort(arr, pivotIndex + 1, high)",
  ],
};
