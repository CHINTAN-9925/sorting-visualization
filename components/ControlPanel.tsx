import { useState } from "react";

type Props = {
  onGenerate: () => void;
  onStart: () => void;
  speed: number;
  setSpeed: (value: number) => void;
  onCustomArray: (value: string) => void;
  disabled: boolean;
};

export default function ControlPanel({
  onGenerate,
  onStart,
  speed,
  setSpeed,
  onCustomArray,
  disabled,
}: Props) {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col items-center gap-4">

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onGenerate}
          disabled={disabled}
          className="px-4 py-2 bg-green-600 rounded disabled:opacity-50"
        >
          Generate Random Array
        </button>

        <button
          onClick={onStart}
          disabled={disabled}
          className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
        >
          Start Sorting
        </button>
      </div>

      {/* 🔥 Custom Array Input */}
      <div className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="e.g. 10, 5, 30, 8"
          value={input}
          disabled={disabled}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-600"
        />
        <button
          onClick={() => onCustomArray(input)}
          disabled={disabled}
          className="px-4 py-2 bg-purple-600 rounded disabled:opacity-50"
        >
          Apply
        </button>
      </div>

      {/* Speed Slider */}
      <div className="flex items-center gap-3 w-64">
        <span className="text-sm">Fast</span>
        <input
          type="range"
          min={10}
          max={200}
          step={10}
          value={speed}
          disabled={disabled}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full"
        />
        <span className="text-sm">Slow</span>
      </div>

      <p className="text-sm text-gray-400">Speed: {speed} ms</p>
    </div>
  );
}
