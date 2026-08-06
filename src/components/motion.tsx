'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import {
  DURATION,
  EASING,
  STAGGER,
  easeOutCubic,
  revealStyle,
  useMounted,
  useReducedMotion,
} from '@/lib/motion';

/* -------------------------------------------------------------------------- */
/* In-view detection                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Fires once when an element first enters the viewport.
 *
 * Returns true immediately when motion is reduced or IntersectionObserver is
 * unavailable, so content is never gated behind an observer that may not run.
 */
export function useInView<T extends HTMLElement>(rootMargin = '-8% 0px -8% 0px') {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  // Where IntersectionObserver is unavailable, start visible so content is
  // never gated behind an API that will not run. The initialiser is lazy, so
  // no state is written from inside an effect.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    // The observer fires its callback asynchronously immediately after observe
    // for an element already on screen, so the above the fold case needs no
    // synchronous check here.
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced, rootMargin]);

  return { ref, inView: reduced ? true : inView };
}

/* -------------------------------------------------------------------------- */
/* Reveal                                                                     */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  index = 0,
  stagger = STAGGER.base,
  duration = DURATION.reveal,
  as: Tag = 'div',
  className,
  id,
}: {
  children: ReactNode;
  index?: number;
  stagger?: number;
  duration?: number;
  as?: ElementType;
  className?: string;
  id?: string;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      style={revealStyle({ shown: inView, reduced, index, stagger, duration })}
    >
      {children}
    </Tag>
  );
}

/** Staggered entrance for a hero, driven by mount rather than by scroll. */
export function HeroReveal({
  children,
  index = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <Tag
      className={className}
      style={revealStyle({
        shown: mounted,
        reduced,
        index,
        stagger: STAGGER.loose,
        duration: DURATION.slow,
      })}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* Count up                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Animates a number from zero to its value on first view.
 *
 * The element always renders the final value in the server HTML, so the figure
 * is correct even if JavaScript never runs. That matters here because these are
 * research counts, not decoration.
 */
export function CountUp({
  value,
  decimals = 0,
  duration = DURATION.slow,
  suffix = '',
  prefix = '',
  className,
}: {
  value: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (reduced || !inView || started.current) return;
    started.current = true;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(value * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    setDisplay(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Score bar                                                                  */
/* -------------------------------------------------------------------------- */

/** A 0 to 100 meter that fills on first view. Value is always in the DOM. */
export function ScoreBar({
  value,
  max = 100,
  className = '',
  tone = 'cobalt',
  height = 'h-1.5',
}: {
  value: number;
  max?: number;
  className?: string;
  tone?: 'cobalt' | 'teal' | 'positive' | 'neutral';
  height?: string;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const pct = Math.max(0, Math.min(100, (value / max) * 100));

  const fill = {
    cobalt: 'bg-cobalt-500',
    teal: 'bg-teal-500',
    positive: 'bg-positive-500',
    neutral: 'bg-graphite-400',
  }[tone];

  return (
    <div
      ref={ref}
      className={`w-full overflow-hidden rounded-full bg-navy-800 ${height} ${className}`}
      role="img"
      aria-label={`${value.toFixed(1)} out of ${max}`}
    >
      <div
        className={`h-full rounded-full ${fill}`}
        style={{
          width: reduced || inView ? `${pct}%` : '0%',
          transition: reduced ? undefined : `width ${DURATION.slow}ms ${EASING.standard}`,
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Crossfade                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Crossfades between values when a key changes.
 *
 * Used for capital structure switching. Only opacity moves, and the underlying
 * text is swapped at the midpoint, so a figure never renders in a transitional
 * state that could be misread as a different number.
 */
export function Crossfade({
  keyValue,
  children,
  className,
}: {
  keyValue: string;
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  /*
   * The key change is detected during render and used to drop opacity to zero
   * for a single frame, after which it transitions back. Adjusting state during
   * render is the pattern React sanctions for reacting to a changed input, and
   * it avoids the extra commit an effect would cause.
   *
   * The new content is already in the DOM while opacity is zero, so a figure
   * never renders in a half faded state that could be misread as a different
   * number. Only opacity moves.
   */
  const [lastKey, setLastKey] = useState(keyValue);
  const [entering, setEntering] = useState(false);

  if (lastKey !== keyValue) {
    setLastKey(keyValue);
    if (!reduced && !entering) setEntering(true);
  }

  useEffect(() => {
    if (!entering) return;
    // Released on the next tick so the zero opacity frame actually paints.
    const t = setTimeout(() => setEntering(false), 24);
    return () => clearTimeout(t);
  }, [entering]);

  return (
    <div
      className={className}
      style={
        reduced
          ? undefined
          : {
              opacity: entering ? 0 : 1,
              transition: `opacity ${DURATION.fast}ms ${EASING.standard}`,
            }
      }
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Collapse                                                                   */
/* -------------------------------------------------------------------------- */

/** Expand and collapse using a grid row transition, which does not reflow. */
export function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return open ? <div>{children}</div> : null;
  }
  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: open ? '1fr' : '0fr',
        opacity: open ? 1 : 0,
        transition: `grid-template-rows ${DURATION.base}ms ${EASING.standard}, opacity ${DURATION.base}ms ${EASING.standard}`,
      }}
      aria-hidden={!open}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page progress                                                              */
/* -------------------------------------------------------------------------- */

/** A thin reading-progress bar for long research pages. */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);
  const reduced = useReducedMotion();

  const update = useCallback(() => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    setPct(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
  }, []);

  useEffect(() => {
    // Scroll position is an external system, so it is read from listener
    // callbacks rather than written synchronously in the effect body. The
    // initial measurement is deferred by one frame for the same reason.
    const id = requestAnimationFrame(update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-cobalt-500/70"
        style={{
          width: `${pct}%`,
          transition: reduced ? undefined : `width 90ms ${EASING.linear}`,
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hover lift                                                                 */
/* -------------------------------------------------------------------------- */

/** Shared class string for card hover. Movement stays at 2px. */
export const hoverLift =
  'transition-[transform,border-color,background-color,box-shadow] duration-200 ease-standard motion-safe:hover:-translate-y-0.5 hover:shadow-lift';

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950';

export type { CSSProperties };
