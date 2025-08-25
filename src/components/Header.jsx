import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GrClose } from 'react-icons/gr'
import { GiHamburgerMenu } from 'react-icons/gi'
const Header = () => {
  const [showMenu, setshowMenu] = useState(false)
  return (
    <header className='flex flex-row items-center justify-between sm:justify-around p-4 z-10 fixed top-0 left-0 w-full bg-purple-400'>
        <h1 className='flex items-center text-lg px-1 font-bold uppercase text-white'>Weather App</h1>
        <nav className='hidden sm:flex justify-between items-center gap-4'>
        <NavLink to="/" className="hover:bg-gray-200 text-purple-800 px-2 py-1 rounded font-bold text-lg"><li className='list-none'>Home</li></NavLink>
        <NavLink to="/today" className="hover:bg-gray-200 text-purple-800 px-2 py-1 rounded font-bold text-lg"><li className='list-none'>Today</li></NavLink>
        <NavLink to="/airquality" className="hover:bg-gray-200 text-purple-800 px-2 py-1 rounded font-bold text-lg"><li className='list-none'>Air Quality</li></NavLink>
        <NavLink to="/hourly" className="hover:bg-gray-200 text-purple-800 px-2 py-1 rounded font-bold text-lg"><li className='list-none'>Hourly</li></NavLink>
        </nav>
        <nav>
          <button onClick={() => setshowMenu(!showMenu)} className='sm:hidden font-bold text-xl'>
            {showMenu ? <GrClose /> : <GiHamburgerMenu />}
            </button>
            {showMenu && ( 
              <>
              <NavLink to="/" className='hover:bg-gray-200 text-purple-800 px-2 py-1 rounded font-bold text-lg'><li className='list-none'>Home</li></NavLink>
              <NavLink to="/today" className='hover:bg-gray-200 text-purple-800 px-2 py-1 rounded font-bold text-lg'><li className='list-none'>Today</li></NavLink>
              <NavLink to="/airquality" className='hover:bg-gray-200 text-purple-800 px-2 py-1 rounded font-bold text-lg'><li className='list-none'>Air Quality</li></NavLink>
              <NavLink to="/hourly" className='hover:bg-gray-200 text-purple-800 px-2 py-1 rounded font-bold text-lg'><li className='list-none'>Hourly</li></NavLink>
              </>
            )}
        </nav>
    </header>
  )
}

export default Header