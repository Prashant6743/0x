import { useEffect, useRef, useState } from "react";

interface TagNode {
  text: string;
  x: number;
  y: number;
  z: number;
  size: number;
  highlight: boolean;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  radius: number;
}

const TAGS = [
  { text: "REACT", size: 33, highlight: true },
  { text: "NEXT.JS", size: 27, highlight: false },
  { text: "FIGMA", size: 30, highlight: true },
  { text: "WEBGL", size: 39, highlight: true },
  { text: "SWIFT", size: 26, highlight: false },
  { text: "SUPABASE", size: 27, highlight: false },
  { text: "MOTION", size: 29, highlight: false },
  { text: "SHOPIFY", size: 32, highlight: true },
  { text: "AI", size: 27, highlight: false },
  { text: "TAILWIND", size: 27, highlight: false },
  { text: "TYPESCRIPT", size: 30, highlight: true },
  { text: "GRAPHQL", size: 26, highlight: false },
];

export function TechGlobe3D({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // Setup 3D Particles
    const particleCount = 420;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      particles.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
        radius: Math.random() * 1.0 + 0.7,
      });
    }

    // Setup 3D Tech Tags using Fibonacci distribution
    const tagNodes: TagNode[] = TAGS.map((tag, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / TAGS.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        text: tag.text,
        size: tag.size,
        highlight: tag.highlight,
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      };
    });

    let angleX = 0.003;
    let angleY = 0.004;
    let targetAngleX = 0.003;
    let targetAngleY = 0.004;

    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (isDragging) {
        const deltaX = mouseX - lastMouseX;
        const deltaY = mouseY - lastMouseY;
        targetAngleY = deltaX * 0.0003;
        targetAngleX = -deltaY * 0.0003;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
      } else {
        const cx = width / 2;
        const cy = height / 2;
        targetAngleY = (mouseX - cx) * 0.00003;
        targetAngleX = -(mouseY - cy) * 0.00003;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      const rect = canvas.getBoundingClientRect();
      lastMouseX = e.clientX - rect.left;
      lastMouseY = e.clientY - rect.top;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Rotate point 3D
    const rotatePoint = (
      p: { x: number; y: number; z: number },
      sinX: number,
      cosX: number,
      sinY: number,
      cosY: number,
    ) => {
      // Y-axis rotation
      const x = p.x * cosY - p.z * sinY;
      let z = p.x * sinY + p.z * cosY;
      let y = p.y;

      // X-axis rotation
      const y2 = y * cosX - z * sinX;
      z = y * sinX + z * cosX;
      y = y2;

      p.x = x;
      p.y = y;
      p.z = z;
    };

    let activeHoverText: string | null = null;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth inertia
      angleX += (targetAngleX - angleX) * 0.08;
      angleY += (targetAngleY - angleY) * 0.08;

      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);
      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);

      const radius = Math.min(width, height) * 0.43;
      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 400;

      // Rotate particles
      particles.forEach((p) => rotatePoint(p, sinX, cosX, sinY, cosY));

      // Draw particle dots in pure white
      particles.forEach((p) => {
        const scale = focalLength / (focalLength - p.z * radius * 0.6);
        const px = cx + p.x * radius;
        const py = cy + p.y * radius;
        const alpha = Math.max(0.1, Math.min(0.95, (p.z + 1) / 2));

        ctx.beginPath();
        ctx.arc(px, py, p.radius * Math.max(0.6, scale * 0.85), 0, Math.PI * 2);
        ctx.fillStyle =
          p.z > 0.2 ? `rgba(255, 255, 255, ${alpha})` : `rgba(255, 255, 255, ${alpha * 0.45})`;
        ctx.fill();
      });

      // Draw white constellation lines on front hemisphere
      for (let i = 0; i < particles.length; i += 7) {
        const p1 = particles[i]!;
        if (p1.z < 0.1) continue;
        for (let j = i + 1; j < particles.length; j += 12) {
          const p2 = particles[j]!;
          if (p2.z < 0.1) continue;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 0.35) {
            const px1 = cx + p1.x * radius;
            const py1 = cy + p1.y * radius;
            const px2 = cx + p2.x * radius;
            const py2 = cy + p2.y * radius;
            const lineAlpha = (1 - dist / 0.35) * 0.2 * ((p1.z + p2.z) / 2);

            ctx.beginPath();
            ctx.moveTo(px1, py1);
            ctx.lineTo(px2, py2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Rotate tech tags
      tagNodes.forEach((t) => rotatePoint(t, sinX, cosX, sinY, cosY));

      // Sort tags by Z for correct depth rendering
      const sortedTags = [...tagNodes].sort((a, b) => a.z - b.z);

      activeHoverText = null;

      sortedTags.forEach((tag) => {
        const scale = focalLength / (focalLength - tag.z * radius * 0.5);
        const px = cx + tag.x * radius;
        const py = cy + tag.y * radius;
        const depthAlpha = Math.max(0.18, Math.min(1.0, (tag.z + 1.2) / 2.2));
        const fontSize = Math.max(16, Math.round(tag.size * Math.max(0.85, scale * 1.0)));

        ctx.font = `900 ${fontSize}px "Inter", system-ui, -apple-system, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const textMetrics = ctx.measureText(tag.text);
        const textWidth = textMetrics.width;
        const textHeight = fontSize;

        // Hover detection on front-facing tags
        if (
          tag.z > 0.1 &&
          lastMouseX >= px - textWidth / 2 - 8 &&
          lastMouseX <= px + textWidth / 2 + 8 &&
          lastMouseY >= py - textHeight / 2 - 4 &&
          lastMouseY <= py + textHeight / 2 + 4
        ) {
          activeHoverText = tag.text;
        }

        const isHovered = activeHoverText === tag.text;

        // Draw white glow for active/hovered tags
        if (isHovered || (tag.highlight && tag.z > 0.3)) {
          ctx.shadowColor = "rgba(255, 255, 255, 0.95)";
          ctx.shadowBlur = isHovered ? 24 : 14;
        } else {
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }

        // Pure white color scheme
        if (isHovered) {
          ctx.fillStyle = "#ffffff";
        } else if (tag.z > 0.1) {
          ctx.fillStyle = tag.highlight
            ? `rgba(255, 255, 255, ${depthAlpha})`
            : `rgba(255, 255, 255, ${depthAlpha * 0.85})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.4})`;
        }

        ctx.fillText(tag.text, px, py);
        ctx.shadowBlur = 0; // reset
      });

      setHoveredTag(activeHoverText);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ cursor: hoveredTag ? "pointer" : "grab" }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {hoveredTag && (
        <div className="pointer-events-none absolute bottom-4 rounded-full border border-white/40 bg-background/90 px-3.5 py-1 text-xs font-mono font-bold text-white shadow-lg backdrop-blur-md">
          ● {hoveredTag}
        </div>
      )}
    </div>
  );
}
