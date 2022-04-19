import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../components/hooks/useAuth";

const RequireAuth = (props) => {
    const { auth } = useAuth();
    const location = useLocation();
    const allowedRoles =props.allowedRoles
    let all =props.all
    return (
        console.log(props),

        all?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : all?.user
               
    );
}

export default RequireAuth;