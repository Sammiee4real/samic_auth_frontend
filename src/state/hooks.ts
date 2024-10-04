import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
//import { setLoading } from '../components/ui/loading/loading.slice';
import type { RootState, AppDispatch } from './store';
import { useCookies } from "react-cookie";


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useLoading = () => {
//     const dispatch = useAppDispatch();
//     const setLoadingState = (isLoading: boolean) => {
//         dispatch(setLoading(isLoading));
//     };
//     return setLoadingState;
// }

export const useHeader = () => {
    const [cookies] = useCookies(['user']);
    const token = cookies.user?.user.token;

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return header;
};


