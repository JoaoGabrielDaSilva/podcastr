import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
import {
  Homepage,
  LatestEpisodes,
  Title,
  EpisodesList,
  Episode,
  AllEpisodes,
  Details,
  Members,
  Button,
} from "../styles/home";

interface Episode {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

interface HomeProps {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}
const Home: React.FC<HomeProps> = ({ latestEpisodes, allEpisodes }) => {
  return (
    <Homepage>
      <LatestEpisodes>
        <Title>Últimos episódios</Title>
        <EpisodesList>
          {latestEpisodes.map(episode => {
            return (
              <Episode key={episode.id}>
                <Image
                  objectFit="cover"
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                />
                <Details>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <Members>{episode.members}</Members>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </Details>

                <Button>
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </Button>
              </Episode>
            );
          })}
        </EpisodesList>
      </LatestEpisodes>
      <AllEpisodes>
        <Title>Todos episódios</Title>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map(episode => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <Button>
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </AllEpisodes>
    </Homepage>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: { _limit: 12, _sort: "published_at", _order: "desc" },
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.lenght);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};

export default Home;
