type Props = {
  comparisons: number;
  swaps: number;
};

export default function Stats({ comparisons, swaps }: Props) {
  return (
    <div className="flex justify-center gap-10 mt-4 text-sm">
      <div className="px-4 py-2 bg-gray-800 rounded">
        Comparisons: <span className="font-bold">{comparisons}</span>
      </div>
      <div className="px-4 py-2 bg-gray-800 rounded">
        Swaps: <span className="font-bold">{swaps}</span>
      </div>
    </div>
  );
}
