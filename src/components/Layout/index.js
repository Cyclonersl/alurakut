import Head from "next/head";
import { useEffect, useState } from "react";

import GithubApi from "../../api/GithubApi";
import DatoApi from "../../api/DatoApi";

import MainGrid from "../MainGrid";
import { AlurakutMenu } from "../../lib/AluraCommons";
import { ProfileSideBar } from "../ProfileSideBar";
import { ListBox } from "../ListBox";

export default function Layout({ children, githubUser }) {
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

  return (
    <>
      <Head>
        <title>AluraKut</title>
      </Head>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="contentArea" style={{ gridArea: "contentArea" }}>
          {children}
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
