import { connection } from "next/server";
import { Suspense } from "react";

const LoadedAtSuspended = async () => {
    await connection();
    return <p>Page loaded at: {new Date().toLocaleTimeString()}</p>;
}

export const LoadedAt = async () => {
    return (
        <Suspense>
            <LoadedAtSuspended />
        </Suspense>
    );
}

