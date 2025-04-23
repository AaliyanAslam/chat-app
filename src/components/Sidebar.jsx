import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { X } from "lucide-react"; // close icon

const Sidebar = ({ onUserSelect, isOpen, onClose }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.uid !== currentUser?.uid) {
            usersList.push(data);
          }
        });

        setUsers(usersList);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.uid) {
      fetchUsers();
    }
  }, [currentUser?.uid]);

  return (
    <aside
      className={`fixed md:static top-0 left-0 z-40 w-3/4 md:w-1/4 h-full bg-white p-4 shadow-md transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Close button (mobile only) */}
      <div className="flex justify-between items-center mb-6 md:hidden">
        <h2 className="text-2xl font-semibold text-gray-800">Chats</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>

      {/* Desktop heading */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 hidden md:block">Chats</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40 text-gray-500">
          <Loader />
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <p className="text-gray-500 text-center">No other users found</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.uid}
              onClick={() => {
                onUserSelect(user);
                onClose(); // close on mobile after select
              }}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                {user.email[0].toUpperCase()}
              </div>
              <span className="text-gray-800">{user.name}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
