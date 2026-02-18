import { useState } from 'react';
import { artists, albums } from '../data/musicData';

export default function Artists() {
  const [selected, setSelected] = useState(null);

  const getAlbums = (artistId) => albums.filter(a => a.artistId === artistId);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Артисты</h1>
        <p>Открывай новых исполнителей и их дискографии</p>
      </div>

      <div className="artists-grid">
        {artists.map(artist => (
          <div
            key={artist.id}
            className={`artist-card ${selected?.id === artist.id ? 'expanded' : ''}`}
            onClick={() => setSelected(selected?.id === artist.id ? null : artist)}
          >
            <img src={artist.image} alt={artist.name} className="artist-img" />
            <div className="artist-card-body">
              <h3>{artist.name}</h3>
              <span className="genre-tag">{artist.genre}</span>
              <div className="artist-meta">
                <span>🌍 {artist.country}</span>
                <span>📅 с {artist.formedYear}</span>
                <span>💿 {getAlbums(artist.id).length} альб.</span>
              </div>
            </div>

            {/* Раскрывающаяся панель (интерактивность) */}
            {selected?.id === artist.id && (
              <div className="artist-expanded" onClick={e => e.stopPropagation()}>
                <p className="artist-bio">{artist.bio}</p>
                <h4>Альбомы</h4>
                <div className="artist-albums-list">
                  {getAlbums(artist.id).map(album => (
                    <a key={album.id} href={`/albums/${album.id}`} className="mini-album">
                      <img src={album.cover} alt={album.title} />
                      <div>
                        <strong>{album.title}</strong>
                        <span>{album.year} · ★ {album.rating}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
