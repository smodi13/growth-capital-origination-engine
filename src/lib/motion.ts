/**
 * Central motion configuration.
 *
 * Every duration, easing curve, and distance in the application comes from
 * here, so the motion system can be tuned or disabled in one place rather than
 * audited across dozens of components.
 *
 * Two rules are enforced by construction rather than by convention:
 *
 *   1. Nothing animates a property that triggers layout. Only opacity and
 *      transform are used, so animation cannot cause cumulative layout shift.
 *   2. Reduced motion is respected everywhere. `useReducedMotion` returns true
 *      during server rendering and on the first client paint, so the static
 *      HTML is always the finished state and motion is added afterwards. A
 *      user who disables animation sees the same content, immediately.
 */

import { useEffect, useState, useSyncExternalStore } from 'react';

/** Durations in milliseconds. Entrances stay inside 300 to 650. */
export const DURATION = {
  instant: 120,
  fast: 200,
  base: 320,
  reveal: 480,
  slow: 620,
} as const;

/** Stagger between siblings. Deliberately short so nothing waits. */
export const STAGGER = {
  tight: 40,
  base: 60,
  loose: 85,
} as const;

/**
 * Easing. Standard is a decelerating curve with no overshoot, because
 * overshoot on a financial figure reads as imprecision.
 */
export const EASING = {
  standard: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
  linear: 'linear',
} as const;

/** Travel distances. Hover movement is capped well below 4px. */
export const DISTANCE = {
  reveal: 10,
  hover: 2,
} as const;

/* -------------------------------------------------------------------------- */
/* Reduced motion                                                             */
/* -------------------------------------------------------------------------- */

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * The server snapshot deliberately reports reduced motion.
 *
 * That means the prerendered HTML is always the completed, visible state. A
 * browser with animation disabled never runs a single transition, and one with
 * animation enabled adds motion on top of content that was already readable.
 * The alternative, rendering the hidden state on the server, would leave the
 * page blank if JavaScript failed.
 */
function getServerSnapshot(): boolean {
  return true;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * True once the component has mounted on the client.
 *
 * Used to gate entrance animations so that server rendered markup is never
 * hidden by a style the client has not yet had a chance to remove.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // A layout effect would run before paint and cause a flash on slow devices.
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return mounted;
}

/* -------------------------------------------------------------------------- */
/* Style builders                                                             */
/* -------------------------------------------------------------------------- */

export interface RevealStyleOptions {
  /** Whether the element should currently be shown. */
  shown: boolean;
  /** Disable all motion and render the finished state. */
  reduced: boolean;
  /** Index within a staggered group. */
  index?: number;
  /** Milliseconds between siblings. */
  stagger?: number;
  duration?: number;
  /** Pixels travelled on the y axis. */
  distance?: number;
}

/**
 * Build an inline style for a reveal. Returns the finished state whenever
 * motion is reduced, so no transition is ever registered.
 */
export function revealStyle({
  shown,
  reduced,
  index = 0,
  stagger = STAGGER.base,
  duration = DURATION.reveal,
  distance = DISTANCE.reveal,
}: RevealStyleOptions): React.CSSProperties {
  if (reduced) return { opacity: 1, transform: 'none' };
  return {
    opacity: shown ? 1 : 0,
    transform: shown ? 'translate3d(0,0,0)' : `translate3d(0,${distance}px,0)`,
    transition: `opacity ${duration}ms ${EASING.standard} ${index * stagger}ms, transform ${duration}ms ${EASING.standard} ${index * stagger}ms`,
    willChange: shown ? undefined : 'opacity, transform',
  };
}

/** Ease a 0 to 1 progress value with a decelerating curve. */
export function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}
