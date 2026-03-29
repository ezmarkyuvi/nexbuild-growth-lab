import { useCallback, useEffect, useRef } from "react";

type HeroBackgroundProps = {
  className?: string;
  opacity?: number;
  withOrbs?: boolean;
};

const HeroBackground = ({ className = "", opacity = 0.8, withOrbs = true }: HeroBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const targetPointerRef = useRef({ x: 0, y: 0 });
  const hasPointerRef = useRef(false);
  const sizeRef = useRef({ width: 0, height: 0 });
  const animRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width: w, height: h } = sizeRef.current;
    if (w === 0 || h === 0) return;

    const target = targetPointerRef.current;
    const pointer = pointerRef.current;
    pointer.x += (target.x - pointer.x) * 0.12;
    pointer.y += (target.y - pointer.y) * 0.12;

    const mx = pointer.x;
    const my = pointer.y;
    const time = Date.now() * 0.001;
    const pointerBoost = hasPointerRef.current ? 1 : 0;

    ctx.clearRect(0, 0, w, h);

    const spacing = 40;
    const cols = Math.ceil(w / spacing) + 1;
    const rows = Math.ceil(h / spacing) + 1;
    const maxDist = 220;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing;
        const y = j * spacing;
        const dx = mx - x;
        const dy = my - y;
        const dist = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - dist / maxDist) * pointerBoost;

        const offsetX = influence * dx * 0.1;
        const offsetY = influence * dy * 0.1;
        const wave = Math.sin(time * 0.9 + i * 0.17 + j * 0.16) * 0.3 + 0.7;
        const alpha = 0.05 + influence * 0.28 + wave * 0.035;
        const radius = 1 + influence * 2.6;

        ctx.beginPath();
        ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234, 120, 28, ${alpha})`;
        ctx.fill();

        if (influence > 0.28) {
          if (i < cols - 1) {
            const nx = (i + 1) * spacing;
            const ny = y;
            const ndx = mx - nx;
            const ndy = my - ny;
            const ndist = Math.hypot(ndx, ndy);
            const nInfluence = Math.max(0, 1 - ndist / maxDist) * pointerBoost;
            if (nInfluence > 0.28) {
              ctx.beginPath();
              ctx.moveTo(x + offsetX, y + offsetY);
              ctx.lineTo(nx + nInfluence * ndx * 0.1, ny + nInfluence * ndy * 0.1);
              ctx.strokeStyle = `rgba(234, 120, 28, ${Math.min(influence, nInfluence) * 0.22})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
          if (j < rows - 1) {
            const nx = x;
            const ny = (j + 1) * spacing;
            const ndx = mx - nx;
            const ndy = my - ny;
            const ndist = Math.hypot(ndx, ndy);
            const nInfluence = Math.max(0, 1 - ndist / maxDist) * pointerBoost;
            if (nInfluence > 0.28) {
              ctx.beginPath();
              ctx.moveTo(x + offsetX, y + offsetY);
              ctx.lineTo(nx + nInfluence * ndx * 0.1, ny + nInfluence * ndy * 0.1);
              ctx.strokeStyle = `rgba(234, 120, 28, ${Math.min(influence, nInfluence) * 0.22})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }
    }

    if (pointerBoost > 0) {
      const halo = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
      halo.addColorStop(0, "rgba(255, 122, 24, 0.18)");
      halo.addColorStop(0.35, "rgba(255, 122, 24, 0.06)");
      halo.addColorStop(1, "rgba(255, 122, 24, 0)");
      ctx.beginPath();
      ctx.arc(mx, my, 180, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();
    }

    if (withOrbs) {
      for (let k = 0; k < 3; k++) {
        const ox = w * (0.2 + k * 0.3) + Math.sin(time * 0.5 + k * 2) * 60;
        const oy = h * (0.3 + k * 0.15) + Math.cos(time * 0.4 + k * 1.5) * 40;
        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, 120 + k * 30);
        gradient.addColorStop(0, k === 1 ? "rgba(204, 60, 30, 0.07)" : "rgba(234, 120, 28, 0.07)");
        gradient.addColorStop(1, "rgba(234, 120, 28, 0)");
        ctx.beginPath();
        ctx.arc(ox, oy, 120 + k * 30, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, [withOrbs]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parentElement = canvas.parentElement;
    if (!parentElement) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      sizeRef.current = { width: rect.width, height: rect.height };
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      hasPointerRef.current = isInside;
      if (!isInside) {
        return;
      }

      targetPointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      hasPointerRef.current = false;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parentElement);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleMouseLeave);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleMouseLeave);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
};

export default HeroBackground;
