import { useEffect, useRef, useState } from "react";
import { generateArray } from "@/utils/generateArray";
import { sleep } from "@/utils/sleep";
import { algorithms, AlgorithmType } from "@/algorithms";
import { SortStep } from "@/algorithms/bubbleSort";

export function useSorting() {
  const [array, setArray] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [speed, setSpeed] = useState(60);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("bubble");
  const [currentLine, setCurrentLine] = useState<number | null>(null);

  const [steps, setSteps] = useState<SortStep[]>([]);
  const [stepIndex, setStepIndex] = useState(0);

  const stepsRef = useRef<SortStep[]>([]);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const runningRef = useRef(false);

  useEffect(() => {
    setArray(generateArray(30));
  }, []);

  const applyStep = (step: SortStep) => {
    setCurrentLine(step.line);

    if (step.type === "compare") {
      setActiveIndices(step.indices);
    }

    if (step.type === "swap") {
      setArray(step.array);
      setActiveIndices(step.indices);
    }

    if (step.type === "done") {
      setSortedIndices(p => [...p, step.index]);
    }
  };

  const initStepsIfNeeded = () => {
    if (stepsRef.current.length === 0) {
      const generated = algorithms[algorithm](array);
      stepsRef.current = generated;
      setSteps(generated);
      indexRef.current = 0;
      setStepIndex(0);
      setSortedIndices([]);
    }
  };

  const runLoop = async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    pausedRef.current = false;

    while (
      indexRef.current < stepsRef.current.length &&
      !pausedRef.current
    ) {
      const step = stepsRef.current[indexRef.current];
      applyStep(step);
      indexRef.current += 1;
      setStepIndex(indexRef.current);
      await sleep(speed);
    }

    runningRef.current = false;
  };

  const sortAll = () => {
    initStepsIfNeeded();
    runLoop();
  };

  const pause = () => {
    pausedRef.current = true;
  };

  const nextStep = () => {
    initStepsIfNeeded();

    if (indexRef.current >= stepsRef.current.length) return;

    pausedRef.current = true;
    const step = stepsRef.current[indexRef.current];
    applyStep(step);
    indexRef.current += 1;
    setStepIndex(indexRef.current);
  };

  return {
    array,
    activeIndices,
    sortedIndices,
    speed,
    setSpeed,
    algorithm,
    setAlgorithm,
    currentLine,
    sortAll,
    pause,
    nextStep,
  };
}
