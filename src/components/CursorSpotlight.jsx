import { useEffect, useState } from "react";

const CursorSpotlight = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-10"
      style={{
        left: coords.x - 150,
        top: coords.y - 150,
        width: 300,
        height: 300,
        background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 60%)",
        borderRadius: "50%",
        filter: "blur(40px)",
        transition: "top 0.1s ease, left 0.1s ease",
      }}
    />
  );
};

export default CursorSpotlight;
