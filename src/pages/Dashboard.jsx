import React , {useState} from "react";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedUser , setSelectedUser] = useState(null)
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(setUser(null));
    navigate("/login", { replace: true });
  };

  const handleUserSelect =(user)=> {
    setSelectedUser(user)
    console.log("selected User " , user);
    



  }

  return (
    <>
      <div className="p-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
        <div>Welcome,{user?.email}</div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </div>
      <div className="flex h-screen">
      <Sidebar onUserSelect={handleUserSelect} />
      <div className="flex-1 p-4">
        {selectedUser ? (
          <div>
            <h2 className="text-xl font-bold mb-2">Chat with <span className="text-sm font-normal">{selectedUser.email}</span></h2>
            {/* Chat screen yahan aayegi */}
          </div>
        ) : (
          <p>Select a user to start chatting.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Dashboard;
