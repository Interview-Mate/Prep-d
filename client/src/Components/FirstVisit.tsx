import { useContext } from 'react';
import { Context } from '../Context';

export default function FirstVisit() {
  const { handleCreateUser, user } = useContext(Context) as any;

  const handleSubmit = (event: { preventDefault: () => void; target: any }) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const newUser = { ...formJson, email: user.email };
    console.log(newUser);
    handleCreateUser(newUser);
  };

  return (
    <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-white'>
      <div className='w-5/6	 max-w-md p-10 -space-y-px rounded-md shadow-sm bg-white '>
        <div>
          <h2 className='mt-6 text-center text-xl mb-5 font-bold tracking-tight'>
            Please tell us a bit about yourself
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
              <label htmlFor='first-name' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>
                First name
              </label>
              <input
                id='first-name'
                name='name'
                autoComplete='firstname'
                required
                className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-african-violet-900 focus:border-african-violet-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-african-violet-900 dark:focus:border-african-violet-900'
                placeholder='First name'
              />
            </div>
            <div>
              <label htmlFor='last-name' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>
                Last name
              </label>
              <input
                id='last-name'
                name='surname'
                autoComplete='lastname'
                required
                className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-african-violet-900 focus:border-african-violet-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-african-violet-900 dark:focus:border-african-violet-900'
                placeholder='Last name'
              />
            </div>
            <div>
              <label htmlFor='level' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>
                Skill level
              </label>
              <select
                id='level'
                name='level'
                autoComplete='level'
                required
                className='relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-african-violet-900 sm:text-sm sm:leading-6 pl-3'
              >
                <option value='frontend'>Junior</option>
                <option value='backend'>Senior</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-african-violet-900 focus:border-african-violet-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-african-violet-900 dark:focus:border-african-violet-900'
            >
              Get me going
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
