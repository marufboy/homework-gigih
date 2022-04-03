const SearchBar = ({handleInput, getItem}) => (
  <form className="container" onSubmit={getItem}>
    <input className="searchBar" onChange={handleInput} />
    <button className="searchButton" type="submit">
      Search
    </button>
  </form>
);

export default SearchBar;
