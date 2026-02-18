import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { albums } from '../data/musicData';
import AlbumCard from '../components/AlbumCard';

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [favorites] = useLocalStorage('favorites', []);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [saved, setSaved] = useState(false);

  const favAlbums = albums.filter(a => favorites.includes(a.id));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = () => {
    if (!newUsername.trim()) return;
    updateUser({ username: newUsername });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <span>{user.username[0].toUpperCase()}</span>
          {user.role === 'admin' && <span className="admin-badge">ADMIN</span>}
        </div>

        {editing ? (
          <div className="profile-edit">
            <input
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              className="edit-input"
              placeholder="Новое имя"
            />
            <div className="edit-actions">
              <button className="btn btn-primary" onClick={handleSave}>Сохранить</button>
              <button className="btn btn-outline" onClick={() => setEditing(false)}>Отмена</button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <h2>{user.username}</h2>
            <p className="user-email">{user.email}</p>
            <span className={`role-badge ${user.role}`}>
              {user.role === 'admin' ? '⭐ Администратор' : '👤 Пользователь'}
            </span>
            {saved && <span className="success-msg">✓ Сохранено!</span>}
            <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)}>
              ✏️ Изменить имя
            </button>
          </div>
        )}

        <div className="profile-stats">
          <div className="stat">
            <strong>{favAlbums.length}</strong>
            <span>В избранном</span>
          </div>
          <div className="stat">
            <strong>{user.role === 'admin' ? 'Admin' : 'User'}</strong>
            <span>Роль</span>
          </div>
          <div className="stat">
            <strong>{new Date(user.createdAt).toLocaleDateString('ru-RU')}</strong>
            <span>Дата регистрации</span>
          </div>
        </div>

        <button className="btn btn-danger" onClick={handleLogout}>
          🚪 Выйти из аккаунта
        </button>
      </div>

      {/* Избранные альбомы */}
      <section className="section">
        <h3>Избранные альбомы ({favAlbums.length})</h3>
        {favAlbums.length === 0 ? (
          <p className="empty-fav">Вы пока не добавили ни одного альбома в избранное. <a href="/albums">Открыть каталог →</a></p>
        ) : (
          <div className="albums-grid">
            {favAlbums.map(album => <AlbumCard key={album.id} album={album} />)}
          </div>
        )}
      </section>

      {/* Панель админа */}
      {user.role === 'admin' && (
        <section className="section admin-panel">
          <h3>⭐ Панель администратора</h3>
          <div className="admin-stats">
            <div className="admin-stat">
              <span>Всего альбомов в каталоге</span>
              <strong>{albums.length}</strong>
            </div>
            <div className="admin-stat">
              <span>Пользователей в системе</span>
              <strong>
                {JSON.parse(localStorage.getItem('users') || '[]').length}
              </strong>
            </div>
          </div>
          <p className="admin-note">
            Как администратор вы имеете доступ к расширенной статистике и управлению контентом.
          </p>
        </section>
      )}
    </div>
  );
}
