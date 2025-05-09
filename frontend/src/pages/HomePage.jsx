import { useState } from "react";
import SearchBar from "../components/SearchBar";
import JobList from "../components/JobList";
import { fetchJobs } from "../services/remotive";
import "../css/index.css";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const results = await fetchJobs(search);
      setJobs(results);
    } catch (err) {
      setError("Failed to fetch jobs.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-image-[url('../bg.png')] bg-cover bg-center bakgrund">
      <div className="max-w-5xl mx-auto pt-12">
        <h1 className="text-4xl font-bold text-center mb-2">Välkommen till Liabryggan</h1>
        <p className="text-center text-gray-500 mb-8">En brygga mellan studenter or arbetslivet!
Hitta din nästa medarbetare eller LIA-plats här!</p>
        <div className="flex justify-center mb-8">
          <SearchBar
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          {loading ? (
            <span className="text-gray-400">Loading...</span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            <JobList jobs={jobs} onJobClick={() => {}} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;