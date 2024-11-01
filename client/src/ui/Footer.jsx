import { VscSend } from "react-icons/vsc";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { BsGooglePlay, BsQrCode, AppStore } from "../assets/image";

const footerLink = [
  { id: 0, name: "My Account", link: "account" },
  { id: 1, name: "cart", link: "cart" },
  { id: 2, name: "Wishlist", link: "favorite" },
  { id: 3, name: "Shop", link: "shop" },
];

const Footer = () => {
  return (
    <footer className="bg-black text-White">
      <div className="Container flex flex-col flex-wrap justify-between gap-14 pb-6 pt-20 sm:flex-row xl:gap-16">
        <div>
          <h5 className="mb-6 font-header text-2xl font-bold  ">Exclusive</h5>
          <div>
            <p className="mb-6 text-xl font-medium">Subscribe</p>
            <p className="text-base font-normal">
              Get 10% off your first order
            </p>
            <form className="mt-4  flex w-[290px] items-center justify-between gap-2 rounded-md border-2 border-white px-2 sm:w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent py-3 pl-2 placeholder:text-White/40 focus:outline-none  "
              />
              <button>
                <VscSend size={25} className="text-white" />
              </button>
            </form>
          </div>
        </div>
        <div className="w-full sm:w-[175px]">
          <h5 className="mb-6 font-header text-2xl font-bold ">Support</h5>
          <div className="flex flex-col gap-4">
            <p className="text-base">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <p className="text-base">exclusive@gmail.com</p>
            <p className="text-base">+88015-88888-9999</p>
          </div>
        </div>
        <div>
          <h5 className="mb-6 font-header text-2xl font-bold ">Account</h5>
          <ul className="flex flex-col gap-4">
            {footerLink.map((link) => (
              <li key={link.id} className="text-base capitalize">
                <Link to={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="mb-6 font-header text-2xl font-bold ">Quick Link</h5>
          <ul className="flex flex-col gap-4">
            <li className="text-base capitalize">Privacy Policy</li>
            <li className="text-base capitalize">Terms Of Use</li>
            <li className="text-base capitalize">FAQ</li>
            <li className="text-base capitalize">Contact</li>
          </ul>
        </div>
        <div>
          <h5 className="mb-6 font-header text-2xl font-bold ">Download App</h5>
          <div>
            <p className="mb-2 text-xs text-White/70">
              Save $3 with App New User Only
            </p>
            <figure className="mb-6 flex gap-2">
              <figure>
                <img src={BsQrCode} alt="qr code" />
              </figure>
              <figure className="flex flex-col gap-1">
                <img src={BsGooglePlay} alt="google play" />
                <img src={AppStore} alt="app store" />
              </figure>
            </figure>
            <div className="flex items-center gap-6">
              <FaFacebookF size={20} />
              <FaTwitter size={20} />
              <FaInstagram size={20} />
              <FaLinkedinIn size={20} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
