const BackgroundBeams = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-900 to-cyan-900" />
      <div className="absolute inset-0">
        {/* Animated beams */}
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse opacity-60" />
        <div className="absolute top-1/2 right-1/3 w-px h-24 bg-gradient-to-b from-transparent via-blue-800 to-transparent animate-pulse delay-300 opacity-60" />
        <div className="absolute bottom-1/4 left-1/2 w-px h-28 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse delay-700 opacity-60" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/6 left-1/6 w-32 h-32 bg-gradient-to-r from-blue-900/20 to-cyan-400/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-1/6 right-1/6 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-blue-900/20 rounded-full blur-xl animate-float delay-1000" />
        <div className="absolute top-1/2 left-1/8 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-float delay-500" />
      </div>
    </div>
  );
};

// Aceternity UI Spotlight Effect
const Spotlight = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-radial from-blue-400/30 via-cyan-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
    </div>
  );
};

// Grid Background Pattern
const GridPattern = () => {
  return (
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  );
};

export { BackgroundBeams, Spotlight, GridPattern}