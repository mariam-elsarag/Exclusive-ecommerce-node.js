import Navbar from "../ui/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div>
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
