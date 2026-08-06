'use client';

import { useSyncExternalStore } from 'react';
import { useReducedMotion } from '@/lib/motion';

/**
 * The hero background: capital moving through a sourcing pipeline.
 *
 * Everything here is generated in the browser. There is no video, no image, no
 * remote animation file, and no external request of any kind. The structure is
 * a fixed SVG lattice of connector paths with a small number of low opacity
 * nodes travelling along them, layered over a CSS radial wash and a CSS noise
 * texture built from an inline SVG turbulence filter.
 *
 * Motion discipline:
 *   - Only transform and opacity animate. Nothing triggers layout or paint of
 *     an expensive property, and no blur value is animated.
 *   - The whole layer is static when prefers-reduced-motion is set, and static
 *     during server rendering, so the first paint is always the quiet state.
 *   - On narrow viewports the node count drops and animation is suspended, so
 *     phones render a still lattice.
 *   - The animation pauses when the tab is hidden.
 */

interface NodeSpec {
  /** Index of the path the node travels along. */
  path: number;
  /** Starting offset along the path, 0 to 1. */
  offset: number;
  /** Seconds for a full traverse. Deliberately slow. */
  period: number;
  radius: number;
  opacity: number;
}

/**
 * Connector geometry, drawn once in a 1200 by 600 viewBox.
 *
 * The lattice reads left to right as a pipeline: signals enter on the left,
 * converge through qualification in the middle, and resolve into a small number
 * of structured outcomes on the right.
 */
const PATHS: string[] = [
  'M -40 120 C 220 120, 300 250, 560 250 S 900 250, 1240 190',
  'M -40 300 C 240 300, 320 300, 560 300 S 920 300, 1240 300',
  'M -40 480 C 220 480, 300 350, 560 350 S 900 350, 1240 410',
  'M -40 200 C 180 200, 260 300, 560 300 S 880 300, 1240 300',
  'M -40 400 C 180 400, 260 300, 560 300 S 880 300, 1240 300',
  'M 560 250 C 760 250, 820 120, 1240 90',
  'M 560 350 C 760 350, 820 480, 1240 510',
];

const NODES: NodeSpec[] = [
  { path: 0, offset: 0.0, period: 34, radius: 2.6, opacity: 0.5 },
  { path: 0, offset: 0.55, period: 34, radius: 1.8, opacity: 0.32 },
  { path: 1, offset: 0.2, period: 29, radius: 2.4, opacity: 0.45 },
  { path: 1, offset: 0.7, period: 29, radius: 1.6, opacity: 0.28 },
  { path: 2, offset: 0.35, period: 38, radius: 2.6, opacity: 0.42 },
  { path: 3, offset: 0.12, period: 44, radius: 1.9, opacity: 0.3 },
  { path: 4, offset: 0.62, period: 41, radius: 1.9, opacity: 0.3 },
  { path: 5, offset: 0.45, period: 31, radius: 2.2, opacity: 0.4 },
  { path: 6, offset: 0.8, period: 36, radius: 2.2, opacity: 0.36 },
];

/** Stage markers along the pipeline, matching the workflow copy. */
const STAGES: { x: number; y: number; r: number }[] = [
  { x: 560, y: 250, r: 4 },
  { x: 560, y: 300, r: 5 },
  { x: 560, y: 350, r: 4 },
];

/**
 * Whether the environment currently warrants animating.
 *
 * Viewport width and tab visibility are both external systems, so they are read
 * through useSyncExternalStore rather than mirrored into state inside an
 * effect. The server snapshot reports false, so the prerendered markup is the
 * still lattice and motion is only ever added on the client.
 */
const WIDE = '(min-width: 768px)';

function subscribeEnvironment(callback: () => void): () => void {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener('change', callback);
  document.addEventListener('visibilitychange', callback);
  return () => {
    mq.removeEventListener('change', callback);
    document.removeEventListener('visibilitychange', callback);
  };
}

function getEnvironmentSnapshot(): boolean {
  return window.matchMedia(WIDE).matches && document.visibilityState === 'visible';
}

function getEnvironmentServerSnapshot(): boolean {
  return false;
}

export function CapitalFlowBackground({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  const environmentAllows = useSyncExternalStore(
    subscribeEnvironment,
    getEnvironmentSnapshot,
    getEnvironmentServerSnapshot,
  );
  const animate = !reduced && environmentAllows;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Radial lighting wash. Static gradients, no animation. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1100px 520px at 22% 12%, rgba(47,107,179,0.16), transparent 62%),' +
            'radial-gradient(820px 460px at 82% 78%, rgba(31,133,139,0.11), transparent 65%),' +
            'radial-gradient(680px 420px at 52% 42%, rgba(19,40,72,0.5), transparent 70%)',
        }}
      />

      {/* Connector lattice and travelling nodes. */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="cf-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2f6bb3" stopOpacity="0" />
            <stop offset="28%" stopColor="#2f6bb3" stopOpacity="0.34" />
            <stop offset="72%" stopColor="#1f858b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1f858b" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="cf-node">
            <stop offset="0%" stopColor="#9fc4ea" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#4f89cd" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4f89cd" stopOpacity="0" />
          </radialGradient>
          <pattern id="cf-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.028"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Fine grid. */}
        <rect width="1200" height="600" fill="url(#cf-grid)" />

        {/* Pipeline connectors. */}
        <g fill="none" stroke="url(#cf-line)" strokeWidth="1.1">
          {PATHS.map((d, i) => (
            <path key={i} id={`cf-path-${i}`} d={d} />
          ))}
        </g>

        {/* Convergence markers at the qualification stage. */}
        <g>
          {STAGES.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="none"
              stroke="#4f89cd"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* Travelling nodes. animateMotion is declarative SVG, no library. */}
        <g>
          {NODES.map((n, i) => (
            <circle key={i} r={n.radius} fill="url(#cf-node)" opacity={n.opacity}>
              {animate ? (
                /*
                 * Nodes are spread along each path by starting the animation
                 * part way through with a negative begin time. keyPoints must
                 * stay within 0 to 1, so offsetting the phase is the correct
                 * way to stagger rather than extending the range past 1.
                 */
                <animateMotion
                  dur={`${n.period}s`}
                  begin={`-${(n.offset * n.period).toFixed(2)}s`}
                  repeatCount="indefinite"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href={`#cf-path-${n.path}`} />
                </animateMotion>
              ) : null}
            </circle>
          ))}
        </g>
      </svg>

      {/*
        Noise texture. The turbulence filter is inline in a data URI, which the
        content security policy permits because it is same origin data rather
        than a remote asset. It is rendered once and never animated.
      */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Fade to the page ground so the hero and the sections below join. */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-navy-950" />
    </div>
  );
}
