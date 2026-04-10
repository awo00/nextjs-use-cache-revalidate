import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col gap-8 py-32 px-16">
        <div className="flex gap-2 w-full max-w-3xl flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
          <Link className="font-semibold hover:underline text-lg" href="/memory/dynamic">Memory Dynamic</Link>
          <Link className="font-semibold hover:underline text-lg" href="/memory/static">Memory Static</Link>
          <Link className="font-semibold hover:underline text-lg" href="/remote/dynamic">Remote Dynamic</Link>
          <Link className="font-semibold hover:underline text-lg" href="/remote/static">Remote Static</Link>
        </div>
        <div className="flex gap-2 w-full max-w-3xl flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
          <Link className="font-semibold hover:underline text-lg" href="/auto/memory/dynamic">Auto Memory Dynamic</Link>
          <Link className="font-semibold hover:underline text-lg" href="/auto/memory/static">Auto Memory Static</Link>
          <Link className="font-semibold hover:underline text-lg" href="/auto/remote/dynamic">Auto Remote Dynamic</Link>
          <Link className="font-semibold hover:underline text-lg" href="/auto/remote/static">Auto Remote Static</Link>
        </div>
      </main>
    </div>
  );
}
