import { LoadedAt } from "@/components/loaded-at";
import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

const cacheThisAutoRemoteDynamic = async () => {
  'use cache: remote';
  cacheLife({ stale: 60, expire: 3600, revalidate: 10 });
  cacheTag('cacheThisAutoRemoteDynamic');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Date.now();
};

const DataFetcher = async () => {
  await connection();
  const timestamp = await cacheThisAutoRemoteDynamic();
  return <p>Data fetched at: {new Date(timestamp).toLocaleTimeString()}</p>;
}

export default async function AutoRemoteDynamic() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Link className="font-semibold hover:underline text-lg self-start mb-6" href="/">← Back to Home</Link>
        <Suspense fallback={<p>Loading...</p>}>
          <DataFetcher />
        </Suspense>
        <LoadedAt />
      </main>
    </div>
  );
}
