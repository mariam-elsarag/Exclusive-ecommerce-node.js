import Pagination from "../components/Pagination";

import usePaginatedData from "../hooks/usePaginatedData";
import Header from "./Header";

const Category = () => {
  const { data, next, prev, handleNext, handlePrev } =
    usePaginatedData(`/api/category/all`);
  return (
    <div className="Container my-20">
      <div className="border-b pb-14">
        <div className="flex items-center justify-between">
          <Header title="Browse By Category" subTitle="Categories" />
          <Pagination
            next={next}
            prev={prev}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </div>
        <div className="  grid grid-cols-2 gap-7 sm:grid-cols-3 lg:grid-cols-6 ">
          {data?.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col items-center justify-center gap-4 rounded border border-black/30 py-6 transition-none duration-300 hover:border-primary"
            >
              <img src={item.icon} alt="phone" className="h-[56px] w-[56px]" />
              <span className="text-base font-normal transition-colors duration-300 group-hover:text-primary">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
