import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "./localStorage";

const ProtectedRoutes = ({ children, expectedRole }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const dataUser = getLocalStorage("data_user");
  let token = null;
  let role = null;

  // Check if dataUser is valid before parsing
  if (dataUser) {
    try {
      const parsedData = JSON.parse(dataUser);
      token = parsedData.token;
      role = parsedData.role; // Get the role from the parsed data
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }

  useEffect(() => {
    // Check if token exists and if the role matches the expected role
    if (!token || role !== expectedRole) {
      router.push("/"); // Redirect to login if token is missing or role does not match
    } else {
      setIsLoading(false); // Set loading to false only if token and role are valid
    }
  }, [token, role, expectedRole, router]);

  // Render children only if token exists, role matches, and loading is finished
  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while checking
  }

  return token && role === expectedRole ? children : null;
};

export default ProtectedRoutes;