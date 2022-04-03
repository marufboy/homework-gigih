const TabButton = ({ handleTab }) => (
  <div className="container row">
    <button className="searchButton tab" value={"search"} onClick={handleTab}>
      Search
    </button>
    <button className="searchButton tab" value={"form"} onClick={handleTab}>
      Create Playlist
    </button>
  </div>
);

export default TabButton;
