
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';

const App = () => {

  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/search' element={<Search />} />
        <Route path='/*' element={<Navigate to='/'/>} />
      </Routes>

    </>
  )
}

export default App