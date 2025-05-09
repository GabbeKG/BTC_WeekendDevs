const FilterSection = ({ location, setLocation, onSearch }) => (
  <div className="bg-white rounded shadow p-6 w-full">
    <h2 className="font-bold mb-4 text-lg">Filters</h2>
    <div className="mb-4">
      <label className="block mb-1 font-medium">Location</label>
      <input
        className="w-full border rounded p-2"
        placeholder="Enter location..."
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
    </div>
    <button className="w-full border rounded p-2 mt-2" onClick={onSearch}>
      Apply Filters
    </button>
  </div>
);

export default FilterSection;