const Album = ({albumImage, albumTitle, albumArtist, clickMe, isSelect}) => (
    <div className="playlistItem">
      <div className="headerLogo">
        <img className="logo" src={albumImage} alt="Logo" />
      </div>
      <div className="headerDesc">
        <h1>{albumTitle}</h1>
        <p>Artist : {albumArtist}</p>
        <button className="btn-select" onClick={clickMe}>{isSelect ? 'Select' : 'Deselect'}</button>
      </div>
    </div>
  );
  
  export default Album;