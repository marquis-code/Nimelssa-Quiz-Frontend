import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { isAuthenticated, logout } from '../helpers/auth';
import { FaUserCircle } from "react-icons/fa";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState('');

  useEffect(() => {
    const { username } = isAuthenticated();
    if (username) {
      setLoggedUser(username)
    }

  }, [])

  const handleLogout = (e) => {
    logout(() => {
      navigate('/');
    });
  }
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-green-700">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <NavLink
              className="lg:text-xl text-sm select-none font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
              to='/'
              exact
            >
              <div className='flex items-center'>
                <div className='mr-1'><img alt='nimelssaLogo' src='/logo.jpg' className='rounded-full shadow-sm w-6 h-6' /></div>
                <div>NIMELSSA</div>
              </div>
            </NavLink>
            <button
              className="bg-blue-500 rounded-full text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? <p className='text-lg font-semibold'>X</p> : <FaBars />}
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            {isAuthenticated().role === 0 && (
              <ul className="flex items-center flex-col lg:flex-row list-none lg:items-center lg:ml-auto">
                <li className="nav-item">
                  <NavLink
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to='/user'
                    exact
                  >
                    <FaUserPlus /><span className="ml-2 select-none text-sm">User Dashboard</span>
                  </NavLink>
                </li>
                <li className="nav-item" onClick={handleLogout}>
                  <NavLink
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to='/signin'
                    exact
                  >
                    <FaSignInAlt /><span className="ml-2 select-none">Logout</span>
                  </NavLink>
                </li>
                <li className='select-none flex items-center'>
                  {!loggedUser ? (
                    <p className='mr-1 hidden lg:flex'><FaUserCircle /></p>
                  ) : (
                      <p className='text-white font-semibold  text-sm ml-2 lg:text-lg font-sans'>{`Hey, ${loggedUser}`}</p>
                    )}
                </li>
              </ul>
            )}

            {isAuthenticated().role === 1 && (
              <ul className="flex flex-col items-center lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <NavLink
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to='/admin'
                    exact
                  >
                    <FaUserPlus /><span className="ml-2 select-none text-xs lg:text-sm">Admin Dashboard</span>
                  </NavLink>
                </li>
                <li className="nav-item" onClick={handleLogout}>
                  <NavLink
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to='/signin'
                    exact
                  >
                    <FaSignInAlt /><span className="ml-2 select-none text-xs lg:text-base">Logout</span>
                  </NavLink>
                </li>
                <li className='select-none flex items-center'>
                  {!loggedUser ? (
                    <p className='mr-1 hidden lg:flex'><FaUserCircle /></p>
                  ) : (
                      <p className='text-white font-semibold  text-sm ml-2 lg:text-lg font-sans'>{`Hey, ${loggedUser}`}</p>
                    )}
                </li>
              </ul>
            )}

            {!isAuthenticated() && (
              <ul className="flex flex-col items-center lg:items-center lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <NavLink
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to='/signup'
                    exact
                  >
                    <FaUserPlus /><span className="ml-2 select-none">Sign up</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to='/signin'
                    exact
                  >
                    <FaSignInAlt /><span className="ml-2 select-none">Sign in</span>
                  </NavLink>
                </li>
                <li className='hidden lg:flex pl-3 text-sm ml-2 lg:text-lg'><FaUserCircle /></li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default CustomNavbar;