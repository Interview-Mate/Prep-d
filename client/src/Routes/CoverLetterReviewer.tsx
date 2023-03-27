import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { reviewPdfCoverLetter, reviewTextCoverLetter } from '../Util/ApiService';

const CoverLetterReviewer = () => {
  const [showPDFUpload, setShowPDFUpload] = useState(false);
  const [showTextUpload, setShowTextUpload] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handlePdfUpload = async (event: {
    preventDefault: () => void;
    target: any;
  }) => {
    event.preventDefault();
    const dataForm = new FormData();
    dataForm.append('file', event.target.file.files[0]);
    const response = await reviewPdfCoverLetter(dataForm);
    console.log(response);
    setRating(response.replace());
  };

  const handleTextUpload = async (event: {
    preventDefault: () => void;
    target: any;
  }) => {
    event.preventDefault();
    const response = await reviewTextCoverLetter(textInput);
    console.log(response);
  };

  return (
    <div className='h-screen w-screen bg-seasalt'>
      <Navbar />
      <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-black'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <h2 className='text-center text-3xl font-bold tracking-tight '>
              Analyze your cover letter
            </h2>
          </div>

          <div className='flex flex-col items-center justify-center h-full'>
            <button
              className='text-xl font-bold'
              onClick={() => setShowPDFUpload(!showPDFUpload)}
            >
              Upload PDF
            </button>
            <button
              className='text-xl font-bold'
              onClick={() => setShowTextUpload(!showTextUpload)}
            >
              Upload Text
            </button>
          </div>
          {showPDFUpload && (
            <form
              className='mt-8 space-y-6'
              action='#'
              method='POST'
              id='uploadForm'
              encType='multipart/form-data'
              onSubmit={handlePdfUpload}
            >
              <div className='flex align-middle h-20'>
                <div className='flex flex-col w-full'>
                  <label
                    className='block m-2 text-sm font-medium text-gray-900 dark:text-white'
                    htmlFor='file_input'
                  >
                    <input
                      className='block w-full h-10 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                      id='file'
                      name='image'
                      type='file'
                    />
                  </label>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full bg-african-violet-900 hover:opacity-75 active:opacity-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                  Analyze
                </button>
              </div>
            </form>
          )}
          {showTextUpload && (
            <form
              className='mt-8 space-y-6'
              action='#'
              method='POST'
              onSubmit={handleTextUpload}
            >
              <div className='flex align-middle '>
                <div className='flex flex-col w-full '>
                  <label
                    className='block m-2 text-sm font-medium text-gray-900 dark:text-white'
                    htmlFor='text_input'
                  >
                    <textarea
                      className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 dark:text-gray-400 active:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                      id='text-input'
                      name='text'
                      value={textInput}
                      onChange={(
                        event: React.ChangeEvent<HTMLTextAreaElement>
                      ) => setTextInput(event.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full bg-african-violet-900 hover:opacity-75 active:opacity-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                  Analyze
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterReviewer;
