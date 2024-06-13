import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpWithEmail } from '../../firebase.js'
import { useDispatch } from 'react-redux'
import { login } from '../../Functionality/authSlice.js';
import { signInWithEmail, signInWithGoogle } from '../../firebase.js';
import Loader from '../../Loader.jsx';

const Login = () => {

  const dispatch = useDispatch();
  const navigator = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [type, setType] = useState('password');
  const [toggleType, setToggleType] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const showHidePass = () => {
    setToggleType(!toggleType)
    setType(toggleType? "password" : "text")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)
    try {
      const res = await signInWithEmail(email, password);
      console.log('Response', res);
      if (res[0]) {
        sessionStorage.setItem('isLogin', true);
        dispatch(login())
        setEmail('')
        setPassword('')
        setErrMsg('')
        location.replace('/')
      }
      else {
        setErrMsg('Username and Password doesn\'t match to the record. Please check and try again');
      }
      setLoading(false)
    }
    catch (err) {
      console.log("Login Error :: ", err);
      setLoading(false)
    }

  };

  const authGoogle = async () => {
    try {
      const res = await signInWithGoogle()
      console.log(res)
      if (res[0]) {
        sessionStorage.setItem('isLogin', true)
        dispatch(login())
        location.replace('/')
      }
      else {
        setErrMsg('Something went wrong. Please check your internet connection and try again.')
      }
    }
    catch (err) {
      console.log("Google Sign Up Error :: ", err);
    }
  }



  return (
    <>
      {loading ? <Loader loadingText='Logging...' toggle={false} cls='flex justify-center items-center top-0' /> : ''}
      <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 border border-green-400 py-12 px-5 rounded-s-md">
          <div>
            <h2 className=" text-center text-3xl font-extrabold text-green-500">Login</h2>
          </div>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-5">
              <div className=''>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email" required className="relative block w-full px-3 py-3 border border-green-400 placeholder-gray-500 outline-none rounded-md text-lg" placeholder="Email address" value={email} onChange={handleEmailChange} />
              </div>
              <div className='flex'>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type={type} autoComplete="current-password" required className="relative block w-full px-3 py-3 border border-green-400 placeholder-gray-500 outline-none rounded-l-md text-lg" placeholder="Password" value={password} onChange={handlePasswordChange} />
                <i className={`fa ${toggleType? "fa-eye-slash" : "fa-eye"} grid place-items-center bg-green-400 text-white w-14 rounded-r-md cursor-pointer`} onClick={showHidePass}></i>
              </div>
            </div>

            <div className='mt-5'>
              <button type="submit" className="w-full py-3 text-lg bg-green-400 rounded-md text-white border border-green-400 active:bg-blue-400">
                Login
              </button>

              <div className='my-3 text-center'>
                <span className='text'>OR</span>
              </div>

              <div className='w-full flex justify-center items-center border border-green-400 py-3 cursor-pointer rounded-md' onClick={authGoogle}>
                <img src='/icon/google.png' className='w-6 block mx-3' />
                <span>LOGIN WITH GOOGLE</span>
              </div>

              <span className='block my-3 text-center'>Don't have an account? <Link to="/signup" className='text-blue-500 underline'>Sign Up</Link></span>
              <span className='block text-center mt-5 text-lg text-red-500'>{errMsg}</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
