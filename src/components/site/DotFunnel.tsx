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

export function DotSphere({ className }: { className?: string }) {
  const dots: { x: number; y: number; o: number }[] = [];
  const n = 1400;
  for (let i = 0; i < n; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);
    dots.push({
      x: +(200 + x * 180).toFixed(2),
      y: +(200 + z * 180).toFixed(2),
      o: +(0.12 + 0.55 * ((y + 1) / 2)).toFixed(3),
    });
  }
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Global platform reach">
      <g style={{ transformOrigin: "200px 200px", animation: "spin-slow 90s linear infinite" }}>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="0.9" fill="white" opacity={d.o} />
        ))}
      </g>
    </svg>
  );
}
