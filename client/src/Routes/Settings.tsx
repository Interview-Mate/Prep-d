import { useContext, useState } from 'react';
import { Context } from '../Context';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { handleUpdateUser, user } = useContext(Context) as any;
  const [selectedPicture, setSelectedPicture] = useState<Blob | undefined>();
  const navigate = useNavigate();

  const handleSubmit = async (event: {
    preventDefault: () => void;
    target: any;
  }) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    let image_link = '';
    if (formJson.image.name !== '') {
      const formData = new FormData();
      formData.append('file', formJson.image);
      formData.append('upload_preset', 'interviewMate');
      const POST_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`;
      const response = await fetch(`${POST_URL}`, {
        method: 'POST',
        body: formData,
      });
      image_link = await response.json();
    }

    const updatedUser = {
      ...formJson,
      email: user.email,
      image: image_link.secure_url,
    };

    handleUpdateUser(updatedUser);
    navigate('/dashboard');
  };

  return (
    <div className='h-screen w-screen bg-seasalt'>
      <Navbar />
      <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-black'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <h2 className='text-center text-3xl font-bold tracking-tight '>
              Settings
            </h2>
          </div>
          <form
            className='mt-8 space-y-6'
            action='#'
            method='POST'
            onSubmit={handleSubmit}
          >
            <div className='-space-y-px rounded-md shadow-sm'>
              <div className=' '>
                <label
                  htmlFor='first-name'
                  className='block m-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  First name
                </label>
                <input
                  id='first-name'
                  name='name'
                  autoComplete='firstname'
                  className='relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3'
                />
              </div>
              <div>
                <label
                  htmlFor='last-name'
                  className='block m-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Last name
                </label>
                <input
                  id='last-name'
                  name='surname'
                  autoComplete='lastname'
                  className='relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3'
                />
              </div>
              <div>
                <label
                  htmlFor='level'
                  className='block m-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Skill level
                </label>
                <select
                  id='level'
                  name='level'
                  autoComplete='level'
                  className='relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3'
                >
                  <option value=''></option>
                  <option value='Junior'>Junior</option>
                  <option value='Senior'>Senior</option>
                </select>
              </div>
            </div>

            <div className='flex align-middle h-20'>
              <div className='flex flex-col w-1/2'>
                <label
                  className='block m-2 text-sm font-medium text-gray-900 dark:text-white'
                  htmlFor='file_input'
                >
                  Profile picture
                </label>
                <input
                  className='block w-full h-10 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                  id='file_input'
                  name='image'
                  type='file'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setSelectedPicture(event.target.files?.[0])
                  }
                />
              </div>
              <div className='w-1/2'>
                {selectedPicture && (
                  <img
                    src={URL.createObjectURL(selectedPicture)}
                    alt='profile'
                    className='h-20 ml-20 rounded-full'
                  />
                )}
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
