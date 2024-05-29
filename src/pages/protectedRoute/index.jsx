// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
