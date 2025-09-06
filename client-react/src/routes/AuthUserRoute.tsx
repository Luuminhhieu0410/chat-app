import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  children: React.ReactNode;
};

const AuthUserRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    // nếu chưa đăng nhập thì chuyển sang login
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default AuthUserRoute;
