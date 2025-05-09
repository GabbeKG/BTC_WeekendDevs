import { db } from "../config/firebase";
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where 
} from "firebase/firestore";

// Save a job for a user
export const saveJob = async (userId, job) => {
  try {
    const savedJobsRef = collection(db, "savedJobs");
    await addDoc(savedJobsRef, {
      userId,
      jobId: job.id,
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location,
      url: job.url,
      savedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error saving job:", error);
    throw error;
  }
};

// Remove a saved job
export const removeSavedJob = async (userId, jobId) => {
  try {
    const savedJobsRef = collection(db, "savedJobs");
    const q = query(
      savedJobsRef,
      where("userId", "==", userId),
      where("jobId", "==", jobId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(db, "savedJobs", document.id));
    });
    return true;
  } catch (error) {
    console.error("Error removing saved job:", error);
    throw error;
  }
};

// Get all saved jobs for a user
export const getSavedJobs = async (userId) => {
  try {
    const savedJobsRef = collection(db, "savedJobs");
    const q = query(savedJobsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting saved jobs:", error);
    throw error;
  }
}; 