import nookies from "nookies";
import jwt from "jsonwebtoken";
import { AddComunityBox } from "../src/components/AddComunityBox";
import { WelcomeBox } from "../src/components/WelcomeBox";
import Layout from "../src/components/Layout";

export default function Home({ githubUser }) {
  const updateCommunities = (community) => {
    setCommunities([...communities, community]);
  };

  return (
    <Layout githubUser={githubUser}>
      <WelcomeBox />

      <AddComunityBox
        githubUser={githubUser}
        updateCommunities={updateCommunities}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  const { isAuthenticated } = await fetch(
    "https://alurakut.vercel.app/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((resposta) => resposta.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { githubUser } = jwt.decode(token);

  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  };
}
