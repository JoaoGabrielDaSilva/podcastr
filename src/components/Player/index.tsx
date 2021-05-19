import React, { useContext, useEffect, useRef } from "react";
import Image from 'next/image'
import { PlayerContext } from "../../contexts/PlayerContext";
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

const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    episodeList, 
    currentEpisodeIndex,  
    isPlaying, 
    togglePlay,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext, 
    hasPrevious
  } = useContext(PlayerContext)

  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if (!audioRef.current) {
      return
    } 

    if (isPlaying) {
      audioRef.current.play()
    }

    if (!isPlaying) {
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
          <CurrentProgress>00:00</CurrentProgress>
          <SliderWrapper>
            {episode ? (
              <Slider 
                trackStyle={{backgroundColor: "#04d361"}}
                railStyle={{backgroundColor: "#9f75ff"}}
                handleStyle={{borderColor: "#04d361", borderWidth: 4}}
              />
            ) : (
            <EmptySlider />
            )}
          </SliderWrapper>
          <CurrentProgress>00:00</CurrentProgress>
        </ProgressBar>

        {episode && (
          <audio 
            ref={audioRef}
            src={episode.url}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <ButtonsWrapper>
          <Button disabled={!episode}>
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
          <Button disabled={!episode}>
            <StyledImage src="/repeat.svg" alt="Repetir" />
          </Button>
        </ButtonsWrapper>
      </Footer>
    </Container>
  );
};

export default Player;
