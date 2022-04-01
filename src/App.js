import { useEffect, useState } from "react";
import "./App.css";
import { Credential } from "./Credential";
import axios from "axios";

import Album from "./components/album";

const spotify = Credential();
const loginEndPoint = `${spotify.AuthEndPoint}client_id=${
  spotify.ClientId
}&redirect_uri=${spotify.RedirectUrl}&scope=${spotify.Scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

function App() {
  const [token, setToken] = useState("");
  const [text, setText] = useState("");
  const [album, setAlbum] = useState([]);
  const [track, setTrack] = useState([]);

  const handleInput = (e) => setText(e.target.value);
  const getItem = async (e) => {
    e.preventDefault();
    axios
      .get(`https://api.spotify.com/v1/search?q=${text}&type=album`, {
        params: { limit: 10, offset: 0 },
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const items = res.data.albums.items;
        setAlbum(items);
      })
      .catch((err) => console.log(err));
  };

  let selectTrack = (item) => {
    setTrack((prevState) => [...prevState, item.id]);
  };

  let deselectTrack = (itemToRemove) => {
    setTrack(track.filter((item) => item !== itemToRemove.id));
  };

  useEffect(() => {
    const tokens = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    // check token & hash
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
    } else {
      setToken(tokens);
    }
  }, [token]);
  return (
    <div className="App">
      <div className="login-page">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt="logo-spotify"
          className="logo-spotify"
        />
        <a href={loginEndPoint}>
          <div className="login-btn">LOG IN</div>
        </a>
        {token !== "" && (
          <>
            <input className="searchBar" onChange={handleInput} />
            <button className="searchButton" onClick={getItem}>
              Search
            </button>
          </>
        )}
        {album.length > 0 && (
          <>
            {album.map((item) => {
              return track.includes(item.id) ? (
                <Album
                  key={item.id}
                  albumImage={item.images[0].url}
                  albumTitle={item.name}
                  albumArtist={item.artists[0].name}
                  clickMe={() => deselectTrack(item)}
                  isSelect={false}
                />
              ) : (
                <Album
                  key={item.id}
                  albumImage={item.images[0].url}
                  albumTitle={item.name}
                  albumArtist={item.artists[0].name}
                  clickMe={() => selectTrack(item)}
                  isSelect={true}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
