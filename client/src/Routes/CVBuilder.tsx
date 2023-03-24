import React from 'react';
import CVBuilderForm from './CVBuilder/CVBuilderForm';
import CVBuilderText from './CVBuilder/CVBuilderText';

const CVBuilder = () => {
  const resumeData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'email@gmail.com',
    phoneNumber: '123-456-7890',
    workExperience: [
      {
        id: 1,
        jobTitle: 'Software Engineer',
        company: 'Google',
        startDate: 'January 2020',
        endDate: 'Present',
        keywords: ['JavaScript', 'React', 'Node.js'],
      },
    ],
  };

  return (
    <div
      className='flex flex-row h-screen w-screen transition duration-200 ease-in-out p-20'
      style={{
        color: 'rgba(38, 38, 38, 1)',
        background: 'rgba(248, 247, 249, 1)',
      }}
    >
      <CVBuilderForm />
      <CVBuilderText resumeData={resumeData} />
    </div>
  );
};

export default CVBuilder;
