export default function BackgroundLayers() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="aurora-canvas absolute inset-0" />
      <div className="absolute inset-0 bg-grid" />
      <div
        className="bg-glow-blue absolute -top-52 -left-52 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--aurora-blue) 0%, transparent 68%)' }}
      />
      <div
        className="bg-glow-purple absolute -bottom-52 -right-52 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--aurora-purple) 0%, transparent 68%)' }}
      />
      <div className="absolute inset-0 bg-noise" />
    </div>
  );
}
