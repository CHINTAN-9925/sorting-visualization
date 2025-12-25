export default function Legend() {
  const items = [
    { color: "bg-blue-400", label: "Unsorted" },
    { color: "bg-red-500", label: "Comparing / Swapping" },
    { color: "bg-green-500", label: "Sorted" },
  ];

  return (
    <div className="flex justify-center gap-8 mt-6">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={`w-4 h-4 ${item.color} rounded`} />
          <span className="text-sm text-gray-300">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
