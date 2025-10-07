import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Size = "xs" | "sm" | "md";
const sizeMap: Record<Size, { w: number; h: number; font: string }> = {
  xs: { w: 28, h: 34, font: "text-[10px]" },
  sm: { w: 36, h: 44, font: "text-[12px]" },
  md: { w: 48, h: 58, font: "text-sm" },
};

function Lantern({ text, size = "sm" }: { text?: string; size?: Size }) {
  const s = sizeMap[size];
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="rounded-md bg-[#fffcf2]"
        style={{
          width: s.w,
          height: s.h,
          boxShadow:
            "0 0 12px 4px rgba(255,210,120,0.35), 0 0 40px 18px rgba(255,160,80,0.18)",
        }}
      />
      {/* 윗/아랫 판자 느낌 */}
      <div
        className="absolute rounded-full bg-[#8b5e34]"
        style={{
          top: -6,
          left: "50%",
          width: s.w + 16,
          height: 6,
          transform: "translateX(-50%)",
        }}
      />
      <div
        className="absolute rounded-full bg-[#8b5e34]"
        style={{
          bottom: -6,
          left: "50%",
          width: s.w + 16,
          height: 6,
          transform: "translateX(-50%)",
        }}
      />
      {/* 텍스트: 주어지면 중앙 표시 */}
      {text && (
        <div className="absolute inset-0 flex items-center justify-center px-1 text-center">
          <span
            className={`${s.font} font-bold text-black/85 tracking-wide leading-none`}
          >
            {text}
          </span>
        </div>
      )}
      {/* 발광 오라 */}
      <div className="pointer-events-none absolute -inset-4 rounded-xl bg-[radial-gradient(circle,rgba(255,190,120,0.28)_0%,transparent_70%)]" />
    </div>
  );
}

export default function BackgroundLanterns({
  count = 14,
  text, // ← 옵셔널: "SJ" 주면 모든 배경 연등 안에 텍스트 표시
  size = "sm", // ← xs/sm/md
  zIndex = 5, // ← 배경 레이어 위계 제어 (기본 z-5 정도)
  disableDefaultBg, // ← 기존 배경 연등 CSS를 숨길 때 true로
}: {
  count?: number;
  text?: string;
  size?: Size;
  zIndex?: number;
  disableDefaultBg?: boolean;
}) {
  const [lanterns, setLanterns] = useState<
    { id: number; x: string; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}vw`,
      delay: Math.random() * 8,
      duration: 15 + Math.random() * 10,
    }));
    setLanterns(arr);
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden`}
      style={{ zIndex }}
      data-hide-default-bg={disableDefaultBg ? "true" : "false"}
    >
      {lanterns.map((lantern) => (
        <motion.div
          key={lantern.id}
          // ⬇️ 화면 '하단 경계'에 붙여놓고( top: 100vh ), 거기서 위로만 이동
          style={{ left: lantern.x, top: "100vh" }}
          className="absolute" // bottom-0 제거
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: "-120vh", opacity: [0, 1, 1, 0] }}
          transition={{
            delay: lantern.delay,
            duration: lantern.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Lantern text={text} size={size} />
        </motion.div>
      ))}
    </div>
  );
}
