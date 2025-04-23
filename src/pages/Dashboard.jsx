import React, { useState } from "react";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Chatbox from "../components/Chatbox";
import { FaLevelUpAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  console.log(currentUser.name);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(setUser(null));
    navigate("/login", { replace: true });
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    console.log("Selected User:", user);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 flex justify-between items-center bg-white shadow-sm">
        {/* Mobile Sidebar Toggle */}
<button
  onClick={() => setSidebarOpen(true)}
  className="md:hidden text-gray-600 hover:text-black mr-2"
>
  ☰
</button>

        <span className=" font-bold flex items-center gap-0 text-lg">
          ChatUp <FaLevelUpAlt className="text-black-600" />
        </span>
        <div className="text-gray-600 text-sm">Welcome, <span className="font-bold">{currentUser?.name}</span></div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition text-sm flex items-center gap-1"
        >
          Logout <IoMdLogOut />
        </button>
      </header>

      {/* Main Layout */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
  isOpen={sidebarOpen}
  onUserSelect={handleUserSelect}
  onClose={() => setSidebarOpen(false)}
/>



        {/* Chatbox Area */}
        <div className="flex-1 bg-gray-50 p-4">
          <Chatbox selectedUser={selectedUser} currentUser={currentUser} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
