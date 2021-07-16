const DATO_BASE_URL_API = "https://graphql.datocms.com";
const TOKEN = "e03a077df8a44c6c0167e971d5c85c";
//GraphQL
export default {
  getCommunities: (username) => {
    return fetch("/api/comunidades").then((res) => res.json());
  },

  addCommunity: ({ title, imageUrl, username }) => {
    return fetch("/api/comunidades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        imageUrl: imageUrl,
        creatorslug: username,
      }),
    }).then((res) => res.json());
  },
};
