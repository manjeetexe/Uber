import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/userlogin'
import Home from './pages/Home'
import UserSignup from './pages/userSignup'
import CaptainSignup from './pages/captainSignup'
import CaptainLogin from './pages/captainLogin'

const App = () => {
  return (
    <>
      <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userLogin" element={<UserLogin />} />
            <Route path="/userSignup" element={<UserSignup />} />
            <Route path="/captainLogin" element={<CaptainLogin />} />
            <Route path="/captainSignup" element={<CaptainSignup />} />v
          </Routes>
      </div>
    </>
  )
}

export default App