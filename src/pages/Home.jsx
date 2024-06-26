import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet,  useNavigate } from 'react-router-dom';
import { logout, setOnlineUser, setSocketConnection, setUser } from '../Redux/UserSlice';
import SideBar from '../Components/SideBar';
import { useLocation } from 'react-router-dom';
import logo from "../assets/logo.png"
import io from 'socket.io-client'


const Home = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()

  

    const fetchUserDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("/api/user-details", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
           
            if (response.data.data.logout) {
                dispatch(logout());
                navigate("/email");
            } else {
                dispatch(setUser(response.data.data));
            }
        } catch (error) {
            
            dispatch(logout());
            navigate("/email");
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(()=>{
      const socketConnection = io('https://chat-app-backend-9j6j.onrender.com',{
        auth : {
          token : localStorage.getItem('token')
        },
      })
      socketConnection.on("onlineUser",(data)=>{
     
        dispatch(setOnlineUser(data))
      })
      dispatch(setSocketConnection(socketConnection))
      return ()=>{
        socketConnection.disconnect()
      }
    },[])
    const basePath = location.pathname === '/'
    return (
    <>
    <div className='grid md:grid-cols-[300px,1fr] h-screen max-h-screen'>
     <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
       <SideBar />
       </section>

       <section className={`${basePath&& "hidden"}`}>
         <Outlet/>
       </section>
         
       <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
            <div>
              <img
                src={logo}
                width={250}
                alt='logo'
              />
            </div>
            <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
        </div>
       </div>
       </>
    );
}

export default Home;
