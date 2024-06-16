// src/components/Account.js
import React, { useEffect, useState } from 'react';
import { auth, onAuthStateChanged, signOutUser } from '../../../firebase';
import userIcon from '/icon/user.png'


const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Please Login First!....</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl text-green-400 font-bold mb-4 text-center">My Account</h1>
        <div className='mb-4 flex justify-center'>
            <img src={user.photoURL? user.photoURL : userIcon} className='w-20 rounded-full' />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <div className="bg-gray-100 p-2 rounded">{user.displayName || 'N/A'}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <div className="bg-gray-100 p-2 rounded">{user.email}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">UID:</label>
          <div className="bg-gray-100 p-2 rounded">{user.uid}</div>
        </div>
        <button
          onClick={signOutUser}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Account;
