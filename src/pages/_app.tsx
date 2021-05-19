import '../styles/global.scss'
import Header from '../components/Header'
import Player from '../components/Player'
import { Wrapper, Main } from '../styles/app'
import {PlayerContextProvider} from '../contexts/PlayerContext'


function MyApp({ Component, pageProps }) {


  return (
    <PlayerContextProvider>
      <Wrapper>
        <Main>
          <Header />
          <Component {...pageProps} />
        </Main>
          <Player />
      </Wrapper>
    </PlayerContextProvider>
  )
}

export default MyApp
