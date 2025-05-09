const JobDetailsModal = ({ job, onClose }) => {
    if (!job) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
          <h2 className="text-xl font-bold mb-2">{job.title}</h2>
          <p className="mb-2">{job.company}</p>
          <p className="mb-4">{job.description}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  export default JobDetailsModal;