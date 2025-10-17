import { useContext } from "react";
import { Navigate } from "react-router";
import { useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const SubAgentPrivetRoute = ({ children }) => {
  const { motherAdmin } = useContext(AuthContext);
  const location = useLocation();

  // Check if user is logged in and has role "Mother Admin"
  if (!motherAdmin || motherAdmin.role !== "SG") {
    return <Navigate to="/sg-login" state={{ from: location?.pathname }} />;
  }

  return children;
};

export default SubAgentPrivetRoute;
