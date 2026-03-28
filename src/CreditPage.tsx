import { Link } from "react-router-dom";
import { useEffect } from "react";
import { audioBus } from "./audioBus";
import BackgroundLanterns from "./components/BackgroundLanterns";

export default function CreditPage() {
  useEffect(() => {
    return () => {
      audioBus.pause(200); // 페이지 떠날 때 페이드아웃
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <BackgroundLanterns
        count={16}
        text="평안"
        size="sm"
        zIndex={8}
        disableDefaultBg
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Credit</h1>
          <Link
            to="/"
            className="text-white/70 hover:text-white text-sm underline underline-offset-4"
          >
            Back
          </Link>
        </div>

        <div className="min-h-[50vh] flex items-center justify-center text-center">
          <h2
            className="text-[clamp(28px,7vw,56px)] font-semibold leading-snug text-white
                       drop-shadow-[0_3px_12px_rgba(0,0,0,0.75)]"
            style={{
              textShadow:
                "0 4px 14px rgba(0,0,0,0.85), 0 0 36px rgba(200,200,255,0.48)",
            }}
          >
            이 글을 보는 모두가 행복하길🏮
          </h2>
        </div>
      </div>
    </div>
  );
}
