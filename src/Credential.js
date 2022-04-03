const Credential = () => {
  return {
    AuthEndPoint: "https://accounts.spotify.com/authorize?",
    RedirectUrl: "http://localhost:3000/",
    Scopes: [
      "playlist-modify-private",
      "user-read-private",
      "playlist-read-private",
    ],
    ClientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    ClientSecret: process.env.REACT_APP_SPOTIFY_SECRET_ID,
  };
};

export { Credential };
