import Album from "../../components/album";

const AlbumContainer = ({ album, tracks, handleSelected }) => {
  return (
    <div className="album-container">
      {album.length > 0 &&
        album.map((item) => {
          return tracks.includes(item.uri) ? (
            <Album
              key={item.uri}
              albumImage={item.album.images[0].url}
              albumTitle={item.name}
              albumArtist={item.artists[0].name}
              clickMe={() => handleSelected(item.uri)}
              isSelect={false}
            />
          ) : (
            <Album
              key={item.uri}
              albumImage={item.album.images[0].url}
              albumTitle={item.name}
              albumArtist={item.artists[0].name}
              clickMe={() => handleSelected(item.uri)}
              isSelect={true}
            />
          );
        })}
    </div>
  );
};

export default AlbumContainer;
