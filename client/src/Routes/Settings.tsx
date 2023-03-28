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
      formData.append(
        'upload_preset',
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string
      );
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
    <div>
      <Navbar />
      <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-5/6	 max-w-md p-10 -space-y-px rounded-md shadow-sm bg-white '>
          <div>
            <h2 className='text-center text-2xl font-bold tracking-tight'>
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
                  className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'
                >
                  First name
                </label>
                <input
                  id='first-name'
                  name='name'
                  autoComplete='firstname'
                  className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-african-violet-900 focus:border-african-violet-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-african-violet-900 dark:focus:border-african-violet-900'
                />
              </div>
              <div>
                <label
                  htmlFor='last-name'
                  className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'
                >
                  Last name
                </label>
                <input
                  id='last-name'
                  name='surname'
                  autoComplete='lastname'
                  className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-african-violet-900 focus:border-african-violet-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-african-violet-900 dark:focus:border-african-violet-900'
                />
              </div>
              <div>
                <label
                  htmlFor='level'
                  className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'
                >
                  Skill level
                </label>
                <select
                  id='level'
                  name='level'
                  autoComplete='level'
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-african-violet-900 focus:border-african-violet-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-african-violet-900 dark:focus:border-african-violet-900'
                >
                  <option value=''></option>
                  <option value='Junior'>Junior</option>
                  <option value='Senior'>Senior</option>
                </select>
              </div>
            </div>

            <div className='flex align-middle h-20'>
              <div className='flex flex-col w-2/3'>
                <label
                  className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'
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
              <div className='w-1/3 flex items-center justify-center '>
                {selectedPicture && (
                  <img
                    src={URL.createObjectURL(selectedPicture)}
                    alt='profile'
                    className='h-20 w-20 rounded-full'
                  />
                )}
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='w-full bg-african-violet-900 hover:opacity-75 active:opacity-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
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
