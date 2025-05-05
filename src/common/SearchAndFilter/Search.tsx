type Props = {
  searchTermState: [string, React.Dispatch<React.SetStateAction<string>>];
};

export default function Search({ searchTermState }: Props) {
  const [searchTerm, setSearchTerm] = searchTermState;

  return (<div className="search-container">
    <input
      type="text"
      placeholder="Search <THING> by <SEARCH OPTIONS>..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
    {searchTerm && (
      <button 
        onClick={() => setSearchTerm('')}
        className="clear-button"
      >
        ✕
      </button>
    )}
  </div>);
};
