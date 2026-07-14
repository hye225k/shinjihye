"use client";

import { useState } from "react";
import { drawFortune, type FortuneResult } from "@/lib/fortunes";

// 무지개 색 (빨주노초파남보)
const RAINBOW_BADGE = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-400",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
];

export default function FortuneCard() {
  const [flipped, setFlipped] = useState(false);
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  function handleDraw() {
    if (isDrawing) return;

    if (flipped) {
      // reset to front, then draw again after the flip-back finishes
      setIsDrawing(true);
      setFlipped(false);
      window.setTimeout(() => {
        setResult(drawFortune());
        setFlipped(true);
        setIsDrawing(false);
      }, 400);
      return;
    }

    setResult(drawFortune());
    setFlipped(true);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="[perspective:1200px]">
        <div
          className={`relative h-80 w-56 transition-transform duration-700 ease-out [transform-style:preserve-3d] sm:h-96 sm:w-64 ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front face */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border-4 border-transparent bg-[linear-gradient(to_bottom_right,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#6366f1,#a855f7)] shadow-xl [backface-visibility:hidden]">
            <span className="text-6xl">🌈</span>
            <p className="text-lg font-bold text-white drop-shadow">
              오늘의 운세
            </p>
            <p className="text-sm font-medium text-white/90 drop-shadow">
              카드를 눌러 확인하세요
            </p>
          </div>

          {/* Back face */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border-4 border-transparent bg-gradient-to-br from-violet-100 via-blue-50 to-red-100 p-6 text-center shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] dark:from-violet-950 dark:via-blue-950 dark:to-red-950">
            <span className="text-4xl">✨</span>
            <p className="text-base font-medium leading-relaxed text-neutral-900 dark:text-neutral-100">
              {result?.fortune}
            </p>
            <div className="mt-1 flex flex-col gap-1 text-sm text-neutral-700 dark:text-neutral-300">
              <p>
                🍀 행운의 아이템 <span className="font-semibold">{result?.item}</span>
              </p>
              <p>
                🎨 행운의 색 <span className="font-semibold">{result?.color}</span>
              </p>
            </div>
            <div className="mt-1 flex flex-col items-center gap-2">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                🎱 행운의 로또 번호
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {result?.lotto.map((n, i) => (
                  <span
                    key={n}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow ${
                      RAINBOW_BADGE[i % RAINBOW_BADGE.length]
                    }`}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleDraw}
        disabled={isDrawing}
        className="rounded-full bg-[linear-gradient(to_right,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#6366f1,#a855f7)] px-8 py-3 text-base font-semibold text-white shadow-md transition hover:brightness-110 active:scale-95 disabled:opacity-60"
      >
        {flipped ? "다시 뽑기" : "운세 보기"}
      </button>
    </div>
  );
}
