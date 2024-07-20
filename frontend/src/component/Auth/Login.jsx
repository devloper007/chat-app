import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import axios from "axios";
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const handleSubmit = async(event) => {
        event.preventDefault();
        await axios.post(`${backendUrl}/api/user/login`,{email,password},{
            headers: {
                'Content-Type': 'application/json'}}).then((response) => {
                    console.log('login response',response.data)
                    enqueueSnackbar('Login successful', { variant: 'success' });
                    localStorage.setItem('userInfo',JSON.stringify(response.data))
                    history.push('/chat')
                }).catch((error) => {
                    console.log('login error',error)
                    enqueueSnackbar('Login failed', { variant: 'error' });
                })
    }

    return (
      <div className="flex flex-col gap-4">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="email" className="font-semibold">Email*</label>
          <input
            className="border border-slate-400 rounded-md px-2 py-2"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="font-semibold">Password*</label>
          <div className="relative">
          <input
            className="border border-slate-400 rounded-md px-2 py-2 w-full"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
          </span>
        </div> 
        <button
          className="border rounded-md py-2 font-bold text-xl text-white bg-teal-500"
          type="submit"
        >
          Login
        </button>
        </form>
      </div>
    );
  };  

export default Login;