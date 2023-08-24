//https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import { useState, useRef, useEffect } from "react";

interface InfiniteScrollHookArgs<T, E extends HTMLElement> {
    fetchData: (page: number) => Promise<T[]>;
    observerOptions?: IntersectionObserverInit;
    initialPage?: number;
}

export default function useInfiniteScroll<T = any, E extends HTMLElement = HTMLElement>({
    fetchData,
    observerOptions,
    initialPage,
}: InfiniteScrollHookArgs<T, E>) {
    const [data, setData] = useState<T[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState<number>(() => initialPage || 0);
    const [error, setError] = useState("");
    const targetRef = useRef<E | null>(null);

    const stopFetch = () => setHasMore(false);

    useEffect(() => {
        const observerTarget = targetRef.current; // Capture current value

        if (!hasMore || !observerTarget) return; // No need to continue observing if no more data or ref is not available

        const observer = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
            if (entry.isIntersecting && !isLoading && hasMore) {
                setIsLoading(true);
                fetchData(page)
                    .then((newData) => {
                        if (newData.length === 0) setHasMore(false);
                        else {
                            setData((prevData) => [...prevData, ...newData]);
                            setPage((prevPage) => prevPage + 1);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                        setError(error?.message);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        }, observerOptions);

        observer.observe(observerTarget);

        return () => {
            observer.disconnect();
        };
    }, [targetRef, isLoading, hasMore, page, fetchData, observerOptions]);

    return { hasMore, data, isLoading, page, error, targetRef };
}
