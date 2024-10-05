import ListItems from "./ListItems";
import appleLogo from "../assets/Apple_gray_logo 1.png";
import { FaArrowRightLong } from "react-icons/fa6";
const categoryItem = [
  { id: 0, name: "Woman’s Fashion" },
  { id: 1, name: "Men’s Fashion" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Home & Lifestyle" },
  { id: 4, name: "Medicine" },
  { id: 5, name: "Sports & Outdoor" },
  { id: 6, name: "Baby’s & Toys" },
  { id: 7, name: "Groceries & Pets" },
  { id: 8, name: "Health & Beauty" },
];
const Hero = () => {
  return (
    <div className="Container mb-10 flex  gap-10">
      <ul className=" mr-4 hidden gap-4   border-r border-gray-300 pt-10 xl:flex xl:w-[217px] xl:flex-col ">
        {categoryItem.map((item) => (
          <ListItems key={item.id} item={item} />
        ))}
      </ul>
      <div className="w-full pt-10">
        <div className=" relative h-[340px]  w-full  bg-[url('../hero.png')] bg-cover bg-center  text-White">
          <div className="absolute inset-0 z-0 bg-black/20"></div>
          <div className="relative z-10 w-full pl-5 pt-10 md:w-1/2 md:pl-12">
            <div className="mb-5 flex items-center gap-3">
              <img src={appleLogo} alt="apple logo" />
              <span>iPhone 14 Series</span>
            </div>
            <h1 className=" mb-6 font-header text-3xl font-semibold leading-[60px] tracking-[1.92px] md:text-5xl">
              Up to 10% <br />
              off Voucher
            </h1>
            <div className="flex cursor-pointer items-center gap-2">
              <p className="underline underline-offset-8">Shop now</p>
              <FaArrowRightLong />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
