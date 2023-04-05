const Button = ({children} : {children: React.ReactNode}) => {
  return (
    <button type='submit' className='w-fit py-2 px-4 bg-dark-cyan text-white hover:bg-african-violet-900 hover:text-white rounded-md text-base font-medium'> 
      {children}
    </button>
  );
};

export default Button;
