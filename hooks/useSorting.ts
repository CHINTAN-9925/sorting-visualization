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

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    if (isSorting) return;
    setArray(generateArray(30));
    setActiveIndices([]);
    setSortedIndices([]);
  };

  const startSorting = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const steps: SortStep[] =
      algorithms[algorithm](array);

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
    algorithm,        
    setAlgorithm,     
    generateNewArray,
    startSorting,
    isSorting,
  };
}
