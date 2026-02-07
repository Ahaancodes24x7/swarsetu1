export function ImaginativeHeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* soft base wash */}
      <div className="absolute inset-0 gradient-hero opacity-[0.08] dark:opacity-[0.12]" />

      {/* floating blobs */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute top-24 -right-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute -bottom-28 left-1/3 h-[28rem] w-[28rem] rounded-full bg-secondary/15 blur-3xl animate-[pulse_12s_ease-in-out_infinite]" />

      {/* subtle sparkles */}
      <div className="absolute inset-0 opacity-40 dark:opacity-50">
        <div className="absolute left-[12%] top-[18%] h-2 w-2 rounded-full bg-primary/40 animate-[ping_3.2s_ease-in-out_infinite]" />
        <div className="absolute left-[78%] top-[26%] h-2 w-2 rounded-full bg-accent/40 animate-[ping_3.8s_ease-in-out_infinite]" />
        <div className="absolute left-[64%] top-[72%] h-2 w-2 rounded-full bg-secondary/40 animate-[ping_4.3s_ease-in-out_infinite]" />
        <div className="absolute left-[28%] top-[68%] h-2 w-2 rounded-full bg-primary/35 animate-[ping_4.7s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
