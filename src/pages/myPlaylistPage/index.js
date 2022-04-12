import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import TabContainer from "../../components/tabContainer";
import AlbumContainer from "../../components/albumContainer";

const MyPlaylistPage = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [album, setAlbum] = useState([]);
  const [tracks, setTracks] = useState([]);

  //   this is global value accesstoken
  const globToken = useSelector((state) => state.token.value);

  const handleInput = (e) => setSearch(e.target.value);

  const getItem = async (e) => {
    e.preventDefault();
    axios
      .get(`https://api.spotify.com/v1/search?q=${search}&type=track`, {
        params: { limit: 16, offset: 0 },
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

  const handleSelected = (id) => {
    const alreadySelected = tracks.find((selectedId) => selectedId === id);
    if (alreadySelected) {
      const filterSelected = tracks.filter((item) => item !== id);
      setTracks(filterSelected);
    } else {
      setTracks((selectedTrack) => [...selectedTrack, id]);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TabContainer
        handleInput={handleInput}
        getItem={getItem}
        globToken={globToken}
        user={user}
        tracks={tracks}
      />
      <AlbumContainer
        album={album}
        tracks={tracks}
        handleSelected={handleSelected}
      />
    </>
  );
};

export default MyPlaylistPage;
