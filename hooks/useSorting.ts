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
  const speedRef = useRef(speed);

  const [algorithm, setAlgorithm] = useState<AlgorithmType>("bubble");
  const [currentLine, setCurrentLine] = useState<number | null>(null);
  const [currentVars, setCurrentVars] =
    useState<Record<string, number> | null>(null);
  const [currentValues, setCurrentValues] =
    useState<[number, number] | null>(null);

  const stepsRef = useRef<SortStep[]>([]);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const runningRef = useRef(false);

  useEffect(() => {
    setArray(generateArray(20));
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const applyStep = (step: SortStep) => {
    setCurrentLine(step.line);

    if ("vars" in step) {
      setCurrentVars(step.vars);
    } else {
      setCurrentVars(null);
    }

    if ("values" in step) {
      setCurrentValues(step.values);
    } else {
      setCurrentValues(null);
    }

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

  const ensureSteps = () => {
    if (stepsRef.current.length === 0) {
      stepsRef.current = algorithms[algorithm](array);
      indexRef.current = 0;
      setSortedIndices([]);
      setActiveIndices([]);
      setCurrentLine(null);
      setCurrentVars(null);
      setCurrentValues(null);
    }
  };

  const sortAll = async () => {
    if (runningRef.current) return;

    ensureSteps();
    pausedRef.current = false;
    runningRef.current = true;

    while (
      indexRef.current < stepsRef.current.length &&
      !pausedRef.current
    ) {
      applyStep(stepsRef.current[indexRef.current]);
      indexRef.current++;
      await sleep(speedRef.current);
    }

    runningRef.current = false;
  };

  const pause = () => {
    pausedRef.current = true;
  };

  const nextStep = () => {
    ensureSteps();
    pausedRef.current = true;

    if (indexRef.current >= stepsRef.current.length) return;

    applyStep(stepsRef.current[indexRef.current]);
    indexRef.current++;
  };

  const resetArray = () => {
    pausedRef.current = true;
    runningRef.current = false;
    stepsRef.current = [];
    indexRef.current = 0;

    setArray(generateArray(20));
    setActiveIndices([]);
    setSortedIndices([]);
    setCurrentLine(null);
    setCurrentVars(null);
    setCurrentValues(null);
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
    currentVars,
    currentValues,
    sortAll,
    pause,
    nextStep,
    resetArray,
  };
}
