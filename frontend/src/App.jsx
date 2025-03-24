import React from 'react'
import Signup from './components/Signup'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import CreateProduct from './components/CreateProduct'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/create' element={<CreateProduct />} />
    </Routes>
    </BrowserRouter>
  )
}


export default App