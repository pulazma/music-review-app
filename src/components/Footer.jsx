import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-icon">♪</span>
          <span className="logo-text">SoundVault</span>
          <p>Твой музыкальный дневник</p>
        </div>
        <nav className="footer-nav">
          <Link to="/">Главная</Link>
          <Link to="/albums">Альбомы</Link>
          <Link to="/artists">Артисты</Link>
          <Link to="/profile">Профиль</Link>
        </nav>
        <p className="footer-copy">© 2024 SoundVault. Учебный проект React.</p>
      </div>
    </footer>
  );
}
