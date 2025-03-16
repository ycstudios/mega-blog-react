import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

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
          <div className='flex items-center'>
            <Link to='/' className='transition-transform hover:scale-105'>
              <Logo width='80px' />
            </Link>
          </div>
          <ul className='flex items-center space-x-4'>
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
      </Container>
    </header>
  );
}

export default Header;