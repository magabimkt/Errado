interface StatCardProps {
  label: string;
  value: string | number;
  accent?: "teal" | "ochre" | "brick";
}

const accentClasses = {
  teal: "text-teal",
  ochre: "text-ochre",
  brick: "text-brick",
};

export function StatCard({ label, value, accent = "teal" }: StatCardProps) {
  return (
    <div className="rounded border border-line bg-paper p-4">
      <p className="text-sm text-ink-muted">{label}</p>
      <p className={`mt-1 font-mono text-3xl font-medium ${accentClasses[accent]}`}>
        {value}
      </p>
    </div>
  );
}
