import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import { useHistory } from 'react-router-dom';

function Chat() {
    const [searchText, setSearchText] = useState("");
    const [isSpinning, setIsSpinning] = useState(false);

    const { user } = ChatState();
    const userData = user?.data;
    const history = useHistory();
    
    const handleClick = () => {
      setIsSpinning(!isSpinning);
    };

    const getInitials = (name = "Default User") => {
        const nameArray = name.split(' ');
        if (nameArray.length === 1) {
            return nameArray[0][0].toUpperCase();
        }
        return (nameArray[0][0] + nameArray[nameArray.length - 1][0]).toUpperCase();
    };

    useEffect(() => {
        if (!user) {
            history.push("/");
        }
    }, [user]);

    return (
        <div>
            <div className='flex justify-between items-center border-b border-slate-400 bg-gradient-to-tr from-teal-200 to-blue-300 p-2'>
            <div className="relative w-1/6">
          <input
            className="border border-slate-400 rounded-md px-2 py-1 pl-8"
            type="text"
            name="password"
            placeholder='Search...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <span
            className="absolute inset-y-0 left-0 pl-2 flex items-center cursor-pointer"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div> 
        <div className='font-bold'>
            Chat APP
        </div>
        <div className='flex justify-end items-center gap-6 pr-2 w-1/6'>
            <i className="fa-solid fa-bell"></i>
            { userData?.pic 
            ? 
            (<img className='rounded-full w-10 h-10' src={userData?.pic} alt="user image" />) 
            :      
            (<span className='rounded-full w-10 h-10 flex items-center justify-center bg-gray-500 text-white text-xl font-bold'>{getInitials(userData?.name) || ''}</span>) }
            <i
        className={`fa-solid fa-gear text-4xl cursor-pointer ${isSpinning ? 'animate-spin-90' : ''}`}
        onClick={handleClick}
      ></i>
            <div className='absolute top-16 right-2 border rounded-md font-medium bg-slate-200'>
                <p className='mx-4 my-2 cursor-pointer'>My Profile</p>
                <hr className='border-white' />
                <p className='mx-4 my-2 cursor-pointer'>Logout</p>
            </div>
        </div>
            </div>
        </div>
    );
}

export default Chat;