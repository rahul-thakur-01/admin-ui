import { Navigate, Outlet  } from "react-router-dom"
import { useAuthStore } from "../store";

export default function NonAuth() {
    // call getself to check if user is logged in
    const { user} = useAuthStore();
    if(user !== null){
        return <Navigate to = "/" replace={true}/>
    }
    return (
        <>
            <Outlet /> 
        </>
    )
}
