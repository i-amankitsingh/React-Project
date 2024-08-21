// SignUp.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpWithEmail, signInWithGoogle } from '../../firebase.js'
import { useDispatch } from "react-redux";
import { login } from '../../Functionality/authSlice.js';
import Loader from '../../Loader.jsx'

const SignUp = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const navigate = useNavigate('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('password');
  const [toggleType, setToggleType] = useState(false);

  const handleNameChange = (e) => setName(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const showHidePass = () => {
    setToggleType(!toggleType)
    const t = toggleType? "password" : "text";
    setType(t)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    if (password.length >= 6) {
      try {
        const res = await signUpWithEmail(name, email, password);
        if (res[0]) {
          sessionStorage.setItem('isLogin', true)
          dispatch(login())
          setUser(res)
          setErrMsg('')
          setEmail('')
          setPassword('')
          setLoading(false)
          navigate('/')
        }
        else {
          setErrMsg('The Email is already in use. Please check and try again.')
          setLoading(false)
        }
      }
      catch (err) {
        // setErrMsg(err);
        setLoading(false)
      }

    }
    else {
      setErrMsg('Password should be 6 or more character!');
      setLoading(false)
    }
  };

  const authGoogle = async () => {
    try {
      const res = await signInWithGoogle()
      console.log(res)
      if(res[0]){
        sessionStorage.setItem('isLogin', true)
        dispatch(login())
        location.replace('/')
      }
      else{
        setErrMsg('Something went wrong. Please check your internet connection and try again.')
      }
    }
    catch (err) {
      console.log("Google Sign Up Error :: ", err);
    }
  }


  return (
    <>
    {loading ? <Loader loadingText='Signing...' toggle={false} cls='flex justify-center items-center top-0 bg-[rgba(0,0,0,0.7)]' /> : ''}
    <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border border-green-400 py-12 px-5 rounded-s-md">
        <div>
          <h2 className=" text-center text-3xl font-extrabold text-green-500">Sign up</h2>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-5">
            <div className=''>
              <label htmlFor="name" className="sr-only">Username</label>
              <input id="name" name="name" type="text" autoComplete="name" required className=" relative block w-full px-3 py-3 border border-green-400 placeholder-gray-500 outline-none rounded-md text-lg" placeholder="Username" value={name} onChange={handleNameChange} />
            </div>
            <div className=''>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required className=" relative block w-full px-3 py-3 border border-green-400 placeholder-gray-500 outline-none rounded-md text-lg" placeholder="Email address" value={email} onChange={handleEmailChange} />
            </div>
            <div className='flex'>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type={type} autoComplete="current-password" required className="relative block w-full px-3 py-3 border border-green-400 placeholder-gray-500 outline-none rounded-l-md text-lg" placeholder="Password" value={password} onChange={handlePasswordChange} />
              <i className={`fa ${toggleType? "fa-eye-slash" : "fa-eye"} grid place-items-center bg-green-400 text-white w-14 rounded-r-md cursor-pointer`} onClick={showHidePass}></i>
            </div>
          </div>

          <div className='mt-5'>
            <button type="submit" className="w-full py-3 text-lg bg-green-400 rounded-md text-white border border-green-400 active:bg-blue-400">
              Sign up
            </button>

            <div className='my-3 text-center'>
              <span className='text'>OR</span>
            </div>

            <div className='w-full flex justify-center items-center border border-green-400 py-3 cursor-pointer rounded-md' onClick={authGoogle}>
              <img src='/icon/google.png' className='w-6 block mx-3' />
              <span>SIGN UP WITH GOOGLE</span>
            </div>

            <span className='block my-3 text-center'>Already have an account? <Link to="/login" className='text-blue-500 underline'>Sign In</Link></span>
            <span className='block text-center mt-5 text-lg text-red-500'>{errMsg}</span>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignUp;
