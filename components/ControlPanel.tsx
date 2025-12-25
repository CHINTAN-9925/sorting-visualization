import { AlgorithmType } from "@/algorithms";

type Props = {
  onGenerate: () => void;
  onStart: () => void;
  speed: number;
  setSpeed: (value: number) => void;
  algorithm: AlgorithmType;
  setAlgorithm: (algo: AlgorithmType) => void;
  disabled: boolean;
};

export default function ControlPanel({
  onGenerate,
  onStart,
  speed,
  setSpeed,
  algorithm,
  setAlgorithm,
  disabled,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-4">

      <div className="flex gap-4">
        <button
          onClick={onGenerate}
          disabled={disabled}
          className="px-4 py-2 bg-green-600 rounded disabled:opacity-50"
        >
          Generate Array
        </button>

        <button
          onClick={onStart}
          disabled={disabled}
          className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
        >
          Start Sorting
        </button>
      </div>

      <select
        value={algorithm}
        disabled={disabled}
        onChange={(e) =>
          setAlgorithm(e.target.value as AlgorithmType)
        }
        className="px-4 py-2 bg-gray-800 border border-gray-600 rounded"
      >
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
      </select>

      <div className="flex items-center gap-3 w-64">
        <span className="text-sm">Fast</span>
        <input
          type="range"
          min={10}
          max={200}
          step={10}
          value={speed}
          disabled={disabled}
          onChange={(e) =>
            setSpeed(Number(e.target.value))
          }
          className="w-full"
        />
        <span className="text-sm">Slow</span>
      </div>

      <p className="text-sm text-gray-400">
        Speed: {speed} ms
      </p>

    </div>
  );
}
