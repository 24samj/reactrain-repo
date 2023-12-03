import "./SearchBar.css";

const SearchBar = ({ city, setCity, searchLocation }) => {
    return (
        <div className="search-box">
            <i className="fa-solid fa-location-dot"></i>
            <input
                type="text"
                value={city}
                placeholder="Enter your location"
                onChange={(event) => setCity(event.target.value)}></input>
            <button
                className="fa-solid fa-magnifying-glass"
                onClick={searchLocation}></button>
        </div>
    );
};

export default SearchBar;
