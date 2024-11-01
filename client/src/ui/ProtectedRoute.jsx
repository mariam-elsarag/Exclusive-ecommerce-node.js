import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useApp } from "../Context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useApp();
  console.log(user);
  if (!user) return <Navigate to="/home" replace />;
  return children;
};

export default ProtectedRoute;
