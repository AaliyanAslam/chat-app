import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { setUser } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setMessage('');

      const res = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await sendEmailVerification(res.user);

      // Save user info in Firestore
      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        name: form.name,
        email: res.user.email,
        createdAt: new Date()
      });

      dispatch(setUser({
        uid: res.user.uid,
        name: form.name,
        email: res.user.email
      }));

      setMessage('Account created successfully! Please check your email for verification.');
      setForm({ name: '', email: '', password: '' });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full p-3 rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered w-full p-3 rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full p-3 rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {message && <div className="text-green-600">{message}</div>}
          {error && <div className="text-red-600">{error}</div>}

          <button type="submit" className="btn btn-neutral w-full">
            {loading ? <Loader /> : 'Signup'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
