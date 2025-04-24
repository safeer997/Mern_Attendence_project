import { logout } from '../api/auth';

function Dashboard() {
  const handleLogout = async () => {
    const response = await logout();
    console.log('logout res : ', response);
  };

  return (
    <>
      <div>Dashboard</div>
      <br></br>
      <button onClick={handleLogout}>logout</button>
    </>
  );
}

export default Dashboard;
