import { Link, useNavigate } from "react-router-dom";

import { useApp } from "../Context/AppContext";
import {
  OrderIcon,
  StarIcon,
  UserIconOutline,
  logoutIcon,
} from "../assets/image";

const SubMenu = ({ setOpenSubMenu }) => {
  const navigate = useNavigate();
  const { logout } = useApp();
  const handleLogout = () => {
    logout();
    setOpenSubMenu(false);
    navigate("/home", { replace: true });
  };
  return (
    <ul className="absolute right-0 top-[38px] z-50 flex w-[224px] flex-col gap-4 rounded-[4px] bg-black/40 px-5 pb-2 pt-4 font-[400] text-White backdrop-blur-[75px] ">
      <li>
        <Link
          to="/account"
          onClick={() => setOpenSubMenu(false)}
          className="flex items-center gap-3"
        >
          <img src={UserIconOutline} alt="user outline" />
          <span className="text-[14px] font-normal">Manage My Account</span>
        </Link>
      </li>
      <li>
        <Link
          to="/order"
          onClick={() => setOpenSubMenu(false)}
          className="flex items-center gap-3"
        >
          <img src={OrderIcon} alt="order icon" />
          <span className="text-[14px] font-normal">My Order</span>
        </Link>
      </li>
      <li>
        <Link
          to="/favorite"
          onClick={() => setOpenSubMenu(false)}
          className="flex items-center gap-3"
        >
          <img src={StarIcon} alt="star icon" />
          <span className="text-[14px] font-normal">My Reviews</span>
        </Link>
      </li>
      <li
        onClick={handleLogout}
        className="flex cursor-pointer items-center gap-3"
      >
        <img src={logoutIcon} alt="logout icon" />
        <span className="text-[14px] font-normal">Logout</span>
      </li>
    </ul>
  );
};

export default SubMenu;
