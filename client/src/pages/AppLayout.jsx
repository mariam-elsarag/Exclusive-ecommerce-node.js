import Navbar from "../ui/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
