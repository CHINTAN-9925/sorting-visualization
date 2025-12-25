type Props = {
  code: string[];
  currentLine: number | null;
  vars: Record<string, number> | null;
  values: [number, number] | null;
};

export default function CodePanel({
  code,
  currentLine,
  vars,
  values,
}: Props) {
  return (
    <div className="bg-gray-900 p-4 rounded text-sm space-y-4">
      <pre>
        {code.map((line, i) => (
          <div
            key={i}
            className={`px-2 py-1 rounded ${
              currentLine === i ? "bg-yellow-500 text-black" : ""
            }`}
          >
            {line}
          </div>
        ))}
      </pre>

      {vars && (
        <div>
          <div className="font-semibold mb-1">Variables</div>
          {Object.entries(vars).map(([k, v]) => (
            <div key={k}>
              {k} = {v}
            </div>
          ))}
        </div>
      )}

      {values && (
        <div>
          <div className="font-semibold mb-1">Comparing</div>
          {values[0]} ↔ {values[1]}
        </div>
      )}
    </div>
  );
}
