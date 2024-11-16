// login code here
import axios from 'axios';
import React from 'react'
import { useRef } from 'react'
import { msgAtom } from '../atom/atom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

function Display() {
    const msg = useRecoilValue(msgAtom);
    return <div className='text-white'>
        {msg}
    </div>


}

const Login = () => {
    // call the functions onClick of button.
    const userRef = useRef();
    const passRef = useRef();
    const setMsg = useSetRecoilState(msgAtom);
    async function handleLogin() {
        const username = userRef.current.value;
        const password = passRef.current.value;
        const res = await axios.post('http://localhost:3000/users/login', {
            "username": username,
            "password": password
        })
        localStorage.setItem("token", res.data.token);
        setMsg(localStorage.getItem("token"));
        window.open('/courses', "_self");
    }
    return <div className='bg-gray-800 h-screen w-screen '>
        <div className=' flex justify-between p-2 shadow-lg md:text-3xl text-xl'>
            <div className='p-2'>

                <a href='/courses' className=' text-white font-bold italic p-3'>Coursify</a>
            </div>
            <div>
                <a href='/' className=' p-2 text-white m-3 italic' >Register</a>
                <a href='/courses' className=' p-2 text-white m-3 italic'>Courses</a>
                <a href='/about'  className=' p-2 text-white italic'>About</a>
            </div>
        </div>
        <div className='flex justify-center translate-y-20'>
            <div className=' justify-center shadow-lg w-1/3 h-96'>

                <input type="text" ref={userRef} placeholder='UserName' className='w-full h-16 rounded-lg mt-5 mb-5 ml-3 mr-3 text-3xl ' />
                <input type="password" ref={passRef} placeholder='password' className='w-full h-16 rounded-lg mt-2 mb-20 ml-3 mr-3 text-3xl' />
                <div className='md:flex h-20 justify-center md:text-3xl text-2xl'>


                    <button onClick={handleLogin} className=' p-2 text-white m-3 w-36 transition ease-in-out duration-750 hover:p-3 italic border-2 h-18 rounded-xl'>Login</button>
                </div>

            </div>


        </div>
        <Display />

    </div>
}

export default Login