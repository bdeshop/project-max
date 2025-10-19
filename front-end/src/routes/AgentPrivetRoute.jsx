import { useContext } from "react";
import { Navigate } from "react-router";
import { useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const AgentPrivetRoute = ({ children }) => {
  const { motherAdmin } = useContext(AuthContext);
  const location = useLocation();

  // Check if user is logged in and has role "Mother Admin"
  if (!motherAdmin) {
    return <Navigate to="/ad-login" state={{ from: location?.pathname }} />;
  }

  return children;
};

export default AgentPrivetRoute;
