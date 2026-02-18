import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { albums } from '../data/musicData';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import StarRating from '../components/StarRating';

export default function AlbumDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { play, playAlbum, currentTrack, isPlaying, togglePlay } = usePlayer();

  const album = albums.find(a => a.id === Number(id));

  // Отзывы хранятся через наш кастомный хук
  const [reviews, setReviews] = useLocalStorage(`reviews_${id}`, album?.reviews || []);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Scroll to top при смене альбома
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!album) {
    return (
      <div className="page">
        <h2>Альбом не найден</h2>
        <Link to="/albums">← Назад к альбомам</Link>
      </div>
    );
  }

  const isFav = favorites.includes(album.id);
  const toggleFav = () => {
    if (!user) return alert('Войдите, чтобы добавлять в избранное');
    setFavorites(prev =>
      prev.includes(album.id) ? prev.filter(i => i !== album.id) : [...prev, album.id]
    );
  };

  const handlePlayTrack = (track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      play(track);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim() || reviewRating === 0) return;
    const newReview = {
      id: Date.now(),
      userId: user.id,
      username: user.username,
      rating: reviewRating,
      text: reviewText,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => [newReview, ...prev]);
    setReviewText('');
    setReviewRating(0);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : album.rating;

  return (
    <div className="page album-detail-page">
      {/* Шапка альбома */}
      <div className="album-hero">
        <img src={album.cover} alt={album.title} className="album-hero-cover" />
        <div className="album-hero-info">
          <Link to="/albums" className="back-link">← Все альбомы</Link>
          <span className="genre-tag">{album.genre}</span>
          <h1>{album.title}</h1>
          <h2 className="album-artist-name">{album.artistName}</h2>
          <div className="album-stats">
            <span>📅 {album.year}</span>
            <span>🎵 {album.tracks.length} треков</span>
            <span>⭐ {avgRating} / 10</span>
          </div>
          <p className="album-desc">{album.description}</p>
          <div className="album-actions">
            <button className="btn btn-primary" onClick={() => playAlbum(album.tracks)}>
              ▶ Слушать альбом
            </button>
            <button
              className={`btn ${isFav ? 'btn-fav-active' : 'btn-outline'}`}
              onClick={toggleFav}
            >
              {isFav ? '♥ В избранном' : '♡ В избранное'}
            </button>
          </div>
        </div>
      </div>

      {/* Список треков */}
      <section className="section">
        <h3>Треклист</h3>
        <ol className="tracklist">
          {album.tracks.map((track, i) => {
            const isActive = currentTrack?.id === track.id;
            return (
              <li
                key={track.id}
                className={`track-item ${isActive ? 'track-active' : ''}`}
                onClick={() => handlePlayTrack(track)}
              >
                <span className="track-num">
                  {isActive && isPlaying ? '♪' : i + 1}
                </span>
                <span className="track-name">{track.title}</span>
                <span className="track-dur">{track.duration}</span>
                <span className="track-play-icon">{isActive && isPlaying ? '⏸' : '▶'}</span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Рецензии */}
      <section className="section">
        <h3>Рецензии ({reviews.length})</h3>

        {/* Форма добавления рецензии */}
        {user ? (
          <form onSubmit={handleReviewSubmit} className="review-form">
            <h4>Оставить рецензию</h4>
            <div className="form-group">
              <label>Ваша оценка (1–10)</label>
              <StarRating value={reviewRating} onChange={setReviewRating} />
            </div>
            <div className="form-group">
              <label>Текст рецензии</label>
              <textarea
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Расскажите о своих впечатлениях..."
                rows={4}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={reviewRating === 0}>
              Опубликовать
            </button>
            {submitted && <span className="success-msg">✓ Рецензия опубликована!</span>}
          </form>
        ) : (
          <p className="login-prompt">
            <Link to="/login">Войдите</Link>, чтобы оставить рецензию.
          </p>
        )}

        {/* Список рецензий */}
        <div className="reviews-list">
          {reviews.length === 0 && <p className="no-reviews">Пока нет рецензий. Будьте первым!</p>}
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <strong>{review.username}</strong>
                <div className="review-stars">
                  {'★'.repeat(Math.round(review.rating / 2))}
                  <span className="review-score">{review.rating}/10</span>
                </div>
                <span className="review-date">{review.date}</span>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
