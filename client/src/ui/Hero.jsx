import ListItems from "./ListItems";

import { FaArrowRightLong } from "react-icons/fa6";
import useGetData from "../hooks/useGetData";
import { AppleLogo } from "../assets/image";

const Hero = () => {
  const { data } = useGetData(`/api/category/all`);

  return (
    <div className="Container mb-10 flex  gap-10">
      <ul className=" mr-4 hidden gap-4   border-r border-gray-300 pt-10 xl:flex xl:w-[217px] xl:flex-col ">
        {data?.results.map((item) => (
          <ListItems key={item.id} item={item} />
        ))}
      </ul>
      <div className="w-full pt-10">
        <div className=" relative h-[340px]  w-full  bg-[url('../hero.png')] bg-cover bg-center  text-White">
          <div className="absolute inset-0 z-0 bg-black/20"></div>
          <div className="relative z-10 w-full pl-5 pt-10 md:w-1/2 md:pl-12">
            <div className="mb-5 flex items-center gap-3">
              <img src={AppleLogo} alt="apple logo" />
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
