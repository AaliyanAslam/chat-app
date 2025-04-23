import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

const Sidebar = ({ onUserSelect }) => {
  const curentUser = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = [];

      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== curentUser.uid) {
          usersList.push(doc.data());
        }
      });
      setUsers(usersList);
    };
    fetchUsers();
  }, [curentUser.uid]);

  return (
    <>
      <div className="w-1/4 bg-gray-100 h-screen p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.uid}
              onClick={() => onUserSelect(user)}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
            >
              {user.email}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
