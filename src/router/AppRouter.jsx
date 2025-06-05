import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from '../pages/LoginPage.jsx'
import MainLayout from '../layout/MainLayout'
import TodoPage from '../pages/TodoPage.jsx'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<LoginPage/>}/>
          <Route path='todopage' element={<TodoPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter