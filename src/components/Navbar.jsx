import React from 'react'
import { NavLink } from 'react-router'

function NavBar() {

  const menus = [
{id: 1, menu : "Login", path: "/" },
{id: 3, menu : "Todolist", path: "/todopage" },


  ]
  return (
    <nav className='h-13 bg-gray-700 text-amber-50 flex justify-center items-center  font-bold gap-6'>
      {menus.map((item) =>(
        <NavLink key={item.id} to={item.path}>{item.menu}</NavLink>
      ))}

    </nav>
  )
}

export default NavBar