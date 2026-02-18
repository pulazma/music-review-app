import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function AlbumCard({ album }) {
  const { user } = useAuth();
  // Используем наш кастомный хук вместо прямого localStorage
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const isFav = favorites.includes(album.id);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (!user) return alert('Войдите, чтобы добавлять в избранное');
    setFavorites(prev =>
      prev.includes(album.id)
        ? prev.filter(id => id !== album.id)
        : [...prev, album.id]
    );
  };

  return (
    <Link to={`/albums/${album.id}`} className="album-card">
      <div className="album-cover-wrap">
        <img src={album.cover} alt={album.title} className="album-cover" />
        <button
          className={`fav-btn ${isFav ? 'active' : ''}`}
          onClick={toggleFavorite}
          title={isFav ? 'Убрать из избранного' : 'В избранное'}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>
      <div className="album-info">
        <h3 className="album-title">{album.title}</h3>
        <p className="album-artist">{album.artistName}</p>
        <div className="album-meta">
          <span className="album-year">{album.year}</span>
          <span className="album-rating">★ {album.rating}</span>
        </div>
        <span className="album-genre">{album.genre}</span>
      </div>
    </Link>
  );
}
