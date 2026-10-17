import React, { useEffect, useRef, useState, useCallback } from 'react';

interface CircuitryCanvasProps {
  interactive?: boolean;
  intensity?: number;
  speedMultiplier?: number;
  colorScheme?: 'cyan' | 'amber' | 'emerald';
  className?: string;
  onNodeClick?: (nodeId: string, nodeName: string) => void;
}

interface CircuitNode {
  id: string;
  x: number;
  y: number;
  radius: number;
  label?: string;
  type: 'via' | 'chip' | 'junction' | 'capacitor';
  activePulse: number; // 0 to 1
}

interface CircuitTrace {
  id: string;
  points: { x: number; y: number }[];
  pulses: { progress: number; speed: number; length: number; color: string }[];
  baseColor: string;
}

export const CircuitryCanvas: React.FC<CircuitryCanvasProps> = ({
  interactive = true,
  intensity = 1.0,
  speedMultiplier = 1.0,
  colorScheme = 'cyan',
  className = '',
  onNodeClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const pointerPosRef = useRef<{ x: number; y: number; active: boolean }>({ x: -100, y: -100, active: false });
  const ripplesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; opacity: number }[]>([]);

  // Telemetry state for interactive test bench
  const [activeFrequency, setActiveFrequency] = useState<number>(240); // MHz
  const [pulseCount, setPulseCount] = useState<number>(18);
  const [isSimulationPaused, setIsSimulationPaused] = useState<boolean>(false);

  // Palette selection
  const primaryGlow = colorScheme === 'amber' ? 'rgba(245, 158, 11, ' : colorScheme === 'emerald' ? 'rgba(16, 185, 129, ' : 'rgba(0, 240, 255, ';
  const trackStroke = colorScheme === 'amber' ? 'rgba(217, 119, 6, 0.22)' : colorScheme === 'emerald' ? 'rgba(5, 150, 105, 0.22)' : 'rgba(0, 240, 255, 0.16)';

  // Build procedural circuit layout
  const nodesRef = useRef<CircuitNode[]>([]);
  const tracesRef = useRef<CircuitTrace[]>([]);

  const initCircuitLayout = useCallback((width: number, height: number) => {
    const nodes: CircuitNode[] = [];
    const traces: CircuitTrace[] = [];

    // Main IC chips
    const chipCols = Math.max(2, Math.floor(width / 380));
    const chipRows = Math.max(2, Math.floor(height / 320));

    for (let r = 0; r < chipRows; r++) {
      for (let c = 0; c < chipCols; c++) {
        const cx = ((c + 0.5) / chipCols) * width;
        const cy = ((r + 0.5) / chipRows) * height;

        nodes.push({
          id: `chip-${r}-${c}`,
          x: cx,
          y: cy,
          radius: 14,
          label: `ASIC-${c + 1}${String.fromCharCode(65 + r)}`,
          type: 'chip',
          activePulse: 0,
        });

        // Add 4 surrounding vias for each chip
        const offsets = [
          { dx: -45, dy: -45 },
          { dx: 45, dy: -45 },
          { dx: -45, dy: 45 },
          { dx: 45, dy: 45 },
          { dx: 0, dy: -60 },
          { dx: 0, dy: 60 },
          { dx: -65, dy: 0 },
          { dx: 65, dy: 0 },
        ];

        offsets.forEach((off, i) => {
          const vx = cx + off.dx;
          const vy = cy + off.dy;
          if (vx > 10 && vx < width - 10 && vy > 10 && vy < height - 10) {
            nodes.push({
              id: `via-${r}-${c}-${i}`,
              x: vx,
              y: vy,
              radius: 3.5,
              type: i % 3 === 0 ? 'junction' : 'via',
              activePulse: 0,
            });

            // 45-degree chamfered trace to chip
            const midX = cx + off.dx * 0.4;
            const midY = cy + (off.dy > 0 ? off.dy - 15 : off.dy + 15);

            traces.push({
              id: `trace-chip-${r}-${c}-${i}`,
              points: [
                { x: vx, y: vy },
                { x: midX, y: vy },
                { x: midX, y: midY },
                { x: cx, y: cy },
              ],
              pulses: [
                {
                  progress: (i * 0.23) % 1,
                  speed: 0.003 + (i % 4) * 0.0015,
                  length: 0.2,
                  color: primaryGlow + '0.9)',
                },
              ],
              baseColor: trackStroke,
            });
          }
        });
      }
    }

    // Bus traces connecting across viewport with 45-degree bends
    const busCount = Math.floor(width / 90);
    for (let i = 0; i < busCount; i++) {
      const startX = (i / busCount) * width + 20;
      const startY = i % 2 === 0 ? 0 : height;
      const endY = startY === 0 ? height * (0.3 + (i % 5) * 0.1) : height * (0.7 - (i % 5) * 0.1);
      const angleOffset = (i % 3 === 0 ? 1 : -1) * 35;
      const turnY = startY === 0 ? 60 + (i % 4) * 20 : height - (60 + (i % 4) * 20);

      const points = [
        { x: startX, y: startY },
        { x: startX, y: turnY },
        { x: startX + angleOffset, y: turnY + (startY === 0 ? 35 : -35) },
        { x: startX + angleOffset, y: endY },
        { x: startX + angleOffset + (i % 2 === 0 ? 40 : -40), y: endY },
      ];

      nodes.push({
        id: `bus-node-${i}`,
        x: points[points.length - 1].x,
        y: points[points.length - 1].y,
        radius: 4,
        type: 'capacitor',
        activePulse: 0,
      });

      traces.push({
        id: `bus-trace-${i}`,
        points,
        pulses: [
          {
            progress: (i * 0.17) % 1,
            speed: 0.002 + ((i % 5) * 0.001),
            length: 0.25,
            color: primaryGlow + '0.85)',
          },
        ],
        baseColor: trackStroke,
      });
    }

    nodesRef.current = nodes;
    tracesRef.current = traces;
  }, [primaryGlow, trackStroke]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check headless mode to throttle software rendering in Playwright
    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    initCircuitLayout(width, height);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initCircuitLayout(width, height);
    };

    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();
    const frameInterval = isHeadless ? 66 : 16; // ~15 fps in headless for ultra CPU efficiency

    const render = (currentTime: number) => {
      if (!ctx || !canvas) return;

      const elapsed = currentTime - lastTime;
      if (elapsed < frameInterval) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }
      lastTime = currentTime;

      // Clear with dark obsidian slate
      ctx.clearRect(0, 0, width, height);

      // Draw faint circuit grid background
      const gridSize = 40;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.018)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Render ripples if any
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += isHeadless ? 6 : 4;
        r.opacity *= 0.94;

        ctx.save();
        ctx.strokeStyle = `${primaryGlow}${r.opacity * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        if (r.radius > r.maxRadius || r.opacity < 0.02) {
          ripples.splice(i, 1);
        }
      }

      // Draw Traces
      const traces = tracesRef.current;
      const speed = isSimulationPaused ? 0 : speedMultiplier * (activeFrequency / 240);

      traces.forEach((trace) => {
        const pts = trace.points;
        if (pts.length < 2) return;

        // Draw static copper/cyan track
        ctx.save();
        ctx.strokeStyle = trace.baseColor;
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();

        // Calculate total track length
        let totalLength = 0;
        const segmentLengths: number[] = [];
        for (let i = 0; i < pts.length - 1; i++) {
          const dx = pts[i + 1].x - pts[i].x;
          const dy = pts[i + 1].y - pts[i].y;
          const len = Math.hypot(dx, dy);
          segmentLengths.push(len);
          totalLength += len;
        }

        // Draw and update active electric pulses along trace
        trace.pulses.forEach((pulse) => {
          pulse.progress = (pulse.progress + pulse.speed * speed * intensity) % 1;

          const currentDist = pulse.progress * totalLength;
          const headDist = currentDist;
          const tailDist = Math.max(0, currentDist - pulse.length * totalLength);

          // Find coordinates for head and tail
          const getPointAtDist = (dist: number) => {
            let acc = 0;
            for (let i = 0; i < segmentLengths.length; i++) {
              if (acc + segmentLengths[i] >= dist) {
                const subDist = dist - acc;
                const ratio = subDist / segmentLengths[i];
                return {
                  x: pts[i].x + (pts[i + 1].x - pts[i].x) * ratio,
                  y: pts[i].y + (pts[i + 1].y - pts[i].y) * ratio,
                };
              }
              acc += segmentLengths[i];
            }
            return pts[pts.length - 1];
          };

          const head = getPointAtDist(headDist);
          const tail = getPointAtDist(tailDist);

          // Glowing pulse segment
          ctx.beginPath();
          ctx.strokeStyle = pulse.color;
          ctx.lineWidth = 2.2;
          ctx.shadowColor = primaryGlow + '0.8)';
          ctx.shadowBlur = isHeadless ? 0 : 8;
          ctx.moveTo(tail.x, tail.y);
          ctx.lineTo(head.x, head.y);
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Tiny photon lead bead
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(head.x, head.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      });

      // Draw Nodes (vias, chips, junctions)
      const nodes = nodesRef.current;
      const pointer = pointerPosRef.current;

      nodes.forEach((node) => {
        // Distance to pointer for interactive activation
        if (pointer.active) {
          const dist = Math.hypot(pointer.x - node.x, pointer.y - node.y);
          if (dist < 80) {
            node.activePulse = Math.min(1, node.activePulse + 0.15);
          }
        }
        node.activePulse *= 0.95;

        ctx.save();
        if (node.type === 'chip') {
          // Microcontroller IC body
          const w = 36;
          const h = 26;
          ctx.fillStyle = '#0f131c';
          ctx.strokeStyle = node.activePulse > 0.1 ? `${primaryGlow}0.9)` : 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1.2;
          ctx.strokeRect(node.x - w / 2, node.y - h / 2, w, h);
          ctx.fillRect(node.x - w / 2, node.y - h / 2, w, h);

          // IC label
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillStyle = node.activePulse > 0.1 ? '#00f0ff' : 'rgba(255, 255, 255, 0.45)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.label || 'IC', node.x, node.y);

          // Pins
          ctx.fillStyle = 'rgba(0, 240, 255, 0.35)';
          for (let p = -12; p <= 12; p += 6) {
            ctx.fillRect(node.x + p - 1, node.y - h / 2 - 2, 2, 2);
            ctx.fillRect(node.x + p - 1, node.y + h / 2, 2, 2);
          }
        } else if (node.type === 'capacitor') {
          // SMT capacitor pad
          ctx.fillStyle = '#1e2433';
          ctx.strokeStyle = `${primaryGlow}0.3)`;
          ctx.lineWidth = 1;
          ctx.strokeRect(node.x - 4, node.y - 2, 8, 4);
          ctx.fillRect(node.x - 4, node.y - 2, 8, 4);
        } else {
          // Gold / cyan via ring
          ctx.fillStyle = '#0a0d14';
          ctx.strokeStyle = node.activePulse > 0.1 ? `${primaryGlow}0.95)` : `${primaryGlow}0.4)`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Center drill hole
          ctx.fillStyle = node.activePulse > 0.1 ? '#00f0ff' : '#07080b';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [initCircuitLayout, primaryGlow, trackStroke, isSimulationPaused, activeFrequency, speedMultiplier, intensity]);

  // Pointer interaction
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    pointerPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    pointerPosRef.current.active = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Trigger electrical ripple
    ripplesRef.current.push({
      x,
      y,
      radius: 5,
      maxRadius: 180,
      opacity: 0.9,
    });

    // Check if clicked close to a node
    const clickedNode = nodesRef.current.find(
      (n) => Math.hypot(n.x - x, n.y - y) <= (n.radius + 12)
    );

    if (clickedNode) {
      clickedNode.activePulse = 1.0;
      if (onNodeClick) {
        onNodeClick(clickedNode.id, clickedNode.label || clickedNode.id);
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        className="w-full h-full block cursor-crosshair touch-none"
        aria-label="Interactive animated circuitry canvas"
        role="img"
      />

      {interactive && (
        <div className="absolute bottom-3 right-3 hidden sm:flex items-center gap-3 px-3 py-1.5 bg-[#0a0d15] rounded border border-cyan-500/30 text-xs font-mono text-slate-200 pointer-events-auto shadow-lg z-20">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold">BUS CLK:</span>
            <span className="tabular-nums text-white font-medium">{activeFrequency} MHz</span>
          </div>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setActiveFrequency((prev) => (prev === 240 ? 480 : prev === 480 ? 120 : 240))}
            className="hover:text-cyan-300 text-slate-300 transition-colors whitespace-nowrap cursor-pointer"
            title="Cycle clock frequency"
            aria-label="Cycle clock frequency"
          >
            Frequency Cycle
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setIsSimulationPaused((p) => !p)}
            className="hover:text-cyan-300 text-slate-300 transition-colors whitespace-nowrap cursor-pointer"
            aria-label={isSimulationPaused ? 'Resume Circuit Animation' : 'Pause Circuit Animation'}
          >
            {isSimulationPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      )}
    </div>
  );
};
