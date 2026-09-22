import type { DailyStudyMinutes } from "@/lib/statistics";

const WEEKDAY_LABELS = ["D", "S", "T", "Q", "Q", "S", "S"];

export function StudyTimeChart({ data }: { data: DailyStudyMinutes[] }) {
  const maxMinutes = Math.max(1, ...data.map((d) => d.minutes));

  return (
    <div className="rounded border border-line bg-paper p-4">
      <h3 className="font-medium">Tempo de estudo — últimos 14 dias</h3>
      <div className="mt-4 flex h-32 items-end gap-1.5">
        {data.map((d) => {
          const heightPercent = Math.round((d.minutes / maxMinutes) * 100);
          const weekday = WEEKDAY_LABELS[new Date(d.date).getDay()];
          return (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-24 w-full items-end">
                <div
                  className="w-full rounded-t bg-teal"
                  style={{ height: `${d.minutes === 0 ? 2 : heightPercent}%` }}
                  title={`${d.minutes} min`}
                />
              </div>
              <span className="font-mono text-[10px] text-ink-muted">{weekday}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
