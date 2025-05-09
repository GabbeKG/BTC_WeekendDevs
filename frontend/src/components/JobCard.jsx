const JobCard = ({ job, onClick }) => (
    <div className="bg-white p-4 rounded shadow mb-4 cursor-pointer" onClick={onClick}>
      <h3 className="text-lg font-bold">{job?.title || "Job Title"}</h3>
      <p className="text-gray-600">{job?.company || "Company Name"}</p>
      <p className="text-gray-500">{job?.location || "Location"}</p>
    </div>
  );
  export default JobCard;