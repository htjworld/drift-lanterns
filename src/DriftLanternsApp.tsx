import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Drift Lanterns – Focus mode with styled text (fixed StarDust reference)
export default function DriftLanternsApp() {
  const [text, setText] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(60);
  const [launched, setLaunched] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);

  const cues: string[] = [
    "Breathe in… and out.",
    "Waves carry what you no longer hold.",
    "You are not alone out here.",
    "Your worry is smaller than it felt.",
    "You did well. Be gentle with yourself.",
  ];
  const [cueIndex, setCueIndex] = useState<number>(0);

  useEffect(() => {
    if (!started) return;
    setLaunched(true);
    setSeconds(60);
    setCueIndex(0);

    if (!musicStarted && audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked until user interaction");
      });
      setMusicStarted(true);
    }

    const tick = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    const cueTimer = setInterval(
      () => setCueIndex((i) => (i < cues.length - 1 ? i + 1 : i)),
      12000
    );

    return () => {
      clearInterval(tick);
      clearInterval(cueTimer);
    };
  }, [started]);

  const reset = () => {
    setStarted(false);
    setLaunched(false);
    setSeconds(60);
    setCueIndex(0);
    setText("");
  };

  const cueMotion = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 1 } },
    exit: { opacity: 0, y: -8, transition: { duration: 1 } },
  } as const;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a1230] text-white">
      <audio ref={audioRef} loop>
        <source src="/sounds/ambient.mp3" type="audio/mpeg" />
      </audio>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(160,180,255,0.18),transparent_55%),linear-gradient(to_bottom,#0a1230_0%,#0a1230_40%,#050b22_60%,#020817_100%)]" />

      <StarDust />
      <Ocean />
      <Boat />
      <AmbientLanterns count={8} />

      {!started ? (
        <div className="relative z-20 mx-auto mt-20 w-full max-w-xl px-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-2xl space-y-6">
            <h1 className="text-2xl font-semibold">What&apos;s weighing on your mind?</h1>
            <p className="text-sm text-white/70">Write it into the lantern. We&apos;ll set it afloat together.</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="Type a worry and let it drift…"
              className="w-full resize-none rounded-xl border border-white/10 bg-black/30 p-4 outline-none focus:ring-2 focus:ring-white/30"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStarted(true)}
                className="rounded-xl bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
              >
                Set it afloat
              </button>
              <span className="text-xs text-white/60">You can start with an empty lantern, too.</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-20 flex min-h-screen items-center justify-center px-4 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={cueIndex}
              {...cueMotion}
              className="mx-auto max-w-[32ch] text-[clamp(28px,7vw,50px)] font-semibold leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
              style={{ textShadow: "0 3px 12px rgba(0,0,0,0.8), 0 0 28px rgba(200,200,255,0.45)" }}
            >
              {cues[cueIndex]}
            </motion.p>
          </AnimatePresence>

          {seconds === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 space-y-3 text-center"
            >
              <h2 className="text-2xl font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">The lantern is gone. You are lighter now.</h2>
              <button
                onClick={reset}
                className="rounded-lg border border-white/20 px-4 py-2 hover:bg-white/10"
              >
                Release another
              </button>
            </motion.div>
          )}
        </div>
      )}

      <LanternLaunch text={text} launched={launched} />
    </div>
  );
}

// Supporting components

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

function Boat() {
  return (
    <div className="pointer-events-none absolute left-1/2 bottom-[4rem] z-10 -translate-x-1/2">
      <motion.div animate={{ y: [0, -3, 0, 2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative">
        <div className="h-3 w-28 rounded-b-3xl bg-[#1b233a] shadow-[0_-6px_20px_rgba(255,255,255,0.06)_inset]" />
        <div className="absolute -top-12 left-1/2 h-12 w-1 -translate-x-1/2 bg-[#d9d9d9]" />
        <div className="absolute -top-12 left-1/2 h-9 w-9 -translate-x-[2px] origin-left rounded-[2px] bg-white/80" />
      </motion.div>
    </div>
  );
}

function LanternLaunch({ text, launched }: { text: string; launched: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center pb-[12rem]">
      <motion.div
        initial={false}
        animate={
          launched
            ? { y: "-110vh", opacity: [1, 1, 0.9, 0.7, 0.3, 0] }
            : { y: 0, opacity: 1 }
        }
        transition={{ duration: launched ? 18 : 0.4, ease: "easeInOut" }}
        className="flex flex-col items-center gap-3"
      >
        <Lantern lit={launched} text={launched ? text : undefined} />
        {!launched && (
          <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-white/70">Your lantern is waiting.</div>
        )}
      </motion.div>
    </div>
  );
}

function Lantern({ lit, text }: { lit?: boolean; text?: string }) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`h-24 w-20 rounded-md ${lit ? "bg-[#fffcf2]" : "bg-[#f1efe6]"}`}
        style={{
          boxShadow: lit
            ? "0 0 18px 8px rgba(255,210,120,0.35), 0 0 70px 26px rgba(255,160,80,0.18)"
            : "inset 0 0 20px rgba(0,0,0,0.15)",
        }}
      />
      <div className="absolute -top-2 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-[#8b5e34]" />
      <div className="absolute -bottom-2 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-[#8b5e34]" />
      {lit && <div className="pointer-events-none absolute -inset-6 rounded-xl bg-[radial-gradient(circle,rgba(255,190,120,0.35)_0%,transparent_70%)]" />}
      {text && (
        <div className="absolute inset-0 flex items-center justify-center px-2 text-center">
          <span className="line-clamp-3 text-[10px] text-black/70">{text}</span>
        </div>
      )}
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
