import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import CVBuilderForm from './CVBuilder/CVBuilderForm';
import CVBuilderText from './CVBuilder/CVBuilderText';

const CVBuilder = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [CVData, setCVData] = useState({
    firstName: 'Darian',
    lastName: 'Piro',
    email: 'darian@piro.com',
    phoneNumber: '01577 1234567',
    street: 'Examplestr. 8',
    zipCode: '12345',
    city: 'Berlin',

    workExperience: 'I have worked as a ...',
    jobTitle: 'Software Engineer',
    company: 'Google',
    startDate: '01.01.2020',
    endDate: '01.01.2021',
    description: 'Senior backend developer',
    keywords: [
      'Leadership',
      'Project Management',
      'Teamwork',
      'Communication',
      'Problem Solving',
      'Time Management',
      'Technical Skills',
      'Creativity',
      'Adaptability',
      'Scalability',
      'React',
      'Angular',
    ],
  });

  const generatePDF = () => {
    console.log('Generating PDF...');
    setShowPDF(true);
  };

  return (
    <div className='h-screen w-screen bg-seasalt'>
      <Navbar />
      <div className='flex flex-row h-full'>
        <CVBuilderForm
          CVData={CVData}
          setCVData={setCVData}
          generatePDF={generatePDF}
        />
        {showPDF && <CVBuilderText CVData={CVData} />}
      </div>
    </div>
  );
};

export default CVBuilder;
