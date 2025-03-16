import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for the menu

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className='py-4 shadow-md bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
      <Container>
        <nav className='flex items-center justify-between'>
          {/* Left - Logo */}
          <div className='flex items-center'>
            <Link to='/' className='transition-transform hover:scale-105'>
              <Logo width='80px' />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-3xl">
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex items-center space-x-4'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='px-6 py-2 font-semibold rounded-lg bg-white text-blue-700 transition-transform hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='ml-4'>
                <LogoutBtn className='px-6 py-2 font-semibold bg-red-500 text-white rounded-lg transition-transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400' />
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <ul className="md:hidden flex flex-col items-center bg-blue-600 text-white py-4 space-y-3 mt-3 rounded-md">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} onClick={() => setMenuOpen(false)}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='px-6 py-2 font-semibold w-full text-center rounded-lg bg-white text-blue-700 transition-transform hover:scale-105 hover:bg-gray-200'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="mt-3">
                <LogoutBtn className='px-6 py-2 font-semibold bg-red-500 text-white rounded-lg transition-transform hover:scale-105 hover:bg-red-600' />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  );
}

export default Header;
