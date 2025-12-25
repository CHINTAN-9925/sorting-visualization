import { AlgorithmType } from "@/algorithms";

type Props = {
  onSortAll: () => void;
  onPause: () => void;
  onNext: () => void;
  speed: number;
  setSpeed: (value: number) => void;
  algorithm: AlgorithmType;
  setAlgorithm: (algo: AlgorithmType) => void;
};

export default function ControlPanel({
  onSortAll,
  onPause,
  onNext,
  speed,
  setSpeed,
  algorithm,
  setAlgorithm,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-4">

      <div className="flex gap-4">
        <button
          onClick={onSortAll}
          className="px-4 py-2 bg-green-600 rounded"
        >
          Sort All
        </button>

        <button
          onClick={onPause}
          className="px-4 py-2 bg-yellow-600 rounded"
        >
          Pause
        </button>

        <button
          onClick={onNext}
          className="px-4 py-2 bg-purple-600 rounded"
        >
          Next Step
        </button>
      </div>

      <select
        value={algorithm}
        onChange={e =>
          setAlgorithm(e.target.value as AlgorithmType)
        }
        className="px-4 py-2 bg-gray-800 border rounded"
      >
        <option value="bubble">Bubble</option>
        <option value="selection">Selection</option>
        <option value="insertion">Insertion</option>
        <option value="merge">Merge</option>
        <option value="quick">Quick</option>
      </select>

      <div className="flex items-center gap-3 w-64">
        <span className="text-sm">Fast</span>
        <input
          type="range"
          min={10}
          max={200}
          step={10}
          value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
          className="w-full"
        />
        <span className="text-sm">Slow</span>
      </div>
    </div>
  );
}
