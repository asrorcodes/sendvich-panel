export function PanelWall({ className = "" }: { className?: string }) {
  const strips = [
    { metal: "h-[7%]", foam: "flex-1", hideOnMobile: false },
    { metal: "h-[9%]", foam: "flex-1", hideOnMobile: false },
    { metal: "h-[6%]", foam: "flex-1", hideOnMobile: false },
    { metal: "h-[8%]", foam: "flex-1", hideOnMobile: false },
    { metal: "h-[7%]", foam: "flex-1", hideOnMobile: true },
    { metal: "h-[10%]", foam: "flex-1", hideOnMobile: true },
    { metal: "h-[6%]", foam: "flex-1", hideOnMobile: true },
    { metal: "h-[8%]", foam: "flex-1", hideOnMobile: true },
  ];

  return (
    <div
      className={`absolute inset-0 flex overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {strips.map((strip, i) => (
        <div
          key={i}
          className={`animate-panel relative h-full min-w-0 flex-1 flex-col border-r border-black/10 last:border-r-0 ${
            strip.hideOnMobile ? "hidden sm:flex" : "flex"
          }`}
          style={{ animationDelay: `${i * 0.35}s` }}
        >
          <div className={`metal-face relative overflow-hidden ${strip.metal}`}>
            <span className="animate-sheen absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-60" />
          </div>
          <div className={`foam-core ${strip.foam}`} />
          <div className={`metal-face ${strip.metal}`} />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-steel via-steel/78 to-steel/20 sm:to-steel/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-steel/95 via-steel/20 to-steel/40 sm:from-steel/90 sm:via-transparent sm:to-steel/35" />
    </div>
  );
}
