import { LoadedAt } from "@/components/loaded-at";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

const cacheThisRemoteDynamic = async () => {
  'use cache: remote';
  cacheLife('days');
  cacheTag('cacheThisRemoteDynamic');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Date.now();
};

const DataFetcher = async () => {
  await connection();
  const timestamp = await cacheThisRemoteDynamic();
  return <p>Data fetched at: {new Date(timestamp).toLocaleTimeString()}</p>;
}

export default async function RemoteDynamic() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Link className="font-semibold hover:underline text-lg self-start mb-6" href="/">← Back to Home</Link>
        <Suspense fallback={<p>Loading...</p>}>
          <DataFetcher />
        </Suspense>
        <LoadedAt />
        <button type='button' className="bg-foreground text-background px-4 py-2 rounded m-6 cursor-pointer" onClick={async () => {
          'use server';
          revalidateTag('cacheThisRemoteDynamic', { expire: 60 })
        }}>
          Revalidate
        </button>
      </main>
    </div>
  );
}
