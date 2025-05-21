import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Trending from './pages/Trending';

export default function App() {
  const navStyle = {
    padding: '16px',
    background: '#f8fafc',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  const linkBase = {
    margin: '0 12px',
    padding: '8px 12px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: '500',
    color: '#334155',
    transition: 'background 0.2s, color 0.2s',
  };

  const activeLink = {
    background: '#e2e8f0',
    color: '#1e293b',
  };

  return (
    <>
      <nav style={navStyle}>
        <NavLink
          to="/"
          end
          style={({ isActive }) =>
            isActive ? { ...linkBase, ...activeLink } : linkBase
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/trending"
          style={({ isActive }) =>
            isActive ? { ...linkBase, ...activeLink } : linkBase
          }
        >
          Trending
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </>
  );
}
