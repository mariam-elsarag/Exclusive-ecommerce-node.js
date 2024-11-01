import { HeadPhone } from "../assets/image";
import Button from "./Button";

const Banner1 = () => {
  return (
    <div className="Container my-20 h-[500px]">
      <div className="flex h-[100%]  items-center justify-center bg-[url('/home_banner.png')] bg-cover bg-left bg-no-repeat ">
        <div className="flex w-full flex-col items-center justify-center px-5 text-center text-White md:w-1/2 md:items-start md:justify-start  md:text-start lg:px-10 ">
          <strong className="font-semibold  text-[#00FF66]">Categories</strong>
          <h3 className="my-10 w-[350px] font-header text-3xl font-semibold leading-9 sm:text-4xl md:w-full lg:text-5xl">
            Enhance Your Music Experience
          </h3>
          <ul className="flex items-start gap-4 md:gap-6 ">
            <li className="flex  h-[62px] w-[62px] flex-col items-center justify-center rounded-full bg-white text-black">
              <strong className="text-base font-semibold">23</strong>
              <small className="text-[11px]">Hours</small>
            </li>
            <li className="flex h-[62px] w-[62px] flex-col items-center justify-center rounded-full bg-white text-black">
              <strong className="text-base font-semibold">05</strong>
              <small className="text-[11px]">Days</small>
            </li>
            <li className="flex h-[62px] w-[62px] flex-col items-center justify-center rounded-full bg-white text-black">
              <strong className="text-base font-semibold">59</strong>
              <small className="text-[11px]">Minutes</small>
            </li>
            <li className="flex h-[62px] w-[62px] flex-col items-center justify-center rounded-full bg-white text-black">
              <strong className="text-base font-semibold">35</strong>
              <small className="text-[11px]">Seconds</small>
            </li>
          </ul>
          <div className="mt-14">
            <Button type="secondery">Buy Now!</Button>
          </div>
        </div>
        <figure className=" hidden w-1/2 md:flex">
          <img src={HeadPhone} alt="head phone" />
        </figure>
      </div>
    </div>
  );
};

export default Banner1;
