import { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');


  useEffect(()=>{
    const loggedInUserId = localStorage.getItem('trtc_userID');
    if(loggedInUserId){
      navigate('/',{replace:true});
    }
  },[navigate])

  const handleLogin = async(e) =>{
    e.preventDefault();

    if(!userId.trim()){
      setError('please enter valid userId');
    }

    setLoading(true);
    setError('');
  }


  return (
    <div>
      
    </div>
  )
}
