import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
const Dashboard = () => {

  return (
    <div className="p-6">
      <div className="container flex min-h-screen mx-auto">
        <div className=" border-r-[1px]">
          <SideBar />
        </div>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
