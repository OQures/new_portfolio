export function PageBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ascend-bg">
      <div className="mesh absolute inset-0 animate-shimmer-slow opacity-90 motion-reduce:animate-none" />
      <div className="dot-grid absolute inset-0" />
      <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-ascend-cyan/25 blur-[100px] animate-pulseSlow" />
      <div className="absolute -right-20 top-40 h-[380px] w-[380px] rounded-full bg-ascend-accent/15 blur-[90px] animate-float" />
      <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-sky-300/15 blur-[80px]" />
    </div>
  );
}
