"use client";

import ArrayBars from "@/components/ArrayBars";
import ControlPanel from "@/components/ControlPanel";
import Legend from "@/components/Legend";
import CodePanel from "@/components/CodePanel";
import { useSorting } from "@/hooks/useSorting";
import { codeSnippets } from "@/algorithms/codeSnippets";

export default function Home() {
  const {
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
  } = useSorting();

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Sorting Algorithm Visualizer
      </h1>

      <ControlPanel
        onSortAll={sortAll}
        onPause={pause}
        onNext={nextStep}
        onReset={resetArray}
        speed={speed}
        setSpeed={setSpeed}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
      />

      <Legend />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArrayBars
          array={array}
          activeIndices={activeIndices}
          sortedIndices={sortedIndices}
        />
        <CodePanel
          code={codeSnippets[algorithm]}
          currentLine={currentLine}
          vars={currentVars}
          values={currentValues}
        />
      </div>
    </main>
  );
}
