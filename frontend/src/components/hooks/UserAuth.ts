import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials,logout } from '../../store/slice/userSlice';
import { getUserData } from '../../api/userApi';
import { logoutUser } from '../../api/userApi';

export const useAuth = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null); // Store user data
    const [isLoading, setIsLoading] = useState(true); // Track loading status
    const [isError, setIsError] = useState(false); // Track error status

    useEffect(() => {

        console.log("here hook is working")
        const fetchUserData = async () => {
            try {
                const response = await getUserData();
                if (response) {
                    setUser(response.data.data); // Set user data to local state
                    dispatch(setCredentials(response.data.data)); // Dispatch to Redux store
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [dispatch]);

    const handleLogout = async () => {
        try {
            await logoutUser(); // Assuming `logo` is the logout API call
            dispatch(logout());
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return {
        isAuthenticated: !!user,
        user,
        isLoading,
        isError,
        logout: handleLogout,
    };
};
