// audioBus.ts
const AMBIENT_SRC = "/sounds/ambient.mp3";

type Options = { loop?: boolean; fade?: boolean; fadeOutMs?: number };

class AudioBus {
  private audio = new Audio();
  private currentSrc: string | null = null;
  private fading = false;
  private unlocked = false;

  constructor() {
    this.audio.preload = "auto";
    this.audio.setAttribute("playsinline", "true"); // TS 안전하게

    const unlock = async () => {
      if (this.unlocked) return;
      try {
        // 언락 겸 ambient 프라임 (다운로드는 한 번만)
        if (!this.currentSrc) {
          this.audio.src = AMBIENT_SRC;
          this.currentSrc = AMBIENT_SRC;
          this.audio.load();
        }
        this.audio.muted = true;
        await this.audio.play().catch(() => {});
        await this.sleep(20);
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.muted = false;
        this.unlocked = true;
      } finally {
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("keydown", unlock);
        window.removeEventListener("touchstart", unlock);
      }
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });
  }

  private sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  private waitCanPlay(timeoutMs = 200) {
    return new Promise<void>((resolve) => {
      let done = false;
      const on = () => {
        if (done) return;
        done = true;
        this.audio.removeEventListener("canplay", on);
        resolve();
      };
      this.audio.addEventListener("canplay", on, { once: true });
      setTimeout(() => {
        if (done) return;
        done = true;
        this.audio.removeEventListener("canplay", on);
        resolve();
      }, timeoutMs);
    });
  }

  async fadeOut(ms = 300) {
    if (this.audio.paused || this.fading) return;
    this.fading = true;
    const v0 = this.audio.volume ?? 1;
    for (let i = 0; i < 6; i++) {
      this.audio.volume = Math.max(0, v0 * (1 - i / 6));
      await this.sleep(ms / 6);
    }
    this.audio.pause();
    this.audio.volume = v0;
    this.fading = false;
  }

  async play(
    src: string,
    { loop = true, fade = true, fadeOutMs = 300 }: Options = {}
  ) {
    if (this.currentSrc === src && !this.audio.paused) return;

    await this.fadeOut(fadeOutMs);

    this.audio.loop = loop;
    this.audio.src = src;
    this.currentSrc = src;

    this.audio.preload = "auto";
    this.audio.load();

    // 재생 준비 기다리기
    await this.waitCanPlay(400);

    const prevVol = this.audio.volume ?? 1;
    if (fade) this.audio.volume = 0;

    try {
      // play가 막히면 unlock 다시 유도
      await this.audio.play();
    } catch {
      console.warn("Audio autoplay blocked, waiting for user gesture");
    }

    if (fade) {
      for (let i = 1; i <= 6; i++) {
        this.audio.volume = Math.min(prevVol, i / 6);
        await this.sleep(40);
      }
    }
  }

  async ensureAmbient() {
    // readyState 4면 로드 완료
    if (this.audio.readyState < 4) {
      this.audio.src = AMBIENT_SRC;
      this.audio.load();
    }

    if (!this.audio.paused && this.audio.currentTime > 0) return;
    await this.play(AMBIENT_SRC, { loop: true, fade: true });
  }

  pause(ms?: number) {
    this.fadeOut(ms);
  }
}

export const audioBus = new AudioBus();
