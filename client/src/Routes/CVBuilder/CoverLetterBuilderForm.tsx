import { Accordion } from 'flowbite-react';

function CoverLetterBuilderForm({ CoverLetterData, setCoverLetterData, generatePDF }: any) {

  const handleKeywordChange = (event: { target: { value: any } }) => {
    const keyword = event.target.value;
    
    if (CoverLetterData.selectedKeywords.includes(keyword)) {
      setCoverLetterData({
        ...CoverLetterData,
        selectedKeywords: CoverLetterData.selectedKeywords.filter((k: any) => k !== keyword),
      });
    } else {
      setCoverLetterData({...CoverLetterData, selectedKeywords: [...CoverLetterData.selectedKeywords, keyword]});
    }
    console.log(CoverLetterData.selectedKeywords)
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
                className='shadow appearance-none border rounded w-full py-1 px-2  text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CoverLetterData.firstName}
                onChange={(e) =>
                  setCoverLetterData({ ...CoverLetterData, firstName: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Last Name:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-1 px-2  text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CoverLetterData.lastName}
                onChange={(e) =>
                  setCoverLetterData({ ...CoverLetterData, lastName: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Email:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-1 px-2  text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='email'
                value={CoverLetterData.email}
                onChange={(e) =>
                  setCoverLetterData({ ...CoverLetterData, email: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Phone Number:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-1 px-2  text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='tel'
                value={CoverLetterData.phoneNumber}
                onChange={(e) =>
                  setCoverLetterData({ ...CoverLetterData, phoneNumber: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Street:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-1 px-2  text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CoverLetterData.street}
                onChange={(e) =>
                  setCoverLetterData({ ...CoverLetterData, street: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                City:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-1 px-2  text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CoverLetterData.city}
                onChange={(e) => setCoverLetterData({ ...CoverLetterData, city: e.target.value })}
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Zip Code:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-1 px-2  text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CoverLetterData.zipCode}
                onChange={(e) =>
                  setCoverLetterData({ ...CoverLetterData, zipCode: e.target.value })
                }
              />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                State:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-1 px-2  text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CoverLetterData.city}
                onChange={(e) => setCoverLetterData({ ...CoverLetterData, city: e.target.value })}
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
                className='shadow appearance-none border rounded w-full py-1 px-2  text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CoverLetterData.jobTitle}
                onChange={(e) =>
                  setCoverLetterData({ ...CoverLetterData, jobTitle: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Company:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-1 px-2  text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={CoverLetterData.company}
                onChange={(e) =>
                  setCoverLetterData({ ...CoverLetterData, company: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Start Date:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-1 px-2  text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='date'
                value={CoverLetterData.startDate}
                onChange={(e) =>
                  setCoverLetterData({ ...CoverLetterData, startDate: e.target.value })
                }
              />
              <br />
              <label className='block text-gray-700 text-sm font-bold mt-2'>
                Description:
                <textarea
                  className='shadow appearance-none border rounded w-full py-1 px-2  text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal'
                  value={CoverLetterData.description}
                  onChange={(e) =>
                    setCoverLetterData({ ...CoverLetterData, description: e.target.value })
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
                value={CoverLetterData.workExperience}
                onChange={(e) =>
                  setCoverLetterData({ ...CoverLetterData, workExperience: e.target.value })
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
                {CoverLetterData.keywords.map((keyword: any) => (
                  <label
                    key={keyword}
                    className='block text-gray-700 text-sm mb-2'
                  >
                    <input
                      type='checkbox'
                      value={keyword}
                      checked={CoverLetterData.selectedKeywords.includes(keyword)}
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
          Generate
        </button>
      </form>
    </div>
  );
}

export default CoverLetterBuilderForm;
