import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user.user);
  console.log(user);
  if (!user) return <Navigate to="/home" replace />;
  return children;
};

export default ProtectedRoute;
