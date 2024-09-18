import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  // Fetch the user's resume list
  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        console.log(resp.data.data);
        setResumeList(resp.data.data);
      });
  };

  return (
    <div className='p-6 sm:p-8 md:p-10 lg:p-12'>
      <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4'>
        My Resume
      </h2>
      <p className='text-sm sm:text-base md:text-lg lg:text-xl mb-6'>
        Start creating a resume for your next job role
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10'>
        <AddResume />
        {resumeList.length > 0 && resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
