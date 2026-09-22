import type { AccuracyBreakdown } from "@/lib/statistics";

export function AccuracyBreakdownList({
  title,
  items,
  accent = "teal",
  emptyMessage,
}: {
  title: string;
  items: AccuracyBreakdown[];
  accent?: "teal" | "ochre" | "brick";
  emptyMessage: string;
}) {
  const barColor = { teal: "bg-teal", ochre: "bg-ochre", brick: "bg-brick" }[accent];

  return (
    <div className="rounded border border-line bg-paper p-4">
      <h3 className="font-medium">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-2 text-sm text-ink-muted">{emptyMessage}</p>
      ) : (
        <div className="mt-3 flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.key}>
              <div className="flex items-center justify-between text-sm">
                <span>{item.label}</span>
                <span className="font-mono text-ink-muted">
                  {item.correct}/{item.attempts} ({item.percent}%)
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded bg-line">
                <div
                  className={`h-full transition-all ${barColor}`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
