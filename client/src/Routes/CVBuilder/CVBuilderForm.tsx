import React, { useState } from 'react';

function CVBuilderForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keywords, setKeywords] = useState([
    'Leadership',
    'Project Management',
    'Teamwork',
    'Communication',
    'Problem Solving',
    'Time Management',
    'Technical Skills',
  ]);

  const handleKeywordChange = (event) => {
    const keyword = event.target.value;
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(
        selectedKeywords.filter((selected) => selected !== keyword)
      );
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className='border border-teal-600 rounded-md mr-8 p-4 h-full min-h-max w-1/4 flex flex-col bg-white text-sm'>
      <form onSubmit={handleSubmit}>
        <label className='block text-gray-700 text-sm font-bold mt-2'>
          First Name:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        
        <br />
        <label className='block text-gray-700 text-sm font-bold mt-2'>
          Last Name:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        <br />
        <label className='block text-gray-700 text-sm font-bold mt-2'>
          Email:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        <br />
        <label className='block text-gray-700 text-sm font-bold mt-2'>
          Phone Number:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='tel'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          
        <br />
        <label className='block text-gray-700 text-sm font-bold mt-2'>
          Work Experience:</label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
          />
          
        <br />
        <label className='block text-gray-700 text-sm font-bold mt-2'>
          Job Title:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          
        <br />
        <label className='block text-gray-700 text-sm font-bold mt-2'>
          Company:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        <br />
        <label className='block text-gray-700 text-sm font-bold mt-2'>
          Start Date:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        <br />
        <label className='block text-gray-700 text-sm font-bold mt-2'>
          End Date:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        <br />
        <label className='block text-gray-700 text-sm font-bold mt-2'>
          Description:
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>{' '}
        <br />
        <div>
          <p className='block text-gray-700 text-sm font-bold mt-2'>Select keywords to include:</p>
          {keywords.map((keyword) => (
            <label
              key={keyword}
              className='block text-gray-700 text-sm mb-2'
            >
              <input
                type='checkbox'
                value={keyword}
                checked={selectedKeywords.includes(keyword)}
                onChange={handleKeywordChange}
              />
              {keyword}
            </label>
          ))}
        </div>{' '}
        <br />
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default CVBuilderForm;
