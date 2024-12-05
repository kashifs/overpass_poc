// File: frontend/src/hooks/useStorage.ts

import { useEffect, useState } from 'react';
import init, { default as ClientStorage } from '@/pkg/overpass_wasm';

export function useStorage() {
    const [storage, setStorage] = useState<typeof ClientStorage | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function initStorage() {
            try {
                await init();
                const clientStorage = new ClientStorage();
                setStorage(clientStorage);
            } catch (err) {
                setError(err instanceof Error ? err : new Error(String(err)));
            }
        }
        initStorage();
    }, []);

    return { storage, error };
}