"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ElementType,
} from "react";

export type WaveVariant = "default" | "muted" | "onAccent" | "ghost";

type Props = {
  text: string;
  className?: string;
  as?: ElementType;
  delayMs?: number;
  charMs?: number;
  showCursor?: boolean;
  start?: boolean;
  wave?: boolean;
  waveVariant?: WaveVariant;
  /** @deprecated use waveVariant="muted" */
  waveMuted?: boolean;
  onDone?: () => void;
};

const WAVE_CLASS: Record<WaveVariant, string> = {
  default: "hero-letter-wave",
  muted: "hero-letter-wave hero-letter-wave--muted",
  onAccent: "hero-letter-wave hero-letter-wave--on-accent",
  ghost: "hero-letter-wave hero-letter-wave--ghost",
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

export function TypewriterWave({
  start = true,
  as: Tag = "span",
  className = "",
  text,
  delayMs = 0,
  ...rest
}: Props) {
  if (!start) {
    return (
      <Tag className={className}>
        <span className="invisible">{text}</span>
      </Tag>
    );
  }

  return (
    <TypewriterRun
      key={`${text}|${delayMs}`}
      as={Tag}
      className={className}
      text={text}
      delayMs={delayMs}
      {...rest}
    />
  );
}

function TypewriterRun({
  text,
  className = "",
  as: Tag = "span",
  delayMs = 0,
  charMs = 32,
  showCursor = false,
  wave = true,
  waveVariant = "default",
  waveMuted = false,
  onDone,
}: Props) {
  const variant = waveMuted ? "muted" : waveVariant;
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const [begun, setBegun] = useState(false);
  const onDoneRef = useRef(onDone);
  const finishedRef = useRef(false);

  const visibleCount = reduced ? text.length : count;
  const done = visibleCount >= text.length;

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setBegun(true), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs, reduced]);

  useEffect(() => {
    if (reduced || !begun || done) return;
    const id = window.setTimeout(() => setCount((c) => c + 1), charMs);
    return () => window.clearTimeout(id);
  }, [begun, count, charMs, reduced, done]);

  useEffect(() => {
    if (done && !finishedRef.current) {
      finishedRef.current = true;
      onDoneRef.current?.();
    }
  }, [done]);

  const waveActive = done && wave && !reduced;
  const waveClass = WAVE_CLASS[variant];
  const stagger = variant === "onAccent" || variant === "ghost" ? 0.05 : 0.065;

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {waveActive ? (
          <span className={waveClass}>
            {text.split("").map((char, i) => (
              <span
                key={i}
                className="hero-letter-wave__char"
                style={{ animationDelay: `${i * stagger}s` }}
              >
                {char === " " ? "\u00a0" : char}
              </span>
            ))}
          </span>
        ) : (
          <>
            {text.slice(0, visibleCount)}
            {showCursor && begun && !done ? (
              <span
                className={`type-cursor ml-0.5 inline-block h-[0.85em] w-[0.07em] translate-y-[0.1em] align-baseline ${
                  variant === "onAccent" ? "bg-white" : "bg-accent"
                }`}
              />
            ) : null}
          </>
        )}
      </span>
    </Tag>
  );
}
