import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
