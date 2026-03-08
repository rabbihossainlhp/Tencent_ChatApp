import React, { useEffect, useState } from 'react'
import { loginAndGenerateUserSig } from '../services/user.service';
import {UIKitProvider,useLoginState,loginState,ConversationList, Chat,MessageList,ChatHeader,Avatar,ContactInfo,ContactList,MessageInput,useConversationListState,Profile} from '@tencentcloud/chat-uikit-react';



export default function ChatWindow() {
  const [activetab, setActiveTab] = useState('chats');
  const [userSig, setUserSig] = useState('');
  const [loading,setLoading] = useState(true);
  const [mobileView,setMobileView] = useState('list');
  const [showProfile, setShowProfile] = useState(false);
  
  const SDKAppId = import.meta.env.VITE_REACT_TRTC_APP_ID;
  const userId = localStorage.getItem('trtc_userID');

  useEffect(()=>{
    const fetchSig = async()=>{
      try{
        const res = await loginAndGenerateUserSig(userId);
        if(res.success){
          setUserSig(res.user.userSig);
        }
      }catch(err){
        console.error('Signature error',err);
      }finally{
        setLoading(false);
      }
    };

    if(userId){
      fetchSig();
    }
  },[userId]);
 


  const handleLogout = () =>{
    localStorage.removeItem('trtc_userID');
    window.location.href = '/login'


  }

  if(loading){

  }

  return (

    <UIKitProvider>

      <div className='flex flex-col md:flex-row h-screen overflow-hidden w-full relative'>
        <nav className='w-20 bg-gray-900 hidden md:flex flex-col items-center text-white py-6 justify-between z-30 '>
          <div className="w-full flex flex-col items-center gap-6">
            <div className="hover:cursor-pointer hover:ring-2 w-10 h-10 ring-indigo-500 transition-all rounded-full"
              onClick={()=>setShowProfile(true)}
            >
              <Avatar size={40}/>
            </div>

            <div className="w-10 h-[1px] bg-gray-700"></div>

          </div>


        </nav>
      </div>

    </UIKitProvider>

  )
}
