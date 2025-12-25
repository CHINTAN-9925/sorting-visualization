type Props = {
  code: string[];
  currentLine: number | null;
};

export default function CodePanel({ code, currentLine }: Props) {
  return (
    <pre className="bg-gray-900 p-4 rounded text-sm mt-6">
      {code.map((line, idx) => (
        <div
          key={idx}
          className={`px-2 py-1 rounded ${
            currentLine === idx ? "bg-yellow-500 text-black" : ""
          }`}
        >
          {line}
        </div>
      ))}
    </pre>
  );
}
