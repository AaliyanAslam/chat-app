import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged, reload } from "firebase/auth";
import { setUser } from "./features/auth/authSlice";
import { auth } from "./lib/firebase";
import { Outlet } from "react-router-dom";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // 👈 Add this

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
          })
        );
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">{loading ? <Loader/> : <Loader/> }</p>
      </div>
    );
  }

  return <Outlet />;
}

export default App;
