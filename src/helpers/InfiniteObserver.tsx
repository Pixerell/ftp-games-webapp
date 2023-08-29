import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {DEFAULT_GAMES_NUMBER, setGamesPerPage} from "../redux/paginationSlice";

const InfiniteObserver = () => {
    const dispatch = useDispatch();
    const gamesPerPage = useSelector((state: RootState) => state.pagination.gamesPerPage);

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                dispatch(setGamesPerPage(gamesPerPage + DEFAULT_GAMES_NUMBER));
            }
        }, options);

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [dispatch, gamesPerPage]);

    return <div ref={observerRef}></div>;
};

export default InfiniteObserver;
