import React from 'react'
import {useDispatch} from 'react-redux'
import authservice from '../../appwrite/auth'
import {logout} from "../../store/authSlice"

function LogOutBtn() {
    const dispatch = useDispatch();
    
    const logoutHandler = () => {
        authservice.logOut().then(() => {
            dispatch(logout());
        }).catch(error => {
            console.error("Logout failed:", error);
        });
    };

  return (
    <button
    className='inline-block px-6 py-2 duration-200 bg-red-500 text-white font-medium hover:bg-red-600 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogOutBtn