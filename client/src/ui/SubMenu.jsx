import { Link } from "react-router-dom";

import {
  UserIconOutline,
  logoutIcon,
  OrderIcon,
  StarIcon,
} from "../assets/image";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/userSlice";
const SubMenu = ({ setOpenSubMenu }) => {
  const dispatch = useDispatch();
  async function handleLogout() {
    try {
      await signOut(auth);
      dispatch(logOut());
      setOpenSubMenu(false);
    } catch (err) {
      console.log(err);
    }
  }
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
