import { Link } from 'react-router-dom';
import { albums, artists } from '../data/musicData';
import AlbumCard from '../components/AlbumCard';

export default function Home() {
  const topAlbums = [...albums].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="page home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Слушай музыку.<br />
            <span className="accent">Оставляй рецензии.</span>
          </h1>
          <p className="hero-sub">
            SoundVault — сервис для любителей музыки. Слушай треки, оценивай альбомы и следи за любимыми артистами.
          </p>
          <div className="hero-actions">
            <Link to="/albums" className="btn btn-primary">Каталог альбомов</Link>
            <Link to="/register" className="btn btn-outline">Регистрация</Link>
          </div>
        </div>
      </section>

      {/* Топ альбомы */}
      <section className="section">
        <div className="section-header">
          <h2>Топ альбомы</h2>
          <Link to="/albums" className="see-all">Все →</Link>
        </div>
        <div className="albums-grid">
          {topAlbums.map(album => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Артисты */}
      <section className="section">
        <div className="section-header">
          <h2>Артисты</h2>
          <Link to="/artists" className="see-all">Все →</Link>
        </div>
        <div className="artists-row">
          {artists.map(artist => (
            <div key={artist.id} className="artist-chip">
              <img src={artist.image} alt={artist.name} />
              <div>
                <strong>{artist.name}</strong>
                <span>{artist.genre}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Присоединяйся</h2>
        <p>Создай аккаунт и веди свой музыкальный дневник бесплатно.</p>
        <Link to="/register" className="btn btn-primary btn-lg">Создать аккаунт</Link>
      </section>
    </div>
  );
}
