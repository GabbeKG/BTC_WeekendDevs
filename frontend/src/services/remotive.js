import axios from "axios";

const BASE_URL = "https://remotive.com/api/remote-jobs";

export const fetchJobs = async (search = "") => {
  const { data } = await axios.get(BASE_URL, {
    params: search ? { search } : {},
  });
  return data.jobs; // Array of job objects
};