import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // ⏳ While checking auth
  if (user === undefined) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}