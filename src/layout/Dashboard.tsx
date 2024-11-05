import { Link, Navigate, Outlet  } from "react-router-dom"
import { useAuthStore } from "../store"

export default function Dashboard() {
    const { user} = useAuthStore();
    if(user === null){
        return <Navigate to = "/auth/login" replace={true}/>
    }
    return (
        <>
            <h1> Navbar </h1>
            <Outlet />
        </>
    )
}
