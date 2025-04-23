import { Route, createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MainLayout from './Layout/MainLayout';
import JobsPage from './pages/JobsPage';
import NotPage from './pages/NotPage';
import JobPage from './pages/jobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

import { toast } from'react-toastify';








const App = ()=>{
  // addnew job function
  const addJob = async (newJob) => {
    try {
      const response = await fetch('https://back-end-jobs-api-main-3cw2mc.laravel.cloud/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json', // Très utile avec Laravel
        },
        body: JSON.stringify(newJob),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
  
      const data = await response.json();
      toast.success("Job created successfully:", data,{autoClose: 2000});
      return data;
    } catch (error) {
   toast.error("Error while adding job:", error.message,{autoClose: 3000});
      throw error;
    }
  }
  //delete job function
 
  const Router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
     <Route index element={<HomePage/>}/>
  
     <Route path='/jobs' element ={<JobsPage/>}/>
     <Route path='/jobs/:id' element ={<JobPage />}/>
     <Route path='/Add-job' element ={<AddJobPage addJobSubmit={addJob}/> }/>
     <Route path='/jobs/edit/:id' element ={<EditJobPage/>}/>

     <Route path='*' element={<NotPage/>}/>
    </Route>
  
  ));
  return <RouterProvider router={Router}/>
  
};
export default App