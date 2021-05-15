import React from "react";

import {
  Container,
  Header,
  Image,
  Strong,
  Body,
  Footer,
  ProgressBar,
  CurrentProgress,
  EmptySlider,
  ButtonsWrapper,
  Button,
  PlayButton,
  Slider,
} from "./styles";

const Player: React.FC = () => {
  return (
    <Container>
      <Header>
        <Image src="/playing.svg" alt="Tocando agora" />
        <Strong>Tocando agora</Strong>
      </Header>
      <Body>
        <Strong>Selecione um podcast para ouvir</Strong>
      </Body>
      <Footer empty={true}>
        <ProgressBar>
          <CurrentProgress>00:00</CurrentProgress>
          <Slider>
            <EmptySlider />
          </Slider>
          <CurrentProgress>00:00</CurrentProgress>
        </ProgressBar>
        <ButtonsWrapper>
          <Button>
            <Image src="/shuffle.svg" alt="Embaralhar" />
          </Button>
          <Button>
            <Image src="/play-previous.svg" alt="Tocar Anterior" />
          </Button>
          <PlayButton>
            <Image src="/play.svg" alt="Tocar" />
          </PlayButton>
          <Button>
            <Image src="/play-next.svg" alt="Tocar Proxima" />
          </Button>
          <Button>
            <Image src="/repeat.svg" alt="Repetir" />
          </Button>
        </ButtonsWrapper>
      </Footer>
    </Container>
  );
};

export default Player;
