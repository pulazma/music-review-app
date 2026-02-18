import { usePlayer } from '../context/PlayerContext';

export default function MusicPlayer() {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="music-player">
      <div className="player-track">
        <span className="player-icon">♪</span>
        <div>
          <div className="player-title">{currentTrack.title}</div>
          <div className="player-artist">Сейчас играет</div>
        </div>
      </div>
      <div className="player-controls">
        <button onClick={prevTrack} title="Назад">⏮</button>
        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={nextTrack} title="Вперёд">⏭</button>
      </div>
      <div className="player-bar">
        <div className="player-progress" style={{ width: isPlaying ? '60%' : '30%' }} />
      </div>
    </div>
  );
}
