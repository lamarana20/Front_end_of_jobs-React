import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link,useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowAltCircleLeft,FaLocationArrow } from "react-icons/fa";

import Spinner from "../components/Spinner";

const JobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  //delete job function
  const onDeleteClick = async () => {
    try {
      await fetch(`https://back-end-jobs-api-main-3cw2mc.laravel.cloud/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
   toast.success ("Job deleted successfully.", {autoClose: 2000});

      return navigate('/jobs');
    }
    catch (error) {
     toast.error("Error while deleting job:", error.message),{autoClose: 3000};
      throw error;
    }
  };
  //list jobs function
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          `https://back-end-jobs-api-main-3cw2mc.laravel.cloud/api/jobs/${id}`
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
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            class="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowAltCircleLeft className="fas fa-arrow-left mr-2"></FaArrowAltCircleLeft> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaLocationArrow className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></FaLocationArrow>
                  <p className="text-orange-700">Boston, MA</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 class="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p class="mb-4">
                {job.description}
                </p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

                <p className="mb-4">{job.salary}/ Year</p>
              </div>
            </main>

            {/* Sidebar */}
            <aside>
              {/* Company Info */}
              <div className="bg-white p-6 rounded-lg shadow-md md:justify-end">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 class="text-2xl">{job.company.name}</h2>

                <p class="my-2">
                 {job.company.description}
                </p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                    {job.company.contactPhone}
                </p>
              </div>

              {/* Apply Now */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                 to={`/jobs/edit/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button onClick={()=>onDeleteClick(job.id)}   className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobPage;
