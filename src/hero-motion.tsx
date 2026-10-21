
import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

const WORD_STAGGER = 0.08;
const WORD_DURATION = 0.6;

type HeadingWord = {
  text: string;
  className?: string;
};

export function HeroHeading({
  words,
  className,
}: {
  words: HeadingWord[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <h1 className={className}>
      {words.map((word, index) => (
        <span
          key={word.text}
          className="hero-heading-word"
        >
          <motion.span
            className={`hero-heading-inner ${word.className ?? ""}`}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: WORD_DURATION,
                    ease: "easeOut",
                    delay: index * WORD_STAGGER,
                  }
            }
          >
            {word.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function HeroButtons({
  children,
  className,
  wordCount,
}: {
  children: ReactNode;
  className?: string;
  wordCount: number;
}) {
  const reduce = useReducedMotion();
  const headingEnd =
    (wordCount - 1) * WORD_STAGGER + WORD_DURATION;

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              duration: 0.5,
              ease: "easeOut",
              delay: headingEnd + 0.3,
            }
      }
    >
      {children}
    </motion.div>
  );
}



const PARTICLES = [
  { left: 6, top: 82, size: 2, duration: 14, delay: 0 },
  { left: 14, top: 64, size: 3, duration: 18, delay: 3.2 },
  { left: 22, top: 90, size: 2, duration: 16, delay: 6.5 },
  { left: 31, top: 72, size: 2.5, duration: 20, delay: 1.4 },
  { left: 39, top: 95, size: 2, duration: 15, delay: 8.1 },
  { left: 47, top: 68, size: 3, duration: 22, delay: 4.6 },
  { left: 54, top: 88, size: 2, duration: 17, delay: 10.2 },
  { left: 61, top: 76, size: 2.5, duration: 19, delay: 2.3 },
  { left: 68, top: 92, size: 2, duration: 13, delay: 7.4 },
  { left: 74, top: 60, size: 3, duration: 21, delay: 5.5 },
  { left: 80, top: 84, size: 2, duration: 16, delay: 9.3 },
  { left: 86, top: 70, size: 2.5, duration: 18, delay: 0.8 },
  { left: 92, top: 94, size: 2, duration: 15, delay: 11.6 },
  { left: 97, top: 66, size: 3, duration: 23, delay: 3.9 },
];

export function GoldDust() {
  const reduce = useReducedMotion();

  if (reduce) return null;

  return (
    <div className="hero-gold-dust" aria-hidden="true">
      {PARTICLES.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="hero-gold-particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.4, 0.4, 0], y: -220 }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "linear",
            repeat: Infinity,
            times: [0, 0.15, 0.8, 1],
          }}
        />
      ))}
    </div>
  );
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isHub: boolean;
  phase: number;
}

interface Pulse {
  fromNode: Node;
  toNode: Node;
  startTime: number;
  duration: number;
}

export function NeuralNetworkBackground() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let isVisible = !document.hidden;
    let isIntersecting = true;
    const mouse = { x: -9999, y: -9999, active: false };

    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let lastPulseTime = performance.now();

    let protectedRect = { minX: -9999, maxX: -9999, minY: -9999, maxY: -9999, active: false };
    let sphereCenter = { x: -9999, y: -9999, active: false };

    const updateGeometry = () => {
      const canvasRect = canvas.getBoundingClientRect();

      // Tagline protected rectangle: bounding box + 24px of padding on each side
      const taglineEl = parent.querySelector(".hero-new-note") as HTMLElement | null;
      if (taglineEl) {
        const tagRect = taglineEl.getBoundingClientRect();
        const style = window.getComputedStyle(taglineEl);
        if (
          tagRect.width > 0 &&
          tagRect.height > 0 &&
          style.display !== "none" &&
          style.visibility !== "hidden"
        ) {
          const left = tagRect.left - canvasRect.left;
          const top = tagRect.top - canvasRect.top;
          const right = tagRect.right - canvasRect.left;
          const bottom = tagRect.bottom - canvasRect.top;
          protectedRect = {
            minX: left - 24,
            maxX: right + 24,
            minY: top - 24,
            maxY: bottom + 24,
            active: true,
          };
        } else {
          protectedRect.active = false;
        }
      } else {
        protectedRect.active = false;
      }

      // Sphere center coordinates relative to canvas
      const sculptureWrap = parent.querySelector(".hero-sculpture-wrap") as HTMLElement | null;
      if (sculptureWrap) {
        const wrapRect = sculptureWrap.getBoundingClientRect();
        sphereCenter = {
          x: wrapRect.left - canvasRect.left + wrapRect.width * 0.48,
          y: wrapRect.top - canvasRect.top + wrapRect.height * 0.48,
          active: true,
        };
      } else {
        sphereCenter.active = false;
      }
    };

    const getTaglineFadeFactor = (x: number, y: number) => {
      if (!protectedRect.active) return 1.0;
      const dx = Math.max(protectedRect.minX - x, 0, x - protectedRect.maxX);
      const dy = Math.max(protectedRect.minY - y, 0, y - protectedRect.maxY);
      const dist = Math.hypot(dx, dy);
      if (dist === 0) return 0;
      if (dist >= 40) return 1.0;
      return dist / 40;
    };

    const getSegmentTaglineFactor = (x1: number, y1: number, x2: number, y2: number) => {
      if (!protectedRect.active) return 1.0;
      const f1 = getTaglineFadeFactor(x1, y1);
      const f2 = getTaglineFadeFactor(x2, y2);
      const fMid = getTaglineFadeFactor((x1 + x2) * 0.5, (y1 + y2) * 0.5);
      const fQ1 = getTaglineFadeFactor(x1 * 0.75 + x2 * 0.25, y1 * 0.75 + y2 * 0.25);
      const fQ3 = getTaglineFadeFactor(x1 * 0.25 + x2 * 0.75, y1 * 0.25 + y2 * 0.75);
      return Math.min(f1, f2, fMid, fQ1, fQ3);
    };

    const getSphereFactor = (x: number, y: number) => {
      if (!sphereCenter.active) return 1.0;
      const d = Math.hypot(x - sphereCenter.x, y - sphereCenter.y);
      if (d >= 300) return 1.0;
      return 0.5 + 0.5 * (d / 300);
    };

    const getTargetNodeCount = (w: number) => (w < 768 ? 30 : 70);

    const initNodes = (w: number, h: number, count: number) => {
      const newNodes: Node[] = [];
      for (let i = 0; i < count; i++) {
        const isHub = i % 6 === 0;
        newNodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: isHub ? 4 : 1.5 + Math.random() * 1.5,
          isHub,
          phase: Math.random() * Math.PI * 2,
        });
      }
      return newNodes;
    };

    const getAlphaFactor = (x: number, w: number) => {
      if (w >= 768) {
        if (x < w * 0.48) return 0.5;
        if (x < w * 0.58) return 0.5 + 0.5 * ((x - w * 0.48) / (w * 0.1));
        return 1.0;
      }
      return 0.7;
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          width = w;
          height = h;

          const dpr = window.devicePixelRatio || 1;
          canvas.width = Math.floor(w * dpr);
          canvas.height = Math.floor(h * dpr);
          canvas.style.width = `${w}px`;
          canvas.style.height = `${h}px`;

          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(dpr, dpr);

          updateGeometry();

          const targetCount = getTargetNodeCount(w);
          if (nodes.length !== targetCount) {
            nodes = initNodes(w, h, targetCount);
          }
        }
      }
    });

    resizeObserver.observe(parent);
    window.addEventListener("resize", updateGeometry);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
    };

    parent.addEventListener("pointermove", handlePointerMove, { passive: true });
    parent.addEventListener("pointerleave", handlePointerLeave);

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const len = nodes.length;
      const connectedPairs: [Node, Node][] = [];

      // Lines: connect nodes closer than 160px.
      ctx.shadowBlur = 0;
      ctx.lineWidth = 0.8;

      for (let i = 0; i < len; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < len; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 160) {
            const tagFactor = getSegmentTaglineFactor(ni.x, ni.y, nj.x, nj.y);
            if (tagFactor > 0) {
              connectedPairs.push([ni, nj]);
              const midX = (ni.x + nj.x) * 0.5;
              const midY = (ni.y + nj.y) * 0.5;
              const factor = getAlphaFactor(midX, width);
              const sphereFactor = getSphereFactor(midX, midY);
              const alpha = (1 - dist / 160) * 0.6 * factor * tagFactor * sphereFactor;

              if (alpha > 0.005) {
                ctx.strokeStyle = `rgba(201, 162, 75, ${alpha.toFixed(3)})`;
                ctx.beginPath();
                ctx.moveTo(ni.x, ni.y);
                ctx.lineTo(nj.x, nj.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      // Mouse lines: nearest 5 nodes within 150px
      if (mouse.active && mouse.x >= 0 && mouse.y >= 0) {
        const nearby: { node: Node; dist: number }[] = [];
        for (let i = 0; i < len; i++) {
          const d = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
          if (d < 150) {
            nearby.push({ node: nodes[i], dist: d });
          }
        }
        nearby.sort((a, b) => a.dist - b.dist);
        const nearest5 = nearby.slice(0, 5);

        for (const item of nearest5) {
          const tagFactor = getSegmentTaglineFactor(mouse.x, mouse.y, item.node.x, item.node.y);
          if (tagFactor > 0) {
            const sphereFactor = getSphereFactor(item.node.x, item.node.y);
            const lineAlpha = (1 - item.dist / 150) * 0.9 * tagFactor * sphereFactor;
            if (lineAlpha > 0.005) {
              ctx.strokeStyle = `rgba(230, 199, 121, ${lineAlpha.toFixed(3)})`;
              ctx.lineWidth = 1.0;
              ctx.shadowColor = `rgba(230, 199, 121, ${(0.8 * tagFactor * sphereFactor).toFixed(3)})`;
              ctx.shadowBlur = 6;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(item.node.x, item.node.y);
              ctx.stroke();
            }
          }
        }
      }

      // Pulse: every 4 seconds, send one bright pulse
      if (time - lastPulseTime >= 4000 && connectedPairs.length > 0) {
        const pair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
        pulses.push({
          fromNode: pair[0],
          toNode: pair[1],
          startTime: time,
          duration: 1400,
        });
        lastPulseTime = time;
      }

      // Draw and update pulses
      const activePulses: Pulse[] = [];
      for (const pulse of pulses) {
        const elapsed = time - pulse.startTime;
        const progress = elapsed / pulse.duration;

        if (progress < 1) {
          activePulses.push(pulse);
          const px = pulse.fromNode.x + (pulse.toNode.x - pulse.fromNode.x) * progress;
          const py = pulse.fromNode.y + (pulse.toNode.y - pulse.fromNode.y) * progress;

          const tagFactor = getTaglineFadeFactor(px, py);
          if (tagFactor > 0) {
            const sphereFactor = getSphereFactor(px, py);
            const combined = tagFactor * sphereFactor;
            ctx.save();
            ctx.shadowColor = `rgba(230, 199, 121, ${combined.toFixed(3)})`;
            ctx.shadowBlur = 12;
            ctx.fillStyle = `rgba(255, 242, 176, ${combined.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }
      pulses = activePulses;

      // Nodes rendering and motion
      const nowSec = time * 0.001;
      for (let i = 0; i < len; i++) {
        const node = nodes[i];

        // Mouse interaction: repel within 120px
        if (mouse.active) {
          const dxMouse = node.x - mouse.x;
          const dyMouse = node.y - mouse.y;
          const distMouse = Math.hypot(dxMouse, dyMouse);
          if (distMouse < 120 && distMouse > 0) {
            const repelForce = (120 - distMouse) / 120;
            node.x += (dxMouse / distMouse) * repelForce * 1.5;
            node.y += (dyMouse / distMouse) * repelForce * 1.5;
          }
        }

        // Motion & bounce
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) {
          node.x = 0;
          node.vx *= -1;
        } else if (node.x > width) {
          node.x = width;
          node.vx *= -1;
        }

        if (node.y < 0) {
          node.y = 0;
          node.vy *= -1;
        } else if (node.y > height) {
          node.y = height;
          node.vy *= -1;
        }

        const tagFactor = getTaglineFadeFactor(node.x, node.y);
        if (tagFactor > 0) {
          const factor = getAlphaFactor(node.x, width);
          const sphereFactor = getSphereFactor(node.x, node.y);
          const combined = factor * tagFactor * sphereFactor;

          if (node.isHub) {
            const currentRadius = Math.max(1, 4 + Math.sin(nowSec * (2 * Math.PI / 3) + node.phase) * 1);
            ctx.save();
            ctx.shadowColor = `rgba(230, 199, 121, ${(0.8 * combined).toFixed(3)})`;
            ctx.shadowBlur = 14;
            ctx.fillStyle = `rgba(230, 199, 121, ${(1.0 * combined).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          } else {
            ctx.save();
            ctx.shadowColor = `rgba(230, 199, 121, ${(0.8 * combined).toFixed(3)})`;
            ctx.shadowBlur = 8;
            ctx.fillStyle = `rgba(201, 162, 75, ${(0.85 * combined).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!animId && isVisible && isIntersecting) {
        animId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && isIntersecting) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isVisible && isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );

    intersectionObserver.observe(parent);

    startLoop();

    return () => {
      stopLoop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateGeometry);
      parent.removeEventListener("pointermove", handlePointerMove);
      parent.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reduce]);

  if (reduce) return null;

  return <canvas ref={canvasRef} className="hero-neural-canvas" aria-hidden="true" />;
}
