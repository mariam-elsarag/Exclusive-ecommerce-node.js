import { Link } from "react-router-dom";
import Header from "./Header";
import useGetData from "../hooks/useGetData";
import { truncateText } from "../utils/helper";

const NewArrive = () => {
  const { data } = useGetData("/api/product/new-arrival");

  if (!data?.products || data.products.length === 0) {
    return null;
  }

  return (
    <div className="Container my-20">
      <Header title="New Arrival" subTitle="Featured" />
      <div className="flex flex-wrap items-start gap-8 overflow-x-hidden md:flex-nowrap">
        {/* First product - large layout */}
        {data.products.slice(0, 1).map((item) => (
          <figure key={item.id} className="relative w-full md:w-1/2">
            <div className="relative">
              <img
                className="w-screen"
                src={item.thumbnail}
                alt={item.title || "Product"}
              />
              <div className="absolute inset-0 rounded-lg bg-black/40">
                <div className="absolute bottom-4 left-4 flex w-[250px] flex-col gap-3 text-white">
                  <h4 className="font-header text-2xl font-semibold">
                    {item.title}
                  </h4>
                  <p className="text-sm font-normal text-white/90">
                    {item.description}
                  </p>
                  <Link
                    to={`/product/${item.id}`}
                    className="text-white underline underline-offset-2"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </figure>
        ))}

        {data.products.slice(1, 2).map((item) => (
          <figure key={item.id} className="flex w-full flex-col gap-8 md:w-1/2">
            <div className="relative">
              <img
                src={item.thumbnail}
                alt={item.title || "Product"}
                className="h-[284px] w-full object-cover object-center"
              />
              <div className="absolute inset-0 rounded-lg bg-black/40">
                <div className="absolute bottom-4 left-4 flex w-[250px] flex-col gap-3 text-white">
                  <h4 className="font-header text-lg font-semibold">
                    {item.title}
                  </h4>
                  <p className="text-sm font-normal text-white/80">
                    {truncateText(item.description, 70)}
                  </p>
                  <Link
                    to={`/product/${item.id}`}
                    className="text-white underline underline-offset-2"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </figure>
        ))}

        {data.products.slice(2, 4).map((item) => (
          <div
            key={item.id}
            className="flex w-full flex-wrap items-center gap-8 sm:flex-nowrap md:w-1/2"
          >
            <div className="relative w-full sm:w-1/2">
              <img
                src={item.thumbnail}
                alt={item.title || "Product"}
                className="h-[284px] w-screen object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 flex w-[250px] flex-col gap-2 text-white">
                <h4 className="font-header text-lg font-semibold">
                  {item.title}
                </h4>
                <p className="text-sm font-normal text-white/80">
                  {truncateText(item.description, 70)}
                </p>
                <Link
                  to={`/product/${item.id}`}
                  className="text-white underline underline-offset-2"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrive;
