import { useState, useMemo } from 'react';
import { albums, genres } from '../data/musicData';
import AlbumCard from '../components/AlbumCard';

export default function Albums() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('Все');
  const [sort, setSort] = useState('rating');

  // Фильтрация и сортировка через useMemo (демонстрация оптимизации)
  const filtered = useMemo(() => {
    return albums
      .filter(a => {
        const matchSearch =
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.artistName.toLowerCase().includes(search.toLowerCase());
        const matchGenre = genre === 'Все' || a.genre === genre;
        return matchSearch && matchGenre;
      })
      .sort((a, b) => {
        if (sort === 'rating') return b.rating - a.rating;
        if (sort === 'year_new') return b.year - a.year;
        if (sort === 'year_old') return a.year - b.year;
        if (sort === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [search, genre, sort]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Каталог альбомов</h1>
        <p>{filtered.length} альбомов найдено</p>
      </div>

      {/* Панель фильтров */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Поиск по названию или артисту..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="filter-group">
          <label>Жанр</label>
          <select value={genre} onChange={e => setGenre(e.target.value)}>
            {genres.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Сортировка</label>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="rating">По рейтингу</option>
            <option value="year_new">Сначала новые</option>
            <option value="year_old">Сначала старые</option>
            <option value="title">По названию</option>
          </select>
        </div>
      </div>

      {/* Результаты */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>Ничего не найдено. Попробуйте изменить фильтры.</p>
          <button onClick={() => { setSearch(''); setGenre('Все'); }}>
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="albums-grid albums-grid-large">
          {filtered.map(album => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </div>
  );
}
