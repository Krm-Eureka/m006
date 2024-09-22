import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectIfLoggedIn = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      navigate("/Console/Content_TRC/Status");
    } else {
      navigate("/auth/Login");
    }
  }, [navigate, token]);

  return null;
};

export default RedirectIfLoggedIn;