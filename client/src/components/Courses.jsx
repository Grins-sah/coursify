// courses code here
import React, { useEffect, useState } from 'react'
import photo from './../photo.png'
import axios from 'axios'
import { useFetch } from '../hooks/useFetch'
import { msgAtom} from '../atom/atom'
import {  useRecoilValue, useSetRecoilState } from 'recoil'
import Header from './Header'

function Display(){
    const msg = useRecoilValue(msgAtom);
    const setMsg = useSetRecoilState(msgAtom);
    useEffect(()=>{
      setTimeout(()=>{
        setMsg("");
      },1000)
    },[msg]);
    return <div className='text-white text-3xl'>
        {msg}
    </div>

    
}


function handle(){
  const token = localStorage.getItem("token");
  const {data,loading,error} = useFetch("http://localhost:3000/users/courses",null,token);
  
  let ele = [];
  if(data){
    data.courses.map(u=>{
      return <CourseCard title={u.title} price={u.price} imageLink={u.imageLink} courseId={u.id}/>
      })
    ele = data.courses;
  }
  return ele;

}

const CourseCard = ({title,price,imageLink,courseId}) => {
  // const setMsg = useSetRecoilState(msgAtom);
  const courseId1 = courseId;
  const setMsg = useSetRecoilState(msgAtom);


  return <div className='m-4 w-80 h-80 bg-gray-500 rounded-lg'>
  <div  >
    <div className='flex flex-col justify-items-center	'>
      <img src='https://100x-b-mcdn.akamai.net.in/images/adhoc.jpeg' className=' m-3 h-40 w-72 bg-blue-400'>
      </img>
      <div className='text-white text-3xl m-2' >
        {title}
      </div>

      <div className='text-white text-3xl m-2'>
        ₹{price}
        <button onClick={async (courseId1)=>{
            const res = await axios.post(`http://localhost:3000/users/courses/${courseId}`,{
              token:localStorage.getItem("token")
            });
            console.log(res);
            setMsg(res.data.msg);

          }
        } className='text-2xl bg-blue-300 w-1/3 text-white rounded-full ml-5'>Buy</button>
      </div>
      
    </div>
    </div>
    
  </div>
}

// use axios here, similar to register and login
const Courses =  () => {
  const data = handle();
  const course = data.map((u)=>
    (<CourseCard title={u.title} price={u.price} imageLink={u.imageLink} courseId={u.id}></CourseCard>)
  )
  
  return (
    <div className='bg-gray-800 h-vdh w-screen'>
      <Header/>
      <div className=' w-screen h-screen'>
        <div className='flex h-full'>
          <div className='md:w-56  h-full shadow-xl bg-sky-950 flex flex-col justify-between md:block  transition-all	duration-2000 w-0 hidden'>
            <div className=' flex flex-col'>
              {/* <div>{localStorage.getItem(username)}</div> */}
              <a className='text-3xl m-3 p-3 text-white' href="">Courses</a>
              <a href="" className='text-3xl m-3 p-3 text-white'>Users</a>
              <a href="/shop" className='text-3xl m-3 p-3 text-white'>Shop</a>
              <a href="/about" className='text-3xl m-3 p-3 text-white'>About</a>
            </div>
            <div>
              <button onClick={()=>{
                localStorage.clear();
                window.open('/',"_self")
              }} className='text-3xl m-3 p-3 text-white '>Logout</button>

            </div>
            


          </div>
          <div className='flex flex-col md:flex-row'>
          {course}
          < Display/>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses