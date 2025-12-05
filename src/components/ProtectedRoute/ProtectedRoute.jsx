import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, loggedIn, isLoggedInLoading }) {
  return loggedIn ? children : <Navigate to="/"></Navigate>;
}

export default ProtectedRoute;
