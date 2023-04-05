import React, { useState } from 'react';
import Button from './Button';

export default function InterviewForm({ onFormSubmit }: InterviewFormProps) {
  const [companyName, setCompanyName] = useState('');
  const [jobLevel, setJobLevel] = useState('');
  const [jobField, setJobField] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [video, setVideo] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {
      companyName,
      jobLevel,
      jobField,
      jobTitle,
      video,
    };

    onFormSubmit(formValues);
  };

  return (
    <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-black text-sm'>
      <div className='w-5/6	 max-w-md p-10 -space-y-px rounded-md shadow-sm bg-white '>
        <form onSubmit={handleSubmit}>
          <h2 className='text-center text-xl mb-5 font-bold'>
            Live Interviews
          </h2>
          <div className='form-group'>
            <label
              htmlFor='company-name'
              className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'
            >
              Company Name
            </label>
            <input
              type='text'
              id='company-name'
              required
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-african-violet-900 focus:border-african-violet-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-african-violet-900 dark:focus:border-african-violet-900'
            />
          </div>
          <div className='form-group'>
            <label
              htmlFor='job-level'
              className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'
            >
              Job Level
            </label>
            <input
              type='text'
              required
              id='job-level'
              value={jobLevel}
              onChange={(event) => setJobLevel(event.target.value)}
              className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-african-violet-900 focus:border-african-violet-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-african-violet-900 dark:focus:border-african-violet-900'
            />
          </div>
          <div className='form-group'>
            <label
              htmlFor='job-field'
              className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'
            >
              Job Field
            </label>
            <input
              type='text'
              required
              id='job-field'
              value={jobField}
              onChange={(event) => setJobField(event.target.value)}
              className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-african-violet-900 focus:border-african-violet-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-african-violet-900 dark:focus:border-african-violet-900'
            />
          </div>
          <div className='form-group'>
            <label
              htmlFor='job-title'
              className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'
            >
              Job Title
            </label>
            <input
              type='text'
              required
              id='job-title'
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
              className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-african-violet-900 focus:border-african-violet-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-african-violet-900 dark:focus:border-african-violet-900'
            />
          </div>
          <div className='form-group'>
            <label
              htmlFor='video'
              className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'
            >
              Video?
            </label>
            <div className='form-checkbox-container'>
              <input
                type='checkbox'
                id='video'
                value={video.toString()}
                checked={video}
                onChange={(event) => setVideo(event.target.checked)}
                className='w-4 h-4 text-african-violet-900  border-gray-300 rounded focus:ring-african-violet-900 dark:focus:ring-african-violet-900 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              {video && (
                <span className='ml-2'>
                  (You will be recorded for your training purposes)
                </span>
              )}
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <Button>Start Interview</Button>
            {/* <Button>
              Cancel
            </Button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
