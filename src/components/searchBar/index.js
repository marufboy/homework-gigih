import SearchFieldCustom from "../module/searchFieldCustom";

const SearchBar = ({ handleInput, getItem }) => (
  <form className="container" onSubmit={getItem}>
    <SearchFieldCustom handleInput={handleInput}/>
    <button className="searchButton" type="submit">
      Search
    </button>
  </form>
);

export default SearchBar;
