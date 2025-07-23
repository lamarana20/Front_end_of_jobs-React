import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowAltCircleLeft, FaLocationArrow, FaBuilding, FaEnvelope, FaPhone } from "react-icons/fa";

import Spinner from "../components/Spinner";

const JobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const onDeleteClick = async () => {
    try {
      await fetch(`https://backend-jobs-main-d8y5e0.laravel.cloud/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      toast.success("Job deleted successfully.", { autoClose: 2000 });
      navigate('/jobs');
    } catch (error) {
      toast.error("Error while deleting job:", error.message, { autoClose: 3000 });
      throw error;
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          `https://backend-jobs-main-d8y5e0.laravel.cloud/api/jobs/${id}`
        );
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <section className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/jobs"
            className="text-indigo-600 hover:text-indigo-800 flex items-center transition-colors duration-200"
          >
            <FaArrowAltCircleLeft className="mr-2" />
            Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <main className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
                <div className="text-center md:text-left">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
                    {job.type}
                  </span>
                  <h1 className="text-3xl font-bold mt-4 mb-2 text-gray-900">{job.title}</h1>
                  <div className="flex items-center justify-center md:justify-start text-gray-600">
                    <FaLocationArrow className="text-orange-500 mr-2" />
                    <span className="text-orange-600">Boston, MA</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h3 className="text-xl font-bold text-indigo-700 mb-4">Job Description</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>

                <h3 className="text-xl font-bold text-indigo-700 mb-2">Salary</h3>
                <p className="text-gray-800 font-medium">{job.salary}/ Year</p>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-6">
              {/* Company Info */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FaBuilding className="mr-2 text-indigo-600" />
                  Company Info
                </h3>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.company.name}</h2>
                <p className="text-gray-600 mb-4">{job.company.description}</p>

                <div className="border-t border-gray-200 my-4"></div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-700 font-medium flex items-center">
                      <FaEnvelope className="mr-2 text-indigo-600" />
                      Contact Email:
                    </h3>
                    <p className="mt-1 bg-indigo-50 p-3 rounded-lg text-indigo-800 font-medium break-all">
                      {job.company.contactEmail}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-700 font-medium flex items-center">
                      <FaPhone className="mr-2 text-indigo-600" />
                      Contact Phone:
                    </h3>
                    <p className="mt-1 bg-indigo-50 p-3 rounded-lg text-indigo-800 font-medium">
                      {job.company.contactPhone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Manage Job */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Manage Job</h3>
                <div className="space-y-4">
                  <Link
                    to={`/jobs/edit/${job.id}`}
                    className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors duration-200"
                  >
                    Edit Job
                  </Link>
                  <button
                    onClick={onDeleteClick}
                    className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobPage;