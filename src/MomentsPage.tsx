import { Link } from "react-router-dom";
import Gallery from "./components/Gallery";
import { MOMENTS } from "./data/moments";

export default function MomentsPage() {
  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Moments</h1>
        <Link to="/" className="text-white/70 hover:text-white text-sm underline underline-offset-4">Back</Link>
      </div>

      <Gallery items={MOMENTS} />

    <br></br>
    <br></br>
      <article className="prose prose-invert max-w-none prose-p:leading-relaxed">
  <h2 className="text-2xl font-bold text-white text-center">
    Who Takes Responsibility for Sky Lanterns?{" "}
  </h2>
  <p className="flex justify-end text-white/60 text-sm mt-1">
    <a href="https://github.com/htjworld" target="_blank" rel="noopener noreferrer" className="underline">
      htjworld
    </a>{" "}
    · Sep 2, 2025
  </p>
<br></br>
  <p>
    Once released, no one can predict where a sky lantern will fall. Because
    voluntary retrieval is nearly impossible, most lanterns remain uncollected.
    Every year, <strong>thousands of kilograms</strong> of debris are discovered,
    some lanterns still bearing dates from over five years ago.
  </p>

  <hr className="my-6 border-white/10" />

  <p>Major incidents have shown the risks:</p>
  <ul>
    <li>
      <strong>2018 – Goyang, Korea:</strong> A lantern caused a fire near the
      oil tank facility. Flames spread through a vapor vent, sparking a second
      blaze inside.
    </li>
    <li>
      <strong>2020 – Krefeld, Germany:</strong> Lanterns released on New Year’s
      Day set a zoo on fire, killing <strong>30+ animals</strong>, including
      orangutans and gorillas. Three women later admitted responsibility.
    </li>
  </ul>

  <hr className="my-6 border-white/10" />

  <p>
    These disasters pushed conversations about responsibility. Recently,
    experiments with <strong>biodegradable materials</strong>, bamboo frames,
    and organized cleanup groups have shown progress, but challenges remain.
  </p>
  <hr className="my-6 border-white/10" />

  <p>
    Lanterns inspire us with their beauty and meaning, but they also demand responsibility.
We built this space so only your worries drift away — and nothing else.
    <br></br><br></br>
    Thank you for enjoying this space. Whenever you have a worry or a wish to
    let go, please feel free to return anytime.
  </p>
  

</article>
<footer className="mt-12 text-center">
  <p className="text-[10px] italic font-mono text-white/40 tracking-wide">
    If you have a stunning lantern photo, please send it to 
    <a href="mailto:eeehtj@gmail.com" className="underline mx-1">eeehtj@gmail.com</a>
    <br />
    <span className="text-white/30">(Include source & location in parentheses)</span>
  </p>
</footer>
    </div>
  );
}