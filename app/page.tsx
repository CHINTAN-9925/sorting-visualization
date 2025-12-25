"use client";

import ArrayBars from "@/components/ArrayBars";
import ControlPanel from "@/components/ControlPanel";
import { useSorting } from "@/hooks/useSorting";

export default function Home() {
  const {
    array,
    activeIndices,
    sortedIndices,
    speed,
    setSpeed,
    generateNewArray,
    setCustomArray,
    startSorting,
    isSorting,
  } = useSorting();

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Sorting Algorithm Visualizer
      </h1>

      <ControlPanel
        onGenerate={generateNewArray}
        onStart={startSorting}
        speed={speed}
        setSpeed={setSpeed}
        onCustomArray={setCustomArray}
        disabled={isSorting}
      />

      <ArrayBars
        array={array}
        activeIndices={activeIndices}
        sortedIndices={sortedIndices}
      />
    </main>
  );
}
