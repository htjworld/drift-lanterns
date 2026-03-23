import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { hasCredit } from "./optionalRoutes";
import { cueMap, cueSetIds } from "./cues";
import { shuffle } from "./utils/shuffle";
import { audioBus } from "./audioBus";

const SHOW_BOAT = false;
const LAUNCH_START_Y = 10;
const LAUNCH_DISTANCE_VH = 130;
const LAUNCH_DURATION = 38;

export default function HomePage() {
  const [text, setText] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(60);
  const [launched, setLaunched] = useState<boolean>(false);
  const [cueIndex, setCueIndex] = useState<number>(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showFinalMsg, setShowFinalMsg] = useState(false);
  const [currentSetId, setCurrentSetId] = useState<string | null>(null);
  const [currentCues, setCurrentCues] = useState<string[]>([]);
  const navigate = useNavigate();

  // 세트 순서 큐
  const orderRef = useRef<string[]>([]);
  const orderIdxRef = useRef<number>(0);


  useEffect(() => {
    orderRef.current = shuffle(cueSetIds);
    orderIdxRef.current = 0;
    // 첫 세트 미리 세팅
    // 가능한 추가 방안 : start 버튼시 세팅하기
    const firstId =
      orderRef.current[orderIdxRef.current % orderRef.current.length];
    setCurrentSetId(firstId);
    setCurrentCues(cueMap[firstId]);
  }, []);

  // 시작 시 타이머와 음악 트리거
  useEffect(() => {
    if (!started || !currentSetId) return;

    setLaunched(true);
    setSeconds(60);
    setCueIndex(0);

    // 1초 카운트다운
    const tick = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    // 문구 전환 간격 계산
    const lines = currentCues;
    const stepMs = Math.max(
      1,
      Math.floor((59 * 1000) / Math.max(1, lines.length))
    );

    const cueTimer = setInterval(() => {
      setCueIndex((i) => (i < lines.length - 1 ? i + 1 : i));
    }, stepMs);

    return () => {
      clearInterval(tick);
      clearInterval(cueTimer);
    };
  }, [started, currentSetId]);

  // 로고/최종 메시지 타이밍 (마지막 2초)
  useEffect(() => {
    if (seconds === 0) {
      const logoTimer = setTimeout(() => setShowLogo(true), 2000); // +2s
      const msgTimer = setTimeout(() => setShowFinalMsg(true), 3000); // +3s
      return () => {
        clearTimeout(logoTimer);
        clearTimeout(msgTimer);
      };
    } else {
      setShowLogo(false);
      setShowFinalMsg(false);
    }
  }, [seconds]);

  const advanceSet = () => {
    orderIdxRef.current += 1;
    const nextId =
      orderRef.current[orderIdxRef.current % orderRef.current.length];
    setCurrentSetId(nextId);
    setCurrentCues(cueMap[nextId]);
  };

  const reset = () => {
    setStarted(false);
    setLaunched(false);
    setSeconds(60);
    setCueIndex(0);
    setText("");
    advanceSet();
  };

  const cueMotion = useMemo(
    () =>
      ({
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.9 } },
        exit: { opacity: 0, y: -16, transition: { duration: 0.9 } }, // 위로 사라짐
      } as const),
    []
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {!started ? (
        <div className="relative z-20 mx-auto mt-20 w-full max-w-xl px-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-2xl space-y-6">
            <h1 className="text-2xl font-semibold">
              What&apos;s weighing on your mind?
            </h1>
            <p className="text-sm text-white/70">
              Write it into the lantern. We&apos;ll set it afloat together.
            </p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="Type a worry and let it drift…"
              className="w-full resize-none rounded-xl border border-white/10 bg-black/30 p-4 outline-none focus:ring-2 focus:ring-white/30"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (text === "CREDIT" && hasCredit) {
                    audioBus.play(`${import.meta.env.BASE_URL}sounds/credit.wav`, {
                      loop: true,
                      fade: false,
                    });
                    navigate("/credit");
                    return;
                  }
                  audioBus.ensureAmbient();
                  setStarted(true);
                }}
                disabled={!currentSetId}
                aria-busy={!currentSetId}
                className="rounded-xl bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200 disabled:opacity-50"
              >
                Set it afloat
              </button>
              <span className="text-xs text-white/60">
                You can start with an empty lantern, too.
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-20 flex min-h-screen items-center justify-center px-4 text-center">
          <AnimatePresence mode="wait">
            {seconds > 0 && seconds < 60 && (
              <motion.p
                key={`${currentSetId}-${cueIndex}`}
                {...cueMotion}
                className="mx-auto max-w-[32ch] text-[clamp(28px,7vw,50px)] font-semibold 
                 leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
                style={{
                  textShadow:
                    "0 3px 12px rgba(0,0,0,0.8), 0 0 28px rgba(200,200,255,0.45)",
                }}
              >
                {currentCues[cueIndex] ?? ""}
              </motion.p>
            )}
          </AnimatePresence>

          {/* 종료 시퀀스: +2s 뒤 로고, +3s 뒤 최종 메시지 */}
          {seconds === 0 && (
            <>
              {showLogo && (
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 flex items-center justify-center 
                   text-[clamp(64px,18vw,180px)] font-extrabold text-white
                   drop-shadow-[0_3px_18px_rgba(0,0,0,0.85)]"
                  style={{
                    textShadow:
                      "0 4px 14px rgba(0,0,0,0.9), 0 0 40px rgba(200,200,255,0.55)",
                  }}
                >
                  Drift Lanterns
                </motion.h1>
              )}

              {showFinalMsg && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute bottom-20 left-1/2 -translate-x-1/2 space-y-3 text-center"
                >
                  <h2 className="text-2xl font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                    The lantern is gone. You are lighter now.
                  </h2>
                  <button
                    onClick={reset}
                    className="rounded-lg border border-white/20 px-4 py-2 hover:bg-white/10"
                  >
                    Release another
                  </button>
                </motion.div>
              )}
              <button
                onClick={() => navigate("/moments")}
                className="fixed right-4 bottom-4 text-xl opacity-70 hover:opacity-100 transition"
                aria-label="Open moments"
              >
                🏮
              </button>
            </>
          )}
        </div>
      )}

      <LanternLaunch
        text={text}
        launched={launched}
        startY={LAUNCH_START_Y}
        distanceVH={LAUNCH_DISTANCE_VH}
        duration={LAUNCH_DURATION}
        withBoat={SHOW_BOAT}
      />

      {!started && (
        <div className="pointer-events-none absolute left-1/2 top-6 z-20 -translate-x-1/2 text-center text-xs text-white/60">
          A quiet place at sea. Headphones help.
        </div>
      )}
    </div>
  );
}
function makeQuadraticKeyframes({
  startY, // 시작 오프셋 (vh, +방향)
  distanceVH, // 최종 목표까지의 추가 이동 (vh, -방향)
  samples = 60, // 키프레임 개수(샘플링 수) - 많을수록 더 매끈
  epsilon = 0.18, // 바닥 속도(0~1). 높을수록 초반이 더 ‘살짝’ 움직임
}: {
  startY: number;
  distanceVH: number;
  samples?: number;
  epsilon?: number;
}) {
  // 총 이동량: initial y = +startY → final y = -(startY + distanceVH)
  const delta = -(2 * startY + distanceVH); // 음수(위로 이동)
  // 정규화된 속도 v(p) = ε + (1-ε) p^2  (0<=p<=1)
  // 적분으로 위치 s(p) = (ε p + (1-ε) p^3 / 3) / (ε + (1-ε)/3)
  const norm = epsilon + (1 - epsilon) / 3;

  const times: number[] = [];
  const y: string[] = [];

  for (let i = 0; i <= samples; i++) {
    const p = i / samples; // 0..1
    const s = (epsilon * p + ((1 - epsilon) * p ** 3) / 3) / norm; // 위치(0..1)
    const yVH = startY + delta * s; // 현재 y (vh 단위)
    times.push(p);
    y.push(`${yVH}vh`);
  }
  return { y, times };
}

function LanternLaunch({
  text,
  launched,
  startY = 0,
  distanceVH = 110,
  duration = 58,
  withBoat = true,
}: {
  text: string;
  launched: boolean;
  startY?: number;
  distanceVH?: number;
  duration?: number;
  withBoat?: boolean;
}) {
  // 2차 속도 프로파일 키프레임 생성
  const { y, times } = useMemo(
    () =>
      makeQuadraticKeyframes({
        startY,
        distanceVH,
        samples: 60,
        epsilon: 0.12,
      }),
    [startY, distanceVH]
  );

  const easeLinear = useMemo(
    () => Array(Math.max(1, times.length - 1)).fill("linear" as const),
    [times.length]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 flex items-end justify-center ${
        withBoat ? "pb-[12rem]" : "pb-[9rem]"
      }`}
    >
      <motion.div
        initial={{ y: `${startY}vh`, opacity: 1 }}
        animate={
          launched
            ? {
                y, // ⬅ 2차속도 기반 위치 키프레임
                opacity: [1, 1, 0.96, 0.9, 0.86, 0.84], // 중간에 사라지지 않게 유지
              }
            : { y: `${startY}vh`, opacity: 1 }
        }
        transition={{
          type: "keyframes",
          duration: launched ? duration : 0.4,
          ease: launched ? easeLinear : "linear", // 전 구간 linear 보간
          times,
        }}
        style={{ willChange: "transform" }}
        className="flex flex-col items-center gap-3"
      >
        <Lantern lit={launched} text={launched ? text : undefined} />
        <div className="h-5 flex items-center justify-center">
          <span
            className={`rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-white/70 transition-opacity duration-300 ease-in-out translate-y-1 md:translate-y-1.5 ${
              launched ? "opacity-0" : "opacity-100"
            }`}
          >
            Your lantern is waiting.
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function Lantern({ lit, text }: { lit?: boolean; text?: string }) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`h-24 w-20 rounded-md ${
          lit ? "bg-[#fffcf2]" : "bg-[#f1efe6]"
        }`}
        style={{
          boxShadow: lit
            ? "0 0 18px 8px rgba(255,210,120,0.35), 0 0 70px 26px rgba(255,160,80,0.18)"
            : "inset 0 0 20px rgba(0,0,0,0.15)",
        }}
      />
      <div className="absolute -top-2 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-[#8b5e34]" />
      <div className="absolute -bottom-2 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-[#8b5e34]" />
      {lit && (
        <div className="pointer-events-none absolute -inset-6 rounded-xl bg-[radial-gradient(circle,rgba(255,190,120,0.35)_0%,transparent_70%)]" />
      )}
      {text && (
        <div className="absolute inset-0 flex items-center justify-center px-2 text-center">
          <span className="line-clamp-3 text-[10px] text-black/70">{text}</span>
        </div>
      )}
    </div>
  );
}
