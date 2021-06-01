import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image'
import { usePlayer } from "../../contexts/PlayerContext";
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import {
  Container,
  Header,
  StyledImage,
  Strong,
  EmptyPlayer,
  Footer,
  ProgressBar,
  CurrentProgress,
  EmptySlider,
  ButtonsWrapper,
  Button,
  PlayButton,
  SliderWrapper,
  CurrentEpisode
} from "./styles";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    episodeList, 
    currentEpisodeIndex,  
    isPlaying, 
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    clearPlayerState,
    hasNext, 
    hasPrevious,
    isLooping
  } = usePlayer()

  const episode = episodeList[currentEpisodeIndex];
  const [progress, setProgress] = useState(0);

  function setupProgressListener () {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount)
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }


  useEffect(() => {
    if (!audioRef.current) {
      return
    } 

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }

  }, [isPlaying])

  return (
    <Container>
      <Header>
        <StyledImage src="/playing.svg" alt="Tocando agora" />
        <Strong>Tocando agora</Strong>
      </Header>

      { episode ? (
        <CurrentEpisode>
          <Image width={592} height={592} src={episode.thumbnail} objectFit="cover"/>
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </CurrentEpisode>
      ) : (
        <EmptyPlayer>
          <Strong>Selecione um podcast para ouvir</Strong>
      </EmptyPlayer>
      ) }

      
      <Footer>
        <ProgressBar empty={!episode}>
          <CurrentProgress>{convertDurationToTimeString(progress)}</CurrentProgress>
          <SliderWrapper>
            {episode ? (
              <Slider 
                trackStyle={{backgroundColor: "#04d361"}}
                railStyle={{backgroundColor: "#9f75ff"}}
                handleStyle={{borderColor: "#04d361", borderWidth: 4}}
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
              />
            ) : (
            <EmptySlider />
            )}
          </SliderWrapper>
          <CurrentProgress>{convertDurationToTimeString(episode?.duration ?? 0)}</CurrentProgress>
        </ProgressBar>

        {episode && (
          <audio 
            ref={audioRef}
            src={episode.url}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onEnded={handleEpisodeEnded}
            loop={isLooping}
            onLoadedMetadata={setupProgressListener}
          />
        )}

        <ButtonsWrapper>
          <Button disabled={!episode || episodeList.length === 1} onClick={toggleShuffle} className={isShuffling ? "isActive" : ''}>
            <StyledImage src="/shuffle.svg" alt="Embaralhar" />
          </Button>
          <Button disabled={!episode || !hasPrevious}>
            <StyledImage src="/play-previous.svg" alt="Tocar Anterior" onClick={playPrevious}/>
          </Button>
          <PlayButton disabled={!episode} onClick={togglePlay}>
            {isPlaying ? (
              <StyledImage src="/pause.svg" alt="Tocar" />
              ) : (
              <StyledImage src="/play.svg" alt="Tocar" />
            )}
          </PlayButton>
          <Button disabled={!episode || !hasNext} onClick={playNext}> 
            <StyledImage src="/play-next.svg" alt="Tocar Proxima" />
          </Button>
          <Button disabled={!episode} onClick={toggleLoop} className={isLooping ? 'isActive' : ''}>
            <StyledImage src="/repeat.svg" alt="Repetir"/>
          </Button>
        </ButtonsWrapper>
      </Footer>
    </Container>
  );
};

export default Player;
