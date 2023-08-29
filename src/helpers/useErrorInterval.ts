import {useEffect, useRef} from 'react';

function useInterval(callback: () => void) {
    const delay = 1500; // 15 seconds
    const savedCallback = useRef<() => void>();
    const iterationCount = useRef(0);
    const maxIterations = 3;

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCallback.current && iterationCount.current < maxIterations) {
                savedCallback.current();
                iterationCount.current += 1;
            }
        }

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => {
                clearInterval(id);
                iterationCount.current = 0;
            }
        }
    }, [delay]);
}

export default useInterval;
