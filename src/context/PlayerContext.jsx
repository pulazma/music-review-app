import { createContext, useContext, useState } from 'react';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);

  const play = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pause = () => setIsPlaying(false);
  const resume = () => setIsPlaying(true);
  const togglePlay = () => setIsPlaying(prev => !prev);

  const playAlbum = (tracks) => {
    if (tracks.length === 0) return;
    setQueue(tracks);
    setCurrentTrack(tracks[0]);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex(t => t.id === currentTrack.id);
    const next = queue[idx + 1];
    if (next) { setCurrentTrack(next); setIsPlaying(true); }
  };

  const prevTrack = () => {
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex(t => t.id === currentTrack.id);
    const prev = queue[idx - 1];
    if (prev) { setCurrentTrack(prev); setIsPlaying(true); }
  };

  return (
    <PlayerContext.Provider value={{
      currentTrack, isPlaying, queue,
      play, pause, resume, togglePlay,
      playAlbum, nextTrack, prevTrack,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
