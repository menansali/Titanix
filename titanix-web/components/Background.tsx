export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-titanix-void">
      {/* Grid */}
      <div className="grid-backdrop absolute inset-0" />

      {/* Ambient blobs */}
      <div className="absolute -left-40 top-0 h-[38rem] w-[38rem] rounded-full bg-titanix-violet/20 blur-[130px] animate-blob" />
      <div className="absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-titanix-indigo/20 blur-[130px] animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-titanix-glow/10 blur-[120px] animate-blob [animation-delay:-12s]" />

      {/* Top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-titanix-void via-transparent to-titanix-void" />
    </div>
  );
}
