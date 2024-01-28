import { useEffect, useState } from "react";
import { auth } from "../api/auth";

export default function useUser() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await auth();
            setIsAuthenticated(isAuthenticated);
        };
        checkAuthentication();
    }, []);  
    return isAuthenticated
}