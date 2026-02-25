function SearchBar({ search, setSearch }) {
    return (
        <div className="search-container">
            <input type="text"
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />
            {search && (
                <span
                    className="clear-btn"
                    onClick={() => setSearch("")}
                    title="Clear search"
                >
                    &times;
                </span>
            )}
        </div>
    );
}

export default SearchBar;
