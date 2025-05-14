import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if(password!==confirmPassword){
      setError('passwords doesnt match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!');
      navigate('/');
    } catch (error) {
      console.error('Signup Error:', error.message);
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup (auth, provider);
      navigate('/');
    }catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className="flex flex-col items-center ml-12">
          <img src={logo}
                alt='logo'
                className='w-[550px] h-[550px] p-1'
          />
          <h2 className='text-xl font-bold mb-16 text-white text-opacity-40'> "GameShoppers — Level Up Your Game Library."</h2> 
      </div>

      <div className="flex items-center ml-16" >
        <div className="h-[550px] w-[15px] bg-white opacity-20 ml-12 mb-6 rounded-full"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center mb-28 mr-12">
        <h2 className="text-7xl font-bold mb-12 text-white text-opacity-40">Sign Up</h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-4 w-80">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-9 bg-gray-500 py-2 pl-2 pr-3 text-white focus:outline-none placeholder-white placeholder-opacity-70 p-4 border border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password (at least 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-9 bg-gray-500 py-2 pl-2 pr-3 text-white focus:outline-none placeholder-white placeholder-opacity-70 p-4 border border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-9 bg-gray-500 py-2 pl-2 pr-3 text-white focus:outline-none placeholder-white placeholder-opacity-70 p-4 border border rounded-md"
            required
          />
          <button
            type="submit"
            className="text-white border border-white-900 px-4 py-1 rounded hover:bg-black opacity-50 transition"
          >
            Sign Up
          </button>
        </form>

        <div className='text-center my-4 text-gray-500'>or</div>

        <button
          onClick={handleGoogleSignup}
          className='w-80 text-white border border-white-900 px-4 py-1 rounded hover:bg-red-500 opacity-50 transition'
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}

export default Signup;