import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
    const userId = localStorage.getItem("trtc_userID");
    return userId ? children : <Navigate to="/login"/>
} 
