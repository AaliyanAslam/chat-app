import React from 'react'
import { signOut , getAuth } from 'firebase/auth'
import {  useNavigate } from 'react-router-dom'
import { setUser } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'



const Dashboard = () => {
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
    <div className="p-6 flex justify-between">
      <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
    
    
    </>
  )
}

export default Dashboard