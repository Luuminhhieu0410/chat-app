import { useState, useEffect } from "react";
import LoginPage from "@/pages/LoginPage";
import { useUserStore } from "@/stores/UserStore";
import { LoginApiRespone } from "@/types/User.type";
import { server } from "@/utils/server";
import LoadingPage from "@/components/loading/LoadingPage";
import { useAPI } from "@/hooks/useAPI";


type ProtectedRouteProps = {
  children: React.ReactNode;
};

const AuthUserRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, setUser, clearUser } = useUserStore();
  const {get} = useAPI();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
     
        
        const dataApiRefreshtoken: LoginApiRespone = await get('/api/user/refresh-token',{credentials:'include'})
        setUser({
          ...dataApiRefreshtoken.data,
          access_token: dataApiRefreshtoken.access_token,
          isAuthenticated: true,
        });
      } catch (error) {
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>
      
    </div>;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default AuthUserRoute;
