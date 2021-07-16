import { useEffect, useState } from "react";
import MainGrid from "../src/components/MainGrid";
import { AlurakutMenu } from "../src/lib/AluraCommons";
import { ProfileSideBar } from "../src/components/ProfileSideBar";
import GithubApi from "../src/api/GithubApi";
import { ListBox } from "../src/components/ListBox";
import DatoApi from "../src/api/DatoApi";
import { AddComunityBox } from "../src/components/AddComunityBox";
import { WelcomeBox } from "../src/components/WelcomeBox";

export default function Home() {
  const githubUser = "cyclonersl";

  const [followers, setFollowers] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    GithubApi.getFollowers(githubUser).then((res) => {
      setFollowers(res);
    });

    DatoApi.getCommunities(githubUser).then((res) => {
      setCommunities(res.data.allComunities);
    });
  }, [githubUser]);

  const updateCommunities = (community) => {
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
          <WelcomeBox />

          <AddComunityBox
            githubUser={githubUser}
            updateCommunities={updateCommunities}
          />
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
            list={communities.map((c) => {
              return {
                id: c.id,
                title: c.title,
                image: c.imageUrl,
                url: ``,
              };
            })}
          />
        </div>
      </MainGrid>
    </>
  );
}
