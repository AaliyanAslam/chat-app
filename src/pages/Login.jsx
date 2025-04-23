import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessege] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      
      const userDoc = await getDoc(doc(db, "users", res.user.uid));
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch(setUser({
          uid: res.user.uid,
          email: res.user.email,
          name: userData.name, // now name will be available in Dashboard
        }));
      }
  
      setMessege(true);
      setError(false);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="text-green-600">
       
            {message ? "Account created Successfully!" : ""}
          </div>
          <div className="text-red-600"> {error}</div>

          <button type="submit" className="btn btn-neutral w-full">
            {loading ? <Loader /> : "login"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-gray-800 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
