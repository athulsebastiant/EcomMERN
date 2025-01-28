import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ShopContext } from "./context/ShopContext"; // Adjust the path based on your project structure

const ProtectedRoute = ({ element: Component }) => {
  const { token } = useContext(ShopContext);

  return token ? Component : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
