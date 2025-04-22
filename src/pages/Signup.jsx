import React , {useState} from 'react'
import {setUser} from "../features/auth/authSlice"
import { useDispatch } from 'react-redux'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { sendEmailVerification } from 'firebase/auth'
import {auth} from "../lib/firebase"

const Signup = () => {
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const dispatch = useDispatch()


    const handleSignup = async (e) => {
        e.preventDefault();
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          
          
          const verification = await sendEmailVerification(res.user)
          dispatch(setUser(verification));
          console.log(res);
      
        } catch (err) {
          alert(err.message);
        }
      };



  return (
    <>
    
    <form onSubmit={handleSignup} className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      <button type="submit" className="btn btn-primary w-full">
        Signup
      </button>
    </form>
    
    
    
    </>
  )
}

export default Signup