import React, { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://back-end-jobs-api-main-3cw2mc.laravel.cloud/api/jobs');
        const data = await response.json();
        setJobs(isHome ? data.slice(0, 3) : data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  if (loading) {
    return (
      <div className="text-center py-10 text-indigo-600 font-semibold text-xl">
        <Spinner loading={loading} />
      </div>
    );
  }

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "All Jobs"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => <JobListing key={job.id} job={job} />)
          ) : (
            <p className="col-span-3 text-center text-gray-600">
              No jobs available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;