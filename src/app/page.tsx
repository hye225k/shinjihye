import FortuneCard from "@/components/FortuneCard";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 bg-gradient-to-b from-red-50 via-yellow-50 to-violet-100 px-6 py-16 dark:from-neutral-950 dark:via-neutral-900 dark:to-black">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="bg-[linear-gradient(to_right,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#6366f1,#a855f7)] bg-clip-text text-3xl font-bold text-transparent">
          🌈 오늘의 운세
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          카드를 눌러 오늘의 운세와 행운의 아이템을 확인해보세요
        </p>
      </div>
      <FortuneCard />
    </div>
  );
}
