import React, { useEffect, useState } from 'react'
import { loginAndGenerateUserSig } from '../services/user.service';
import {UIKitProvider,useLoginState,LoginStatus,ConversationList, Chat,MessageList,ChatHeader,Avatar,ContactInfo,ContactList,MessageInput,useConversationListState,Profile} from '@tencentcloud/chat-uikit-react';
import {IoLogoWechat} from 'react-icons/io5'
import { IoMdPeople,IoMdLogOut } from "react-icons/io";



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
    return <loadingScreen/>
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

            <TabButton
              active={activetab === 'chats'}
              onClick={()=>{
                setActiveTab('chats')
                setMobileView('list')
              }}

              icon={<IoLogoWechat/>}
              label='Chats'
            />



              <TabButton
              active={activetab === 'contacts'}
              onClick={()=>{
                setActiveTab('contacts')
                setMobileView('list')
              }}

              icon={<IoMdPeople/>}
              label='Contacts'
            />




            <TabButton
              onClick={handleLogout}

              icon={<IoMdLogOut/>}
              label='Logout'
            />


          </div>

        </nav>


        <main className='flex-1 flex overflow-hidden bg-white relative h-full'>
              {activetab === 'chats' &&(
                <ChatView/>
              )}
        </main>



      </div>

    </UIKitProvider>

  )
}




//chatview component....
function ChatView({mobileView,}){

}



//helper function...
function TabButton ({activce,onClick,icon,label}){
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center transition-all justify-center p-2  w-full ${activce? 'text-indigo-500 ': 'text-gray-500'}`}
    >
      <span className='flex text-xl items-center justify-center'>{icon}</span>
      <span className='flex text-[10px] uppercase font-bold mt-1'>{label}</span>
    </button>
  )
}




function loginHandler ({SDKAppId,userId,userSig}){
  const {status} = useLoginState({
    SDKAppID:parseInt(SDKAppId),
    userID:userId,
    userSig 
  });

  if(status === LoginStatus.ERROR){
    return(
      <div className="absolute inset-0 bg-white flex items-center justify-center font-bold">
        Sync Error. Refresh Page
      </div>
    )
  }
}



function loadingScreen(){
  return (
    <div className="h-screen flex w-full item-center justify-center bg-white font-medium text-indigo-600 tracking-widest">LOADING...</div>
  )
}