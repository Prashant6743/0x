export function DotFunnel({ className }: { className?: string }) {
  const dots: { x: number; y: number; o: number }[] = [];
  const rows = 34;
  const cols = 46;
  for (let r = 0; r < rows; r++) {
    const t = r / (rows - 1);
    const radius = 150 * (1 - t) + 14 * t;
    const y = 30 + t * 300;
    for (let c = 0; c < cols; c++) {
      const a = (c / cols) * Math.PI * 2;
      dots.push({
        x: +(180 + Math.cos(a) * radius).toFixed(2),
        y: +(y + Math.sin(a) * radius * 0.22).toFixed(2),
        o: +(0.2 + 0.75 * Math.abs(Math.sin(a)) * (1 - t * 0.4)).toFixed(3),
      });
    }
  }
  return (
    <svg viewBox="0 0 360 380" className={className} role="img" aria-label="Conversion funnel">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="1.1" fill="white" opacity={d.o} />
      ))}
    </svg>
  );
}
