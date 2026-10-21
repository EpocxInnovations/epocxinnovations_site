import React, { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

/**
 * 7. Page load: a quick 0.8s fade-in
 * 8. Disabled when prefers-reduced-motion is on
 */
export function PageFadeIn({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduce ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * 7. EPOCX logo revealing letter by letter
 */
export function AnimatedLogoText({ inverse = false }: { inverse?: boolean }) {
  const reduce = useReducedMotion();
  const letters = ["E", "P", "O", "C", "X"];

  return (
    <span>
      <span className="logo-letters" aria-label="Epocx">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            style={{ display: "inline-block" }}
            initial={reduce ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: 0.35,
                    delay: 0.12 + i * 0.08,
                    ease: "easeOut",
                  }
            }
          >
            {letter}
          </motion.span>
        ))}
      </span>
      {" "}
      <motion.b
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                duration: 0.4,
                delay: 0.58,
                ease: "easeOut",
              }
        }
      >
        Innovation
      </motion.b>
    </span>
  );
}

/**
 * 1. Staggered card entry: Services, Projects and Process cards fade up
 *    one after another (0.12s stagger) when scrolled into view, once.
 */
export function StaggerContainer({
  children,
  className,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0, y: 28 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: "easeOut" },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

/**
 * 2. Process section: draw a thin gold line that animates from step 01 to
 *    step 04 as the section scrolls into view, and each step icon scales in
 *    as the line reaches it.
 */
export function ProcessTimeline({
  steps,
}: {
  steps: [string, string][];
}) {
  const reduce = useReducedMotion();

  return (
    <div className="process-timeline-wrapper">
      {/* Background track */}
      <div className="timeline-track-line" />

      {/* Animated gold line */}
      {!reduce && (
        <motion.div
          className="timeline-gold-progress"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left center" }}
        />
      )}

      <div className="timeline">
        {steps.map(([title, text], i) => (
          <div className="timeline-step" key={title}>
            <motion.div
              className="step-marker"
              initial={reduce ? false : { scale: 0.3, opacity: 0 }}
              whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: 0.45,
                      delay: 0.08 + i * 0.32,
                      ease: [0.34, 1.56, 0.64, 1],
                    }
              }
            >
              <span>0{i + 1}</span>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.45, delay: 0.15 + i * 0.12 }
              }
            >
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 3. Magnetic buttons: primary buttons subtly follow the cursor within 8px
 *    when hovered, and spring back on leave.
 */
export function MagneticButton({
  children,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.hypot(dx, dy);
    const maxOffset = 8;
    if (distance > 0) {
      const factor = Math.min(distance, maxOffset) / distance;
      x.set(dx * factor);
      y.set(dy * factor);
    }
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reduce) {
    return <div className={`inline-block ${className ?? ""}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

/**
 * 5. Stats: count-up numbers with an easing curve, triggered once in view.
 */
export function CountUp({
  end,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? end : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });

  useEffect(() => {
    if (reduce) {
      setValue(end);
      return;
    }
    if (isInView) {
      const controls = animate(0, end, {
        duration,
        ease: [0.16, 1, 0.3, 1], // Smooth easing curve
        onUpdate: (latest) => {
          setValue(
            decimals > 0 ? Number(latest.toFixed(decimals)) : Math.round(latest)
          );
        },
      });
      return () => controls.stop();
    }
  }, [isInView, end, duration, decimals, reduce]);

  return (
    <span ref={ref} className="countup-number">
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : value}
      {suffix}
    </span>
  );
}

/**
 * 6. Parallax: the mountain background in "Why Choose Us" moves at 0.85x
 *    the scroll speed.
 */
export function ParallaxMountain({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Relative movement at 0.85x scroll speed (-15% parallax drift)
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div
      ref={ref}
      className={`why-choose-us-parallax-wrap ${className ?? ""}`}
      aria-hidden="true"
    >
      <motion.div
        className="why-choose-us-mountain-layer"
        style={reduce ? undefined : { y }}
      />
    </div>
  );
}
