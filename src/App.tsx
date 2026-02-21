import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    
    // Custom event for internal navigation
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  if (path === "/admin") {
    return <AdminDashboard />;
  }

  return <LandingPage />;
}
