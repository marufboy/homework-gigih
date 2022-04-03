import { useEffect, useState } from "react";
import { Credential } from "../../Credential";
import axios from "axios";
import Album from "../../components/album";
import Login from "../../components/login";
import SearchBar from "../../components/searchBar";
import CreatePlaylist from "../../components/createPlaylist";
import TabButton from "../../components/tabButton";

const spotify = Credential();
const loginEndPoint = `${spotify.AuthEndPoint}client_id=${
  spotify.ClientId
}&redirect_uri=${spotify.RedirectUrl}&scope=${spotify.Scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const Home = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [album, setAlbum] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [boolTab, setBoolTab] = useState(true);
  const [playlist, setPlaylist] = useState({
    name: "",
    description: "",
  });

  const handleInput = (e) => setSearch(e.target.value);
  //get search track from search bar
  const getItem = async (e) => {
    e.preventDefault();
    axios
      .get(`https://api.spotify.com/v1/search?q=${search}&type=track`, {
        params: { limit: 15, offset: 0 },
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const items = res.data.tracks.items;
        setAlbum(items);
      })
      .catch((err) => console.log(err));
  };

  //get access token from login
  const getAccessToken = async () => {
    const tokens = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    // check token & hash
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      return _token;
    } else {
      setToken(tokens);
      return tokens;
    }
  };

  //get user data spotify
  const getUser = async () => {
    let accessToken = await getAccessToken();
    if (accessToken !== "") {
      axios
        .get(`https://api.spotify.com/v1/me`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        })
        .then((res) => setUser(res.data.id));
    } else {
      return;
    }
  };

  const hadleSelected = (id) => {
    const alreadySelected = tracks.find((selectedId) => selectedId === id);
    if (alreadySelected) {
      const filterSelected = tracks.filter((item) => item !== id);
      setTracks(filterSelected);
    } else {
      setTracks((selectedTrack) => [...selectedTrack, id]);
    }
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (
      playlist.name !== "" &&
      playlist.description !== "" &&
      tracks.length > 0
    ) {
      const data = {
        name: playlist.name,
        description: playlist.description,
        public: false,
      };
      axios
        .post(`https://api.spotify.com/v1/users/${user}/playlists`, data, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const playlistID = res.data.id;
          axios.post(
            `https://api.spotify.com/v1/users/${user}/playlists/${playlistID}/tracks`,
            tracks,
            {
              headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          );
        })
        .catch((err) => console.log(err.message));

      //   console.log(playlist);
      alert("Successfully added playlist");
    } else {
      alert("Please add your select playlist");
      setPlaylist({ name: "", description: "" });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPlaylist({ ...playlist, [name]: value });
  };

  const handleTab = (e) => {
    if (e.target.value === "search") {
      setBoolTab(true);
    } else {
      setBoolTab(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="login-page">
      <Login loginEndPoint={loginEndPoint} />
      <TabButton handleTab={handleTab}/>
      {token !== "" && (
        <>
          {boolTab ? (
            <SearchBar handleInput={handleInput} getItem={getItem} />
          ) : (
            <CreatePlaylist
              playlist={playlist}
              handleFormChange={handleFormChange}
              handleSubmit={handleCreatePlaylist}
            />
          )}
        </>
      )}
      {album.length > 0 &&
        album.map((item) => {
          return tracks.includes(item.uri) ? (
            <Album
              key={item.uri}
              albumImage={item.album.images[0].url}
              albumTitle={item.name}
              albumArtist={item.artists[0].name}
              clickMe={() => hadleSelected(item.uri)}
              isSelect={false}
            />
          ) : (
            <Album
              key={item.uri}
              albumImage={item.album.images[0].url}
              albumTitle={item.name}
              albumArtist={item.artists[0].name}
              clickMe={() => hadleSelected(item.uri)}
              isSelect={true}
            />
          );
        })}
    </div>
  );
};

export default Home;
