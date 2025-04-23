import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import Loader from "../components/Loader"

const Sidebar = ({ onUserSelect }) => {
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
    <aside className="w-full md:w-1/4 bg-white  h-screen p-4 overflow-y-auto shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Chats</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40 text-gray-500">
          <Loader/>
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <p className="text-gray-500 text-center">No other users found</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.uid}
              onClick={() => onUserSelect(user)}
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
