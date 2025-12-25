type Props = {
  array: number[];
  activeIndices: number[];
  sortedIndices: number[];
};

export default function ArrayBars({
  array,
  activeIndices,
  sortedIndices,
}: Props) {
  const getColor = (i: number) => {
    if (sortedIndices.includes(i)) return "bg-green-500";
    if (activeIndices.includes(i)) return "bg-red-500";
    return "bg-blue-400";
  };

  return (
    <div className="flex items-end justify-center gap-1 h-80">
      {array.map((v, i) => (
        <div
          key={i}
          className={`relative flex justify-center items-end ${getColor(
            i
          )} w-8 rounded`}
          style={{ height: `${v * 3}px` }}
        >
          <span className="absolute bottom-1 text-xs font-bold">
            {v}
          </span>
        </div>
      ))}
    </div>
  );
}
