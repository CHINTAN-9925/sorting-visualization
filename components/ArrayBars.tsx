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
  const getBarColor = (index: number) => {
    if (sortedIndices.includes(index)) return "bg-green-500";
    if (activeIndices.includes(index)) return "bg-red-500";
    return "bg-blue-400";
  };

  return (
    <div className="flex items-end justify-center gap-1 h-80 mt-10">
      {array.map((value, index) => (
        <div
          key={index}
          className={`relative flex items-end justify-center ${getBarColor(
            index
          )} w-8 rounded-t-md transition-all duration-200 shadow-md`}
          style={{ height: `${value * 3}px` }}
        >
          <span className="absolute bottom-1 text-xs font-bold text-black select-none">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
