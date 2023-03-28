import React, { useState, useContext } from 'react';
import { Context } from '../Context';

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
      <div className='w-5/6	 max-w-md p-10 space-y-8 bg-white rounded-lg shadow '>
        <form onSubmit={handleSubmit}>
          <h2 className='text-center text-xl mb-5 font-bold tracking-tight'>Live Interviews</h2>
          <div className='text-sm'>
            <label htmlFor='company-name' className='form-label'>
              Company Name:
            </label>
            <input
              type='text'
              id='company-name'
              required
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className='form-input'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='job-level' className='form-label'>
              Job Level:
            </label>
            <input
              type='text'
              required
              id='job-level'
              value={jobLevel}
              onChange={(event) => setJobLevel(event.target.value)}
              className='form-input'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='job-field' className='form-label'>
              Job Field:
            </label>
            <input
              type='text'
              required
              id='job-field'
              value={jobField}
              onChange={(event) => setJobField(event.target.value)}
              className='form-input'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='job-title' className='form-label'>
              Job Title:
            </label>
            <input
              type='text'
              required
              id='job-title'
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
              className='form-input'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='video' className='form-label'>
              Video?
            </label>
            <div className='form-checkbox-container'>
              <input
                type='checkbox'
                id='video'
                value={video.toString()}
                checked={video}
                onChange={(event) => setVideo(event.target.checked)}
                className='form-checkbox'
              />
              {video && (
                <span className='form-checkbox-message'>
                  (You will be recorded for your training purposes)
                </span>
              )}
            </div>
          </div>

          <div className='form-actions'>
            <button type='submit' className='form-button'>
              Start Interview
            </button>
            <button type='button' className='form-button'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
