import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import CVBuilderForm from './CVBuilder/CoverLetterBuilderForm';
import CVBuilderText from './CVBuilder/CoverLetterBuilderText';
import * as ApiService from '../Util/ApiService';

const CoverLetter = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [CoverLetterData, setCoverLetterData] = useState({
    firstName: 'Darian',
    lastName: 'Piro',
    email: 'darian@piro.com',
    phoneNumber: '01577 1234567',
    street: 'Examplestr. 8',
    zipCode: '12345',
    city: 'Berlin',
    workExperience: 'I have worked as a backend developer for 2 years.',
    jobTitle: 'Software Engineer',
    company: 'Google',
    startDate: '01.01.2020',
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
    selectedKeywords: [],
    textBody: '',
  });
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    setLoading(true);
    const coverLetterRequest = {
      firstName: CoverLetterData.firstName,
      lastName: CoverLetterData.lastName,
      workExperience: CoverLetterData.workExperience,
      jobTitle: CoverLetterData.jobTitle,
      company: CoverLetterData.company,
      startDate: CoverLetterData.startDate,
      description: CoverLetterData.description,
      selectedKeywords: CoverLetterData.selectedKeywords,
    };
    const response = await ApiService.createCoverLetter(coverLetterRequest);
    setCoverLetterData({ ...CoverLetterData, textBody: response });
  };

  useEffect(() => {
    if (CoverLetterData.textBody !== '') {
      setShowPDF(true);
      setLoading(false);
    }
  }, [CoverLetterData]);

  return (
    <div className='h-screen w-screen bg-seasalt'>
      <Navbar />
      
      <div className='flex flex-row h-full'>
        <CVBuilderForm
          CoverLetterData={CoverLetterData}
          setCoverLetterData={setCoverLetterData}
          generatePDF={generatePDF}
        />
        {loading && (
        <div className='w-full h-full flex justify-center items-center'>
          <div className='flex flex-col justify-center items-center'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
            <p className='mt-10 text-2xl font-bold'>Generating cover letter...</p>
          </div>
        </div>
      )}
        {showPDF && <CVBuilderText CoverLetterData={CoverLetterData} />}
      </div>
    </div>
  );
};

export default CoverLetter;
