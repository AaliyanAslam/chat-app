import React from 'react'
import { signOut , getAuth } from 'firebase/auth'
import {  useNavigate } from 'react-router-dom'
import { setUser } from '../features/auth/authSlice'
import { useDispatch , useSelector } from 'react-redux'



const Dashboard = () => {
  const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
const handleLogout = async ()=>{
const auth = getAuth()
await signOut(auth)
dispatch(setUser(null))
navigate("/login" ,{ replace: true})


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
    
    
    </>
  )
}

export default Dashboard