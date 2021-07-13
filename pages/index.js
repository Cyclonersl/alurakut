import { useEffect, useState } from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AluraCommons";
import { ProfileRelations } from "../src/components/ProfileRelations";
import { ProfileSideBar } from "../src/components/ProfileSideBar";
import GithubApi from "../src/api/GithubApi";

export default function Home() {
  const githubUser = "cyclonersl";

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    GithubApi.getFollowers(githubUser).then((res) => {
      setFollowers(res);
    });
  }, [githubUser]);

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
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelations followers={followers} />
        </div>
      </MainGrid>
    </>
  );
}
