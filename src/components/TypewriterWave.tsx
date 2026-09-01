"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

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

export function TypewriterWave({
  text,
  className = "",
  as: Tag = "span",
  delayMs = 0,
  charMs = 32,
  showCursor = false,
  start = true,
  wave = true,
  waveVariant = "default",
  waveMuted = false,
  onDone,
}: Props) {
  const variant = waveMuted ? "muted" : waveVariant;
  const [count, setCount] = useState(0);
  const [begun, setBegun] = useState(false);
  const [done, setDone] = useState(false);
  const [reduced, setReduced] = useState(false);
  const onDoneRef = useRef(onDone);
  const finishedRef = useRef(false);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!start) {
      setCount(0);
      setBegun(false);
      setDone(false);
      finishedRef.current = false;
      return;
    }

    finishedRef.current = false;

    if (reduced) {
      setCount(text.length);
      setBegun(true);
      setDone(true);
      if (!finishedRef.current) {
        finishedRef.current = true;
        onDoneRef.current?.();
      }
      return;
    }

    setCount(0);
    setDone(false);
    setBegun(false);
    const begin = window.setTimeout(() => setBegun(true), delayMs);
    return () => window.clearTimeout(begin);
  }, [start, text, delayMs, reduced]);

  useEffect(() => {
    if (!start || !begun || reduced || done) return;
    if (count >= text.length) {
      setDone(true);
      if (!finishedRef.current) {
        finishedRef.current = true;
        onDoneRef.current?.();
      }
      return;
    }
    const id = window.setTimeout(() => setCount((c) => c + 1), charMs);
    return () => window.clearTimeout(id);
  }, [start, begun, count, text, charMs, reduced, done]);

  if (!start) {
    return (
      <Tag className={className} aria-hidden="true">
        <span className="invisible">{text}</span>
      </Tag>
    );
  }

  const waveActive = done && wave && !reduced;
  const waveClass = WAVE_CLASS[variant];
  const stagger = variant === "onAccent" || variant === "ghost" ? 0.05 : 0.065;

  return (
    <Tag className={className} aria-label={text}>
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
            {text.slice(0, count)}
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
