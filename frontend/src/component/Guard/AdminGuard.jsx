import React, { useEffect } from "react";
import { getUserDetails } from "../../service";
import { useNavigate } from "react-router-dom";

const AdminGuard = ({ children }) => {
  const navigate = useNavigate();
  const { role } = getUserDetails();
  useEffect(() => {
    if (role !== "superadmin" && role !== "admin") {
      navigate("/login");
    }
    if (role === "user") {
      navigate("/user-dashboard");
    }
  }, [role, navigate]);

  if (role !== "superadmin" && role !== "admin") {
    return null;
  }

  return children;
};

export default AdminGuard;
