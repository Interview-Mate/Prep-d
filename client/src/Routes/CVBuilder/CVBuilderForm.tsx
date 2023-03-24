import React, { useState, useEffect } from 'react';
import { Accordion } from 'flowbite-react';

function CVBuilderForm({ CVData, setCVData, generatePDF }: any) {
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleKeywordChange = (event: { target: { value: any } }) => {
    const keyword = event.target.value;
    if (selectedKeywords.includes(keyword)) {
      setCVData({
        ...CVData,
        keywords: CVData.keywords.filter((k: any) => k !== keyword),
      });
    } else {
      setCVData({ ...CVData, keywords: [...CVData.keywords, keyword] });
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    generatePDF();
  };

  return (
    <div className='border border-teal-600 mr-8 p-4 h-full min-h-max w-1/4 flex flex-col bg-white text-sm'>
      <form onSubmit={handleSubmit} className='mb-0'>
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>Your Details</Accordion.Title>
            <Accordion.Content>
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                First Name:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CVData.firstName}
                onChange={(e) =>
                  setCVData({ ...CVData, firstName: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Last Name:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CVData.lastName}
                onChange={(e) =>
                  setCVData({ ...CVData, lastName: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Email:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='email'
                value={CVData.email}
                onChange={(e) =>
                  setCVData({ ...CVData, email: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Phone Number:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='tel'
                value={CVData.phoneNumber}
                onChange={(e) =>
                  setCVData({ ...CVData, phoneNumber: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Street:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CVData.street}
                onChange={(e) =>
                  setCVData({ ...CVData, street: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                City:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CVData.city}
                onChange={(e) => setCVData({ ...CVData, city: e.target.value })}
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Zip Code:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CVData.zipCode}
                onChange={(e) =>
                  setCVData({ ...CVData, zipCode: e.target.value })
                }
              />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                State:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CVData.city}
                onChange={(e) => setCVData({ ...CVData, city: e.target.value })}
              />{' '}
              <br />
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Job details</Accordion.Title>
            <Accordion.Content>
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Job Title:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CVData.jobTitle}
                onChange={(e) =>
                  setCVData({ ...CVData, jobTitle: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Company:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CVData.company}
                onChange={(e) =>
                  setCVData({ ...CVData, company: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Start Date:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='date'
                value={CVData.startDate}
                onChange={(e) =>
                  setCVData({ ...CVData, startDate: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                End Date:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='date'
                value={CVData.endDate}
                onChange={(e) =>
                  setCVData({ ...CVData, endDate: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Description:
                <textarea
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal'
                  value={CVData.description}
                  onChange={(e) =>
                    setCVData({ ...CVData, description: e.target.value })
                  }
                />
              </label>{' '}
              <br />
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Work experience</Accordion.Title>
            <Accordion.Content>
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Work Experience:
              </label>
              <textarea
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={CVData.workExperience}
                onChange={(e) =>
                  setCVData({ ...CVData, workExperience: e.target.value })
                }
              />{' '}
              <br />
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Keywords</Accordion.Title>
            <Accordion.Content>
              <div>
                <p className='block text-gray-700 text-sm font-bold mt-2'>
                  Select keywords to include:
                </p>
                {CVData.keywords.map((keyword) => (
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
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
        <br />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CVBuilderForm;
