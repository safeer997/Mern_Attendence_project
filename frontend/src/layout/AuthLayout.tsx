import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-950 text-white px-4 sm:px-6 md:px-8'>
      <div className='w-full max-w-6xl mx-auto border border-gray-800/50 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.4)] bg-gray-900/40 backdrop-blur-md p-4 md:p-0'>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
