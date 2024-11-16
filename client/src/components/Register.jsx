// register code here
import React, { useState } from 'react'
import axios from "axios"
import { useRef } from 'react'
import { msgAtom} from '../atom/atom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Header from './Header'
function Display(){
    const msg = useRecoilValue(msgAtom);
    return <div className='text-white'>
        {msg}
    </div>

    
}

const Register = () => {
    // call the functions onClick of button.
    const userRef = useRef();
    const passRef = useRef();
    const setMsg = useSetRecoilState(msgAtom);
    async function handleRegister() {
       const username = userRef.current.value;
       const password = passRef.current.value;
        const res = await axios.post('http://localhost:3000/users/signup',{
            "username":username,
            "password":password
        })   
        setMsg(res.data.msg);
    }
    return (
        <div className='bg-gray-800 h-screen w-screen '>
            <Header/>
            <div className='flex justify-center translate-y-20'>
                <div className=' justify-center shadow-lg w-1/3 h-96'>

                <input type="text" ref={userRef} placeholder='UserName' className='w-full h-16 rounded-lg mt-5 mb-5 ml-3 mr-3 text-3xl ' />
                <input type="password" ref={passRef} placeholder='password' className='w-full h-16 rounded-lg mt-2 mb-20 ml-3 mr-3 text-3xl' />
                <div className='md:flex h-20 justify-center md:text-3xl text-2xl'>

                
                <button className=' p-2 text-white m-3  w-36 italic border-2 transition ease-in-out duration-750 hover:p-3 h-18 rounded-xl' onClick={handleRegister}>Register</button>
                 </div>

            </div>


            </div>
            <Display />

        </div>

    )
}

export default Register