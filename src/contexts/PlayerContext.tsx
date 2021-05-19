import React, {createContext, ReactNode, useState} from 'react'

interface Episode {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

interface PlayerContextData {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

interface PlayerContextProviderProps {
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
  
    function play(episode : Episode) {
      setEpisodeList([episode])
      setCurrentEpisodeIndex(0)
      setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
    }
  
    function togglePlay() {
      setIsPlaying(!isPlaying)
    }
  
    function setPlayingState(state: boolean) {
      return setIsPlaying(state)
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = currentEpisodeIndex + 1 < episodeList.length

    function playNext() {
      
      if (hasNext) {
        return
      }

      setCurrentEpisodeIndex(current => current + 1)
    }

    function playPrevious() {

      if (hasPrevious) {
        setCurrentEpisodeIndex(current => current - 1)
      }

    }

    return (
      <PlayerContext.Provider 
      value={{
        episodeList, 
        currentEpisodeIndex, 
        play,
        isPlaying,
        togglePlay, 
        setPlayingState,
        playList,
        playNext, 
        playPrevious,
        hasNext, hasPrevious
        }}>
        {children}
      </PlayerContext.Provider>
    )
}

export const usePlayer = () => {

}