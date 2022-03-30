const Album = ({albumImage, albumTitle, albumArtist}) => (
    <div className="playlistItem">
      <div className="headerLogo">
        <img className="logo" src={albumImage} alt="Logo" />
      </div>
      <div className="headerDesc">
        <h1>{albumTitle}</h1>
        <p>Artist : {albumArtist}</p>
        <button className="btnSelect">Select</button>
      </div>
    </div>
  );
  
  export default Album;