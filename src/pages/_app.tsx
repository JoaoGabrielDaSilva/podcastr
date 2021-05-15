import '../styles/global.scss'
import Header from '../components/Header'
import Player from '../components/Player'
import { Wrapper, Main } from '../styles/app'



function MyApp({ Component, pageProps }) {
  return (
    <Wrapper>
      <Main>
        <Header />
        <Component {...pageProps} />
      </Main>
        <Player />
    </Wrapper>
  )
}

export default MyApp
