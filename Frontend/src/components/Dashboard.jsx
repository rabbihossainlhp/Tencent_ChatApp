import ChatWindow from './ChatWindow';
import {useNavigate} from 'react-router-dom';


export default function Dashboard() {

  const navigate = useNavigate();
  const userId = localStorage.getItem('trtc_userID');
  if(!userId){
    navigate('/login');
    return;
  }

  
  return (
    <div className='h-screen w-full overflow-hidden bg-white'>
      <main className='h-full w-full'>
        <ChatWindow/>
      </main>
    </div>
  )
}
