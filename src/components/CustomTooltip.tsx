interface TooltipEntry {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active: boolean;
  payload: TooltipEntry[];
  label: string;
}

export const CustomTooltip = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (active && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-slate-200">
        <p className="font-semibold text-sm mb-2">{label}</p>

        {payload.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 text-xs"
          >
            <span className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>

            <span className="font-semibold">
              {entry.value.toFixed(0)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
