import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { CiHeart, BsCart3, HiBars3 } from "../icon";
import { UserIcon } from "../assets/image";
import { useState } from "react";
import SubMenu from "./SubMenu";
import { getCarts } from "../services/cartApi";
import { useQuery } from "@tanstack/react-query";
const menuLink = [
  { id: 0, title: "home", link: "home" },
  { id: 1, title: "About", link: "about" },
  { id: 2, title: "contact", link: "contact" },
];

const Navbar = () => {
  const { token, profile_picture } = useSelector((store) => store.user);

  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCarts,
  });
  return (
    <nav className="border-b">
      <div className="bg-black py-4">
        <p className="text-center text-xs text-White xl:text-sm ">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <span className="ml-2 underline">Shop Now</span>
        </p>
      </div>
      <div className="Container relative flex items-center justify-between py-4">
        <Link to="home" className="font-header text-2xl font-bold">
          Exclusive
        </Link>
        <ul
          className={`absolute left-[50%]
          ${
            openMenu ? "top-[100%]" : "top-[-400%]"
          } z-40 flex  w-[90%] translate-x-[-50%] flex-col gap-5 rounded-md bg-black/40 py-4 text-center text-White backdrop-blur-[75px] transition-all duration-300 md:relative md:left-0 md:w-auto md:translate-x-0 md:flex-row md:bg-transparent md:py-0 md:text-start md:text-black  md:backdrop-blur-none`}
        >
          {menuLink.map((link) => (
            <li key={link.id}>
              <NavLink
                className="capitalize transition-colors duration-200"
                to={link.link}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
          {(token?.length === 0 || token === undefined) && (
            <li className="space-x-2">
              <NavLink
                to="/signup"
                className="capitalize transition-colors duration-200"
              >
                Sign Up
              </NavLink>
            </li>
          )}
        </ul>
        {token?.length > 0 && token !== undefined && (
          <ul className="relative flex items-center gap-5 ">
            <li>
              <Link to="wisthlist">
                <CiHeart size={25} />
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <div className="relative">
                  <BsCart3 size={25} />
                  {token?.length > 0 && cart?.length > 0 && (
                    <span className="h-1 absolute left-[-13px] top-[-5px] flex w-4 items-center  justify-center rounded-full bg-red-500 text-xs font-normal text-white">
                      {cart?.length}
                    </span>
                  )}
                </div>
              </Link>
            </li>
            <li className="inline-flex cursor-pointer md:hidden">
              <HiBars3 size={25} onClick={() => setOpenMenu((menu) => !menu)} />
            </li>

            {token?.length > 0 && (
              <li>
                <img
                  src={UserIcon}
                  onClick={() => setOpenSubMenu((subMenu) => !subMenu)}
                  alt="user icon"
                  className="cursor-pointer"
                />
                {openSubMenu && <SubMenu setOpenSubMenu={setOpenSubMenu} />}
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
