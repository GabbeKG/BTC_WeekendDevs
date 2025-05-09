import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { saveJob } from "../services/savedJobs";
import toast from "react-hot-toast";

const JobList = ({ jobs }) => {
  const { user } = useAuth();
  const [savingJobId, setSavingJobId] = useState(null);

  const handleSaveJob = async (job) => {
    if (!user) {
      toast.error("Please login to save jobs");
      return;
    }

    setSavingJobId(job.id);
    try {
      await saveJob(user.uid, job);
      toast.success("Job saved successfully!");
    } catch (error) {
      toast.error("Failed to save job");
    } finally {
      setSavingJobId(null);
    }
  };

  return (
    <div>
      {jobs && jobs.length > 0 ? (
        jobs.map(job => (
          <div key={job.id} className="bg-white p-4 rounded shadow mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-gray-600">{job.company_name}</p>
                <p className="text-gray-500">{job.candidate_required_location}</p>
                <div className="mt-2 space-x-4">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Job
                  </a>
                  <button
                    onClick={() => handleSaveJob(job)}
                    disabled={savingJobId === job.id}
                    className="text-green-600 hover:text-green-800 font-medium disabled:opacity-50"
                  >
                    {savingJobId === job.id ? "Saving..." : "Save Job"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No jobs found.</p>
      )}
    </div>
  );
};

export default JobList;