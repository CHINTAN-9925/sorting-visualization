import { useEffect, useState } from "react";
import { generateArray } from "@/utils/generateArray";
import { sleep } from "@/utils/sleep";
import { algorithms, AlgorithmType } from "@/algorithms";
import { SortStep } from "@/algorithms/bubbleSort";

export function useSorting() {
  const [array, setArray] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(60);

  const [algorithm, setAlgorithm] =
    useState<AlgorithmType>("bubble");

  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    if (isSorting) return;
    setArray(generateArray(30));
    setActiveIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
  };

  const startSorting = async () => {
    if (isSorting) return;
    setIsSorting(true);
    setComparisons(0);
    setSwaps(0);

    const steps: SortStep[] =
      algorithms[algorithm](array);

    for (const step of steps) {
      if (step.type === "compare") {
        setActiveIndices(step.indices);
        setComparisons((c) => c + 1);
      }

      if (step.type === "swap") {
        setArray(step.array);
        setActiveIndices(step.indices);
        setSwaps((s) => s + 1);
      }

      if (step.type === "done") {
        setSortedIndices((prev) => [...prev, step.index]);
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
    algorithm,
    setAlgorithm,
    comparisons,
    swaps,
    generateNewArray,
    startSorting,
    isSorting,
  };
}
