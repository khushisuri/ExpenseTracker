import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosinstance";
import { useNavigate } from "react-router-dom";
// purpose of this hook is that the user context data is removed if the user refreshes
// the app the token is persisted on localstorage but the user state is initialised to 
// original state so this hook is called to refetch the user data

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;
    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if (isMounted && response.data) {
            console.log("is running");
            
          updateUser(response.data);
        }
      } catch (error) {
        console.error("failed to fetch user", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };
    fetchUserInfo();
    
    return () => {
        //Prevents memory leaks by ensuring no updates happen after the component is unmounted as the
        // code above runs if is mounted is true
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate]);
};
