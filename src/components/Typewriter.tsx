"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

type Props = {
  text: string;
  className?: string;
  as?: ElementType;
  delayMs?: number;
  charMs?: number;
  showCursor?: boolean;
  start?: boolean;
  onDone?: () => void;
};

export function Typewriter({
  text,
  className = "",
  as: Tag = "span",
  delayMs = 0,
  charMs = 32,
  showCursor = false,
  start = true,
  onDone,
}: Props) {
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
    if (!start) return;

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
    if (!begun || reduced || done) return;
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
  }, [begun, count, text, charMs, reduced, done]);

  const visible = text.slice(0, count);

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">
        {visible}
        {showCursor && begun && !done ? (
          <span className="type-cursor ml-0.5 inline-block h-[0.85em] w-[0.07em] translate-y-[0.1em] bg-accent align-baseline" />
        ) : null}
      </span>
    </Tag>
  );
}
