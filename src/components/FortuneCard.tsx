"use client";

import { useState } from "react";
import { drawFortune, type FortuneResult } from "@/lib/fortunes";

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
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-100 to-orange-200 shadow-xl [backface-visibility:hidden] dark:border-amber-900 dark:from-amber-950 dark:to-orange-950">
            <span className="text-6xl">🔮</span>
            <p className="text-lg font-semibold text-amber-900 dark:text-amber-100">
              오늘의 운세
            </p>
            <p className="text-sm text-amber-700/80 dark:text-amber-300/70">
              카드를 눌러 확인하세요
            </p>
          </div>

          {/* Back face */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-100 to-indigo-200 p-6 text-center shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] dark:border-violet-900 dark:from-violet-950 dark:to-indigo-950">
            <span className="text-4xl">✨</span>
            <p className="text-base font-medium leading-relaxed text-violet-950 dark:text-violet-100">
              {result?.fortune}
            </p>
            <div className="mt-2 flex flex-col gap-1 text-sm text-violet-800 dark:text-violet-300">
              <p>
                🍀 행운의 아이템 <span className="font-semibold">{result?.item}</span>
              </p>
              <p>
                🎨 행운의 색 <span className="font-semibold">{result?.color}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleDraw}
        disabled={isDrawing}
        className="rounded-full bg-violet-600 px-8 py-3 text-base font-semibold text-white shadow-md transition hover:bg-violet-700 active:scale-95 disabled:opacity-60"
      >
        {flipped ? "다시 뽑기" : "운세 보기"}
      </button>
    </div>
  );
}
