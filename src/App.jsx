import { useState } from 'react'
import UserList from './Components/UserList'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Users from './Components/Users';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<UserList/>}/>
    <Route path='/user/:id' element={<Users />}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
