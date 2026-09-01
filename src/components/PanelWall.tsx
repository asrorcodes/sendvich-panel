export function PanelWall({ className = "" }: { className?: string }) {
  const strips = [
    { metal: "h-[7%]", foam: "flex-1", hideOnMobile: false, drift: 0 },
    { metal: "h-[9%]", foam: "flex-1", hideOnMobile: false, drift: 1 },
    { metal: "h-[6%]", foam: "flex-1", hideOnMobile: false, drift: 2 },
    { metal: "h-[8%]", foam: "flex-1", hideOnMobile: false, drift: 0 },
    { metal: "h-[7%]", foam: "flex-1", hideOnMobile: true, drift: 1 },
    { metal: "h-[10%]", foam: "flex-1", hideOnMobile: true, drift: 2 },
    { metal: "h-[6%]", foam: "flex-1", hideOnMobile: true, drift: 0 },
    { metal: "h-[8%]", foam: "flex-1", hideOnMobile: true, drift: 1 },
  ];

  return (
    <div
      className={`absolute inset-0 flex overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="hero-ambient-glow pointer-events-none absolute inset-0 z-[1]" />

      {strips.map((strip, i) => (
        <div
          key={i}
          className={`animate-panel relative z-0 h-full min-w-0 flex-1 flex-col border-r border-black/10 last:border-r-0 ${
            strip.hideOnMobile ? "hidden sm:flex" : "flex"
          }`}
          style={{
            animationDelay: `${i * 0.55}s`,
            animationDuration: `${4.8 + (i % 4) * 0.85}s`,
          }}
        >
          <div className={`metal-face relative overflow-hidden ${strip.metal}`}>
            <span
              className="animate-sheen absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70"
              style={{
                animationDelay: `${1.2 + strip.drift * 1.8 + i * 0.4}s`,
                animationDuration: `${4.5 + (i % 3) * 1.2}s`,
              }}
            />
          </div>
          <div
            className={`foam-core animate-foam-shimmer ${strip.foam}`}
            style={{ animationDelay: `${i * 0.35}s` }}
          />
          <div className={`metal-face ${strip.metal}`} />
        </div>
      ))}

      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-steel via-steel/78 to-steel/20 sm:to-steel/25" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-steel/95 via-steel/20 to-steel/40 sm:from-steel/90 sm:via-transparent sm:to-steel/35" />
    </div>
  );
}
