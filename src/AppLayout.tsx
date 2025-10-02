import { useEffect, useMemo, useRef } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function AppLayout() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 홈에서 보낸 'music:play' 이벤트 수신 → 레이아웃의 오디오 재생
  useEffect(() => {
    const onPlay = async () => {
      try { await audioRef.current?.play(); } catch {}
    };
    window.addEventListener("music:play", onPlay as EventListener);
    return () => window.removeEventListener("music:play", onPlay as EventListener);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a1230] text-white">
      {/* 음악 (영구) */}
      <audio ref={audioRef} loop>
        <source src="/sounds/ambient.mp3" type="audio/mpeg" />
      </audio>

      {/* 공통 배경 (영구) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(160,180,255,0.18),transparent_55%),linear-gradient(to_bottom,#0a1230_0%,#0a1230_40%,#050b22_60%,#020817_100%)]" />
      <StarDust />
      <Ocean />
      <AmbientLanterns count={8} />

      {/* 페이지 컨텐츠 */}
      <Outlet />
    </div>
  );
}

/* ==== 배경 컴포넌트 (기존 코드 그대로 이식) ==== */
function StarDust() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-50">
      <div className="absolute inset-0" style={{ backgroundImage: stars(160), backgroundRepeat: "repeat" }} />
      <div className="absolute inset-0" style={{ filter: "blur(1px)", opacity: 0.6, backgroundImage: stars(120) }} />
    </div>
  );
}
function stars(n: number): string {
  const dots = Array.from({ length: n }).map(() => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const s = Math.random() * 1.1 + 0.3;
    const a = Math.random() * 0.8 + 0.2;
    return `radial-gradient(${s}px_${s}px_at_${x}%_${y}%,rgba(255,255,255,${a}),transparent_${s * 2}px)`;
  });
  return dots.join(",");
}

function Ocean() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[36vh]">
      <div className="absolute inset-x-0 bottom-0 h-full bg-[linear-gradient(to_top,#021227_0%,#03142c_60%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[18vh] overflow-hidden">
        <div
          className="absolute inset-x-0 bottom-0 h-[18vh] opacity-70"
          style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(90,120,200,0.35), transparent 60%)", animation: "wave1 12s ease-in-out infinite" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[16vh] opacity-60"
          style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(60,100,200,0.22), transparent 55%)", animation: "wave2 16s ease-in-out infinite" }}
        />
      </div>
      <style>{`
        @keyframes wave1 { 0%,100% { transform: translateX(0px) } 50% { transform: translateX(20px) } }
        @keyframes wave2 { 0%,100% { transform: translateX(0px) } 50% { transform: translateX(-24px) } }
      `}</style>
    </div>
  );
}

function AmbientLanterns({ count = 6 }: { count?: number }) {
  const configs = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      delay: Math.random() * 8,
      duration: 24 + Math.random() * 14,
      startX: 8 + Math.random() * 84,
      size: 10 + Math.random() * 10,
      opacity: 0.25 + Math.random() * 0.35,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {configs.map((cfg, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${cfg.startX}vw`, bottom: "-6vh", opacity: cfg.opacity }}
          initial={{ y: 0, x: 0 }}
          animate={{ y: "-110vh", x: [0, 2, -2, 1, 0] }}
          transition={{ duration: cfg.duration, delay: cfg.delay, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
        >
          <div className="relative" style={{ width: cfg.size + 6, height: cfg.size + 12 }}>
            <div className="absolute left-1/2 top-1/2 h-full w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#fff7e6]" />
            <div className="absolute -top-1 left-1/2 h-1 w-full -translate-x-1/2 rounded-full bg-[#8b5e34]" />
            <div className="absolute -bottom-1 left-1/2 h-1 w-full -translate-x-1/2 rounded-full bg-[#8b5e34]" />
            <div className="absolute -inset-2 rounded-md bg-[radial-gradient(circle,rgba(255,200,120,0.28)_0%,transparent_70%)]" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}