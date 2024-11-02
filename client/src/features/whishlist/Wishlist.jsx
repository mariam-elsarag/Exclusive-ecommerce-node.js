import React from "react";
import Button from "../../ui/Button";
import ProductItem from "../product/ProductItem";

import usePaginatedData from "../../hooks/usePaginatedData";
import Pagination from "../../components/Pagination";
import Spinner from "./../../ui/Spinner";
import { LiaHeartBrokenSolid } from "react-icons/lia";
const Wishlist = () => {
  const { data, next, prev, handleNext, handlePrev, loading } =
    usePaginatedData(`/api/product/favorite/`);

  if (loading)
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="Container my-8 flex flex-col gap-5">
      {/* header */}
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-[20px] font-normal">
          Wishlist <span>({data?.length})</span>{" "}
        </h1>
      </header>
      {/* body */}
      {data?.length === 0 ? (
        <div className="flex h-[40vh] flex-col items-center justify-center gap-3">
          <LiaHeartBrokenSolid size={150} color="black" />
          <span className="text-xl text-black">No favorite yet</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.map((item, index) => (
              <ProductItem
                key={index}
                product={item?.product}
                fav={item?.favorite}
              />
            ))}
          </div>
          <Pagination
            next={next}
            prev={prev}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </>
      )}
    </div>
  );
};

export default Wishlist;
