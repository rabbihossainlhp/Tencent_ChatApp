import React, { useEffect, useState } from 'react'
import { loginAndGenerateUserSig } from '../services/user.service';
import {UIKitProvider,useLoginState,LoginStatus,ConversationList, Chat,MessageList,ChatHeader,Avatar,ContactInfo,ContactList,MessageInput,useConversationListState,Profile} from '@tencentcloud/chat-uikit-react';
import {IoCloseSharp, IoLogoWechat} from 'react-icons/io5'
import { IoMdPeople,IoMdLogOut, IoMdArrowBack } from "react-icons/io";



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
    return <LoadingScreen/>
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

            <div className="w-10 h-px bg-gray-700"></div>

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
                <ChatView mobileView={mobileView} setMobileView={setMobileView}/>
              )}

              {activetab === 'contacts' &&(
                <>
                  <div className={`${mobileView==='list' ? 'flex':'hidden'} md:flex w-full md:w-80 border-r flex-col`}>
                    <div className="h-16 flex items-center px-4 border-b bg-gray-50 text-gray-800 shrink-0 font-bold text-xl ">
                      Contacts
                    </div>
                    <ContactList onContactItemClick={()=> setMobileView('detail')} />
                  </div>

                  <div className={`${mobileView==='detail'? 'flex': 'hidden'}`}>
                    <ContactInfo
                      onSendMessage={()=>{
                        setActiveTab('chats');
                        setMobileView('detail');
                      }}
                    />

                  </div>
                </>
              )}
        </main>



        {mobileView === 'list' && (
          <nav className='w-20 bg-gray-900 md:hidden h-16 flex  items-center text-white py-6 justify-between z-30 '>

            <div className="scale-75 cursor-pointer ml-2"
              onClick={()=>setShowProfile(true)}
            >
              <Avatar size={40}/>
            </div>


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

        </nav>
        )}

        {showProfile && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" 
            onClick={()=> setShowProfile(false)}
          >

          <div className="relative w-72 md:w-80 h-full md:h-auto md:max-h-[90vh] bg-white flex flex-col md:rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <span className='font-bold'>My Profile</span>
            <button
            onClick={()=>setShowProfile(false)}
            className='text-gray-500 hover:text-gray-700  p-2 transition'
            >
              <IoCloseSharp size={20}/>
            </button>
          </div>

          <div className='flex-1 overflow-y-auto'> 
            <Profile/>
          </div>

        </div>


          </div>
        )}

        

        <LoginHandler SDKAppID={SDKAppId} userId={userId} userSig={userSig}/>

      </div>

    </UIKitProvider>

  )
}




//chatview component....
function ChatView({mobileView,setMobileView}){
  const {activeConversation} = useConversationListState();
  
  useEffect(()=>{
    if(activeConversation && window.innerWidth < 768){
    setMobileView('detail');
  }
  },[activeConversation,setMobileView])
  
  return(
    <>
      <div className={`${mobileView === 'list' ? 'flex':'hidden'} md:flex w-full md:w-80 lg:w-96 flex-col border-r bg-white`}
      style={{height:'100%'}}
      >
        <div className="h-16 flex items-center px-4 border-b bg-gray-50 shrink-0 font-bold text-xl">
          Messages
        </div>

        <div className='flex-1 overflow-y-auto min-h-0'>
          <ConversationList 
          onSelectConversation={()=>setMobileView('detail')}/>
        </div>

        <div className={`${mobileView==='detail' ? 'flex':'hidden'} md:flex flex-1 flex-col bg-white`}
        style={{
          height:'100%',
          position: mobileView==='detail'?'absolute':'relative',
          inse:mobileView === 'detail' ? 0 : 'auto',
          zIndex:mobileView === 'detail ' ? 50 : 'auto',
          width:'100%'
        }}
        >
          <div className="md:hidden h-14 flex items-center px-4 shrink-0 bg-white border-b z-10">
            <button 
              onClick={(e)=>{
                e.preventDefault();
                e.stopPropagation();
                setMobileView('list');
              }}

              className='flex text-indigo-600 items-center font-bold gap-2'
            >
              <IoMdArrowBack size={18}/> Back
            </button>
          </div>

          <div className="overflow-hidden flex flex-1 flex-col min-h-0">
              <Chat>
                <ChatHeader
                  onBack={()=> setMobileView('list')}
                />
                <MessageList/>
                <MessageInput/>
              </Chat>
          </div>
        </div>
      </div>
    </>
  )
}



//helper function...
function TabButton ({active,onClick,icon,label}){
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center transition-all justify-center p-2  w-full ${active? 'text-indigo-500 ': 'text-gray-500'}`}
    >
      <span className='flex text-xl items-center justify-center'>{icon}</span>
      <span className='flex text-[10px] uppercase font-bold mt-1'>{label}</span>
    </button>
  )
}




export function LoginHandler ({SDKAppID,userId,userSig}){
  const {status} = useLoginState({
    SDKAppID:parseInt(SDKAppID),
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



function LoadingScreen(){
  return (
    <div className="h-screen flex w-full items-center justify-center bg-white font-medium text-indigo-600 tracking-widest">LOADING...</div>
  )
}