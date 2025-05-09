const SearchBar = ({ value, onChange, onSearch }) => (
  <div className="flex w-full max-w-xl mx-auto shadow rounded overflow-hidden bg-white">
    <input
      type="text"
      className="flex-1 p-3 outline-none"
      placeholder="Search for jobs..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <button className="bg-blue-500 text-white px-6" onClick={onSearch}>
      Search
    </button>
  </div>
);

export default SearchBar;