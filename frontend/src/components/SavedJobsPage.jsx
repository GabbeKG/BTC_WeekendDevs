import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getSavedJobs, removeSavedJob } from "../services/savedJobs";
import toast from "react-hot-toast";
import { useNavigate, Navigate } from "react-router-dom";

const SavedJobsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingJobId, setRemovingJobId] = useState(null);

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/login" state={{ from: "/saved-jobs" }} replace />;
  }

  // Fetch saved jobs
  const fetchSavedJobs = async () => {
    if (!user || !user.uid) {
      console.warn("No user or UID found when fetching saved jobs");
      return;
    }

    setLoading(true);
    try {
      setError(null);
      console.log("Fetching saved jobs for UID:", user.uid);
      const jobs = await getSavedJobs(user.uid);
      setSavedJobs(jobs || []);
    } catch (err) {
      console.error("Error fetching saved jobs:", err);
      setError("Failed to load saved jobs. Please try again later.");
      toast.error("Failed to load saved jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedJobs();
    }
  }, [user]);

  // Retry logic
  const handleRetry = () => {
    fetchSavedJobs();
  };

  // Remove job handler
  const handleRemoveJob = async (jobId) => {
    if (!user || !jobId) {
      toast.error("Unable to remove job. Please try again.");
      return;
    }

    try {
      setRemovingJobId(jobId);
      console.log("Removing job:", jobId);
      await removeSavedJob(user.uid, jobId);
      setSavedJobs((prevJobs) =>
        prevJobs.filter((job) => job.jobId !== jobId)
      );
      toast.success("Job removed successfully");
    } catch (err) {
      console.error("Failed to remove job:", err);
      toast.error("Failed to remove job. Please try again.");
    } finally {
      setRemovingJobId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Error Loading Jobs
            </h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
        <span className="text-sm text-gray-500">
          {savedJobs.length} {savedJobs.length === 1 ? "job" : "jobs"} saved
        </span>
      </div>

      {savedJobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 mb-4">You haven't saved any jobs yet.</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Browse Jobs
          </button>
        </div>
      ) : (
        <ul className="space-y-4">
          {savedJobs.map((job) => (
            <li
              key={job.jobId || job.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <article className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title || "Untitled Position"}
                    </h2>
                    <p className="text-gray-700 mb-1">
                      {job.company || "Company not specified"}
                    </p>
                    <p className="text-gray-600 mb-4">
                      {job.location || "Location not specified"}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {job.url && (
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          View Job
                        </a>
                      )}
                      <button
                        onClick={() => handleRemoveJob(job.jobId)}
                        disabled={removingJobId === job.jobId}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {removingJobId === job.jobId ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </div>
                  {job.savedAt && (
                    <time className="text-sm text-gray-500 whitespace-nowrap">
                      Saved on{" "}
                      {new Date(job.savedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default SavedJobsPage;
