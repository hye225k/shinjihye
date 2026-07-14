import FortuneCard from "@/components/FortuneCard";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 bg-gradient-to-b from-indigo-50 to-white px-6 py-16 dark:from-neutral-950 dark:to-black">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
          오늘의 운세
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          카드를 눌러 오늘의 운세와 행운의 아이템을 확인해보세요
        </p>
      </div>
      <FortuneCard />
    </div>
  );
}
