//  implement the home page UI here.
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// compoents imports
import Login from '../components/Login'
import Register from '../components/Register'
import Courses from '../components/Courses'

const Home = () => {
  return (
    //  write home page UI code here
    <div>
      <Login/>
    </div>
  )
}

export default Home