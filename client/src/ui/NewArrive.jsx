import { Link } from "react-router-dom";
import {
  newArrive1,
  newArrive2,
  newArrive3,
  newArrive4,
} from "../assets/image";
import Header from "./Header";
const NewArrive = () => {
  return (
    <div className="Container my-20">
      <Header title="New Arrival" subTitle="Featured" />
      <div className=" flex flex-wrap items-start gap-8  overflow-x-hidden md:flex-nowrap ">
        <figure className="w-full md:w-1/2">
          <div className="relative">
            <img className="w-screen" src={newArrive1} alt="play station" />
            <div className="absolute bottom-4 left-4 flex w-[250px] flex-col gap-3 text-White ">
              <h4 className="font-header text-2xl font-semibold">
                PlayStation 5
              </h4>
              <p className="text-sm font-normal text-White/80">
                Black and White version of the PS5 coming out on sale.
              </p>
              <Link className="text-white underline underline-offset-2">
                Shop Now
              </Link>
            </div>
          </div>
        </figure>
        <figure className="flex w-full flex-col gap-8 md:w-1/2">
          <div>
            <div className="relative">
              <img className="w-screen" src={newArrive2} alt="play station" />
              <div className="absolute bottom-4 left-4 flex w-[250px] flex-col gap-3 text-White ">
                <h4 className="font-header text-2xl font-semibold">
                  Women’s Collections
                </h4>
                <p className="text-sm font-normal text-White/80">
                  Featured woman collections that give you another vibe.
                </p>
                <Link className="text-white underline underline-offset-2">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-8 sm:flex-nowrap">
            <div className="relative w-full sm:w-1/2">
              <img className="w-screen" src={newArrive3} alt="play station" />
              <div className="absolute bottom-4 left-4 flex w-[250px] flex-col gap-2 text-White ">
                <h4 className="font-header text-2xl font-semibold">Speakers</h4>
                <p className="text-sm font-normal text-White/80">
                  Amazon wireless speakers
                </p>
                <Link className="text-white underline underline-offset-2">
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="relative w-full sm:w-1/2">
              <img className="w-screen" src={newArrive4} alt="play station" />
              <div className="absolute bottom-4 left-4 flex w-[250px] flex-col gap-2 text-White ">
                <h4 className="font-header text-2xl font-semibold">Perfume</h4>
                <p className="text-sm font-normal text-White/80">
                  GUCCI INTENSE OUD EDP
                </p>
                <Link className="text-white underline underline-offset-2">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
};

export default NewArrive;
