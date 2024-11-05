import { useQuery } from "@tanstack/react-query";
import { self } from "../http/api";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore, User } from "../store";
import { AxiosError } from 'axios';


export default function Root() {

    const {setUser}  = useAuthStore();

    const getSelf = async() => {
        const {data} = await self();
        return data;
    }

    const { data, isLoading } = useQuery({ 
        queryKey: ['self'],
        queryFn: getSelf,
        retry: (failureCount: number, error) => {
            if (error instanceof AxiosError && (error as AxiosError).response?.status === 401) return false;
            return failureCount < 3;
        }
    });

    useEffect(() => {
        if(data) setUser(data as User);
    },[data,setUser]);

    if(isLoading) return <div>Loading...</div>

    return (
        <>
        <Outlet />
        </>
    )
}
