import { useQuery } from "@tanstack/react-query";
import { self } from "../http/api";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore, User } from "../store";

export default function Root() {

    const {setUser}  = useAuthStore();

    const getSelf = async() => {
        const {data} = await self();
        return data;
    }

    const { data, isLoading } = useQuery({ 
        queryKey: ['self'],
        queryFn: getSelf,
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
