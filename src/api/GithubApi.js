const BASE_URL_API = "https://api.github.com";
export default {
  getFollowers: (username) => {
    return fetch(`${BASE_URL_API}/users/${username}/followers`).then((res) =>
      res.json()
    );
  },
};
