import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import ResumeBuilderForm from './ResumeBuilder/ResumeBuilderForm';
import ResumeBuilderText from './ResumeBuilder/ResumeBuilderText';
import * as ApiService from '../Util/ApiService';
import Spinner from '../Components/Spinner';

const ResumeBuilder = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [ResumeData, setResumeData] = useState({
    firstName: 'Darian',
    lastName: 'Piro',
    email: 'darian@piro.com',
    phoneNumber: '01577 1234567',
    street: 'Examplestr. 8',
    zipCode: '12345',
    city: 'Berlin',
    workExperience:
      'I can center a div.',
    qualification: 'Codeworks graduate',
    position: 'Junior',
    jobTitle: 'Software Engineer',
    company: 'Google',
    startDate: '2023-05-01',
    description: 'Full stack web developer',
    keywords: [
      'Agile',
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
    const ResumeRequest = {
      firstName: ResumeData.firstName,
      lastName: ResumeData.lastName,
      workExperience: ResumeData.workExperience,
      qualification: ResumeData.qualification,
      position: ResumeData.position,
      jobTitle: ResumeData.jobTitle,
      company: ResumeData.company,
      startDate: ResumeData.startDate,
      description: ResumeData.description,
      selectedKeywords: ResumeData.selectedKeywords,
    };
    const response = await ApiService.createResume(ResumeRequest);
    setResumeData({ ...ResumeData, textBody: response });
  };

  useEffect(() => {
    if (ResumeData.textBody !== '') {
      setShowPDF(true);
      setLoading(false);
    }
  }, [ResumeData]);

  return (
    <div className='h-screen w-screen bg-seasalt'>
      <Navbar />

      <div className='flex flex-row h-full w-full'>
        <div className='w-1/4 bg-black'>
          <ResumeBuilderForm
            ResumeData={ResumeData}
            setResumeData={setResumeData}
            generatePDF={generatePDF}
          />
        </div>
        <div className='w-3/4'>
          {loading && (
            <div className='w-full h-full flex justify-center items-center'>
              <div className='flex flex-col justify-center items-center'>
                <Spinner />
                <p className='mt-10 text-2xl font-bold'>
                  Generating...
                </p>
              </div>
            </div>
          )}
          {showPDF && !loading && (
            <ResumeBuilderText ResumeData={ResumeData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
