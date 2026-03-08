import { useEffect, useRef, useCallback } from "react";

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const time = Date.now() * 0.001;

    ctx.clearRect(0, 0, w, h);

    // Draw grid dots
    const spacing = 40;
    const cols = Math.ceil(w / spacing) + 1;
    const rows = Math.ceil(h / spacing) + 1;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing;
        const y = j * spacing;
        const dx = mx - x;
        const dy = my - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        const influence = Math.max(0, 1 - dist / maxDist);

        // Offset dots near mouse
        const offsetX = influence * dx * 0.08;
        const offsetY = influence * dy * 0.08;

        const wave = Math.sin(time * 0.8 + i * 0.15 + j * 0.15) * 0.3 + 0.7;
        const alpha = 0.06 + influence * 0.25 + wave * 0.04;
        const radius = 1 + influence * 2.5;

        ctx.beginPath();
        ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.fill();

        // Draw connecting lines near mouse
        if (influence > 0.3) {
          // Right neighbor
          if (i < cols - 1) {
            const nx = (i + 1) * spacing;
            const ny = j * spacing;
            const ndx = mx - nx;
            const ndy = my - ny;
            const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
            const nInfluence = Math.max(0, 1 - ndist / maxDist);
            if (nInfluence > 0.3) {
              ctx.beginPath();
              ctx.moveTo(x + offsetX, y + offsetY);
              ctx.lineTo(nx + nInfluence * ndx * 0.08, ny + nInfluence * ndy * 0.08);
              ctx.strokeStyle = `rgba(59, 130, 246, ${Math.min(influence, nInfluence) * 0.2})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
          // Bottom neighbor
          if (j < rows - 1) {
            const nx = i * spacing;
            const ny = (j + 1) * spacing;
            const ndx = mx - nx;
            const ndy = my - ny;
            const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
            const nInfluence = Math.max(0, 1 - ndist / maxDist);
            if (nInfluence > 0.3) {
              ctx.beginPath();
              ctx.moveTo(x + offsetX, y + offsetY);
              ctx.lineTo(nx + nInfluence * ndx * 0.08, ny + nInfluence * ndy * 0.08);
              ctx.strokeStyle = `rgba(59, 130, 246, ${Math.min(influence, nInfluence) * 0.2})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
    }

    // Floating orbs
    for (let k = 0; k < 3; k++) {
      const ox = w * (0.2 + k * 0.3) + Math.sin(time * 0.5 + k * 2) * 60;
      const oy = h * (0.3 + k * 0.15) + Math.cos(time * 0.4 + k * 1.5) * 40;
      const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, 120 + k * 30);
      gradient.addColorStop(0, k === 1 ? "rgba(139, 92, 246, 0.08)" : "rgba(59, 130, 246, 0.08)");
      gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.beginPath();
      ctx.arc(ox, oy, 120 + k * 30, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouse);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.8 }}
    />
  );
};

export default HeroBackground;
