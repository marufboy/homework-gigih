import SearchBar from "../../components/searchBar";
import CreatePlaylist from "../../components/createPlaylist";
import TabButton from "../../components/tabButton";
import { useState } from "react";
import axios from "axios";

const TabContainer = ({
  handleInput,
  getItem,
  globToken,
  user,
  tracks,
}) => {
  const [boolTab, setBoolTab] = useState(true);
  const [playlist, setPlaylist] = useState({
    name: "",
    description: "",
  });

  const handleTab = (e) => {
    if (e.target.value === "search") {
      setBoolTab(true);
    } else {
      setBoolTab(false);
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
    </>
  );
};

export default TabContainer;
