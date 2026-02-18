import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-icon">♪</span>
        <span className="logo-text">SoundVault</span>
      </Link>

      <button className="burger" onClick={() => setMenuOpen(o => !o)} aria-label="Меню">
        <span></span><span></span><span></span>
      </button>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>Главная</NavLink>
        <NavLink to="/albums" onClick={() => setMenuOpen(false)}>Альбомы</NavLink>
        <NavLink to="/artists" onClick={() => setMenuOpen(false)}>Артисты</NavLink>
        {user ? (
          <>
            <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
              <span className="user-badge">{user.role === 'admin' ? '⭐' : '👤'}</span>
              {user.username}
            </NavLink>
            <button className="btn-logout" onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>Войти</NavLink>
            <NavLink to="/register" className="btn-register" onClick={() => setMenuOpen(false)}>
              Регистрация
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
