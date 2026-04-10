This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Cache revalidate issue demo

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Demo

The pages all have a function using the `use cache` directive. Some have a button to call revalidate tag, and the "auto" pages are set to revaliate every 10 seconds.

The expire time on the functions is long, and they should not expire during testing.

The expected result is that the stale data will be served to the page while the function runs and updates the cache in the background.

For the static pages, the whole page is blocked during revalidation, and the fresh data is served. While I don't agree with this, as it is just a duplication of the expire behaviour, this is documented as intended in the comments in the code.

For the dynamic pages, when the data is flagged for revalidation, the stale data is blocked while fresh data is fetched. Once the fresh data is fetched, the function returns the stale data. On refreshing, the fresh data is served. This is the worst of both worlds, as we are still waiting for fresh data, and then seeing the stale data.

In both cases there is no background revalidation of data, leading to slow, unresponsive pages.

I believe the issue lies in the the [use-cache-wrapper](https://github.com/vercel/next.js/blob/6344e18ac173c4a2b2b2855c78f7426ceb233076/packages/next/src/server/use-cache/use-cache-wrapper.ts#L2042). The `generateCacheEntry()` function is awaited during revalidation, when it should not be, so that the stale data is returned faster.