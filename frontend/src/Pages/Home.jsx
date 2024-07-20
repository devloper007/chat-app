import { useEffect, useState } from "react";
import Login from "../component/Auth/Login";
import Signup from "../component/Auth/Signup";
import { useHistory } from "react-router-dom";
function Home() {
    const [loginSelected, setLoginSelected] = useState(true);
    const history = useHistory();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if(user) history.push("/chat")
    },[history])
    return (
        <div className="bg-chat-app-bg bg-cover bg-center min-h-screen flex flex-col justify-center items-center">
       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
       <h1 className="text-center text-3xl font-bold mb-8">Welcome to Chat App</h1>
        <div className="flex justify-center gap-8">
          <div className="w-full">
            <div className="flex gap-2">
              <h2 className={`border rounded-md w-full text-xl text-center font-bold mb-4 py-2 shadow-inner shadow-black cursor-pointer ${loginSelected && 'bg-blue-500 text-white'}`} onClick={() => setLoginSelected(true)}>Login</h2>
              <h2 className={`border rounded-md w-full text-xl text-center font-bold mb-4 py-2 shadow-inner shadow-black cursor-pointer ${!loginSelected && 'bg-blue-500 text-white'}`} onClick={() => setLoginSelected(false)}>Sign Up</h2>
            </div>
            {loginSelected ? <Login setLoginSelected={setLoginSelected}/> : <Signup />}
          </div>
        </div>
       </div>
      </div>      
    );
}

export default Home;