import { useEffect, useState } from "react";
import { generateArray } from "@/utils/generateArray";
import { bubbleSort, SortStep } from "@/algorithms/bubbleSort";
import { sleep } from "@/utils/sleep";

export function useSorting() {
  const [array, setArray] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(60);

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    if (isSorting) return;
    setArray(generateArray(30));
    setActiveIndices([]);
    setSortedIndices([]);
  };

  // 🔥 NEW: Apply user custom array
  const setCustomArray = (input: string) => {
    if (isSorting) return;

    const values = input
      .split(",")
      .map(v => v.trim())
      .filter(v => v !== "")
      .map(Number);

    if (values.length === 0 || values.some(isNaN)) {
      alert("Please enter a valid comma-separated number list");
      return;
    }

    setArray(values);
    setActiveIndices([]);
    setSortedIndices([]);
  };

  const startSorting = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const steps: SortStep[] = bubbleSort(array);

    for (const step of steps) {
      if (step.type === "compare") {
        setActiveIndices(step.indices);
      }

      if (step.type === "swap") {
        setArray(step.array);
        setActiveIndices(step.indices);
      }

      if (step.type === "done") {
        setSortedIndices(prev => [...prev, step.index]);
      }

      await sleep(speed);
    }

    setActiveIndices([]);
    setIsSorting(false);
  };

  return {
    array,
    activeIndices,
    sortedIndices,
    speed,
    setSpeed,
    generateNewArray,
    setCustomArray, // 🔥 exposed
    startSorting,
    isSorting,
  };
}
