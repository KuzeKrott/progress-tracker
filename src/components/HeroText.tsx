"use client";

export default function HeroText() {
  return (
    <div className="relative z-10 h-full mx-auto px-60 flex items-center">
      <div className="text-left max-w-2xl ">
        <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Track progress. Build consistency.
        </h2>
        <p className="text-white/80 text-lg md:text-xl drop-shadow-md mb-4">
          Keep a progress diary and see the changes clearly
        </p>
        <button
          onClick={() => {
            const chart = document.getElementById("progress-chart");
            chart?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-white/30 text-white px-6 py-2 rounded-full font-semibold hover:bg-white/50 transition"
        >
          Start right now
        </button>
      </div>
    </div>
  );
}
