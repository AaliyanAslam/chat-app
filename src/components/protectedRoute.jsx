import React from 'react'
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'

const protectedRoute = ({children}) => {
    const navigate = useNavigate()

    const user = useSelector((state)=> state.auth.user)
if(!user){
    // return <Navigate to="/login"/>
    return navigate("/login")
}

  return children
    
  
}

export default protectedRoute