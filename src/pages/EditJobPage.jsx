import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditJobPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [salary, setSalary] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [company_description, setCompany_description] = useState('');
    const [contact_email, setContact_email] = useState('');
    const [contact_phone, setContact_phone] = useState('');
    
    useEffect(() => {
        const fetchJob = async () => {
          try {
            const response = await fetch(`https://back-end-jobs-api-main-3cw2mc.laravel.cloud/api/jobs/${id}`);
            const data = await response.json();
      
            setTitle(data.title);
            setType(data.type);
            setSalary(data.salary);
            setDescription(data.description);
            setLocation(data.location);
            setCompany_name(data.company.name);
            setCompany_description(data.company.description);
            setContact_email(data.company.contactEmail);
            setContact_phone(data.company.contactPhone);
          } catch (error) {
            console.error("Error fetching job:", error);
          }
        };
      
        fetchJob();
      }, [id]);
      //handleSubmit function
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const updatedJob = {
          title,
          type,
          salary,
          description,
          location,
          company: {
            name: company_name,
            description: company_description,
            contactEmail: contact_email,
            contactPhone: contact_phone
          }
        };
      
        try {
          const response = await fetch(`https://back-end-jobs-api-main-3cw2mc.laravel.cloud/api/jobs/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(updatedJob),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong");
          }
      
          await response.json();
          toast.success("Job updated successfully!", { autoClose: 2000 });
          navigate('/jobs');
        } catch (error) {
          toast.error(`Error updating job: ${error.message}`, { autoClose: 3000 });
        }
      };
      

  return (
   <>
    <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-23">
          <div className="px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl text-center font-semibold mb-6">
              Edit Job
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={type}
                  onChange={(e)=>setType(e.target.value)}
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Job Listing name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Beautiful Apartment In Miami"
                  required
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="Add any job duties, expectations, requirements, etc"
                  required
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}    
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Salary
                </label>
                <select
                  id="salary"
                  name="salary"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={salary}
                  onChange={(e)=>setSalary(e.target.value)}
                >
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - 60K">$50K - $60K</option>
                  <option value="$60K - 70K">$60K - $70K</option>
                  <option value="$70K - 80K">$70K - $80K</option>
                  <option value="$80K - 90K">$80K - $90K</option>
                  <option value="$90K - 100K">$90K - $100K</option>
                  <option value="$100K - 125K">$100K - $125K</option>
                  <option value="$125K - 150K">$125K - $150K</option>
                  <option value="$150K - 175K">$150K - $175K</option>
                  <option value="$175K - 200K">$175K - $200K</option>
                  <option value="Over $200K">Over $200K</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Company Location"
                  required
                  value={location}
                  onChange={(e)=>setLocation(e.target.value)}
                />
              </div>

              <h3 className="text-2xl mb-5">Company Info</h3>

              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Company name"
                  required
                  value={company_name}
                  onChange={(e)=>setCompany_name(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="company_description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Description
                </label>
                <textarea
                  id="company_description"
                  name="company_description"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="What does your company do?"
                  required
                  value={company_description}
                  onChange={(e)=>setCompany_description(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contact_email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Email address for applicants"
                  required
                  value={contact_email}
                  onChange={(e)=>setContact_email(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact_phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Optional phone for applicants"
                  value={contact_phone}
                  onChange={(e)=>setContact_phone(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </section></>
  )
}

export default EditJobPage