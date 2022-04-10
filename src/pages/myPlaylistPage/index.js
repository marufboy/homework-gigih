import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Album from "../../components/album";
import SearchBar from "../../components/searchBar";
import CreatePlaylist from "../../components/createPlaylist";
import TabButton from "../../components/tabButton";
import axios from "axios";


const MyPlaylistPage = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [album, setAlbum] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [boolTab, setBoolTab] = useState(true);
  const [playlist, setPlaylist] = useState({
    name: "",
    description: "",
  });

  //   this is global value accesstoken
  const globToken = useSelector((state) => state.token.value);

  const handleInput = (e) => setSearch(e.target.value);

  const getItem = async (e) => {
    e.preventDefault();
    axios
      .get(`https://api.spotify.com/v1/search?q=${search}&type=track`, {
        params: { limit: 15, offset: 0 },
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer " + token,
          Authorization: "Bearer " + globToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const items = res.data.tracks.items;
        setAlbum(items);
      })
      .catch((err) => console.log(err));
  };

  const getUser = async () => {
    if (globToken !== "") {
      axios
        .get(`https://api.spotify.com/v1/me`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + globToken,
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
      playlist.name.length > 10 &&
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
            // Authorization: "Bearer " + token,
            Authorization: "Bearer " + globToken,
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
                // Authorization: "Bearer " + token,
                Authorization: "Bearer " + globToken,
                "Content-Type": "application/json",
              },
            }
          );
        })
        .catch((err) => console.log(err.message));

      //   console.log(playlist);
      alert("Successfully added playlist");
      setPlaylist({ name: "", description: "" });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2 className="titleLabel">Spotify Playlist</h2>
      <TabButton handleTab={handleTab} />
      {globToken !== "" && (
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
    </>
  );
};

export default MyPlaylistPage;
