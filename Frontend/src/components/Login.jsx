import { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { loginAndGenerateUserSig } from '../services/user.service';


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


    try{
      const res = await loginAndGenerateUserSig(userId,userName);
      if(res.success){
        localStorage.setItem('trtc_userID',userId);
        navigate('/');
      }

    }catch(err){
      setError(err.message || 'login failed!!');
    }finally{
      setLoading(false);
    }
  }




  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 to bg-pink-400'>
        <div className="h-1/2 w-1/2 p-10 flex flex-col items-center   rounded-xl bg-emerald-50 shadow-2xl ">
          <div className="content">
            <p className='bg-red-400 rounded-xs py-1 px-3 text-white font-semibold text-center'>{error? error : ''}</p>
            <h1 className='font-bold mt-4 text-2xl text-center inline-block'>Welcome to <strong className='text-red-900'>Easy</strong>  Chat..</h1>
            <p className='text-center mt-3 text-xl font-medium'>  <strong className='text-green-600'>Login</strong>| <strong className='text-blue-600'>Join</strong> </p>
            <hr  className='text-amber-800 border-2 mt-1'/>
          </div>

          <form onSubmit={(handleLogin)} className='mt-8 w-full flex flex-col items-center justify-center'>
              <div className='flex flex-col w-2/3'>
                <label htmlFor="username" className='font-bold'>UserID</label>
                <input type="text" placeholder='UserId' value={userId} onChange={(e)=>setUserId(e.target.value)}  className='border w-full rounded-xl py-1 px-3 font-bold'/>
              </div>

              <div className='flex flex-col mt-3 w-2/3'>
                <label htmlFor="yourname" className='font-bold'>Your Name (optional)</label>
                <input type="text" placeholder='Enter your name' value={userName} onChange={(e)=>setUserName(e.target.value)}  className='border w-full rounded-xl py-1 px-3 font-bold'/>
              </div>


              <button type='submit' className='bg-fuchsia-400 py-2 mt-3 hover:cursor-pointer hover:scale-95 transition-all active:scale-100 px-8 font-bold rounded-xl'>
                {loading ? 'Processing...' : 'Join Here'}
              </button>
          </form>

          
        </div>
    </div>
  )
}
