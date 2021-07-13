import { useEffect, useState } from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AluraCommons";
import { ProfileSideBar } from "../src/components/ProfileSideBar";
import GithubApi from "../src/api/GithubApi";
import { ListBox } from "../src/components/ListBox";
import defaultCommunities from "../sample-data/default-communities.json";

export default function Home() {
  const githubUser = "cyclonersl";

  const [followers, setFollowers] = useState([]);
  const [communities, setCommunities] = useState(defaultCommunities);

  useEffect(() => {
    GithubApi.getFollowers(githubUser).then((res) => {
      setFollowers(res);
    });
  }, [githubUser]);

  const handlerAddCommunity = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const community = {
      id: communities.length + 1,
      title: form.get("title"),
      image: form.get("image"),
      url: form.get("url"),
    };

    setCommunities([...communities, community]);
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet
              confiavel={3}
              legal={2}
              sexy={1}
              mensagens={5}
            />
          </Box>

          <Box>
            <h2 className="subTitle ">O que você deseja fazer?</h2>
            <form onSubmit={handlerAddCommunity}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque a URL para o site da sua comunidade"
                  name="url"
                  aria-label="Coloque a URL para o site da sua comunidade"
                />
              </div>
              <div>
                <button>Criar comunidade</button>
              </div>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ListBox
            allUrl="/users"
            title="Seguidores"
            list={followers.map((f) => {
              return {
                id: f.id,
                title: f.login,
                image: `https://github.com/${f.login}.png`,
                url: `/user/${f.login}`,
              };
            })}
          />
          <ListBox
            allUrl="/communities"
            title="Comunidades"
            list={communities}
          />
        </div>
      </MainGrid>
    </>
  );
}
