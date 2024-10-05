import { createContext, useContext, useEffect, useState } from "react";
import Header from "../../ui/Header";
import ProductItem from "./ProductItem";
import Button from "../../ui/Button";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productApi";
import Spinner from "../../ui/Spinner";
const ProductContext = createContext();
const RowOfProduct = ({ status, children }) => {
  // const { data: product, isLoading } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: getProducts,
  // });
  // const [data, setData] = useState();
  // useEffect(() => {
  //   const filterData = product?.filter((items) => items.status === status);
  //   setData(filterData);
  // }, [product, status]);
  const data = [];
  const product = [];
  return (
    <ProductContext.Provider value={{ data, isLoading }}>
      <div className="Container my-20 ">{children}</div>
    </ProductContext.Provider>
  );
};
function Title({ title, subTitle }) {
  return <Header subTitle={subTitle} title={title} />;
}
function Data() {
  const { data, isLoading } = useContext(ProductContext);
  return (
    <>
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="border-b pb-14">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.map((item, index) => (
              <ProductItem key={index} product={item} />
            ))}
          </div>
          <div className="mt-16 flex items-center justify-center">
            <Button to="/product">View All Products</Button>
          </div>
        </div>
      )}
    </>
  );
}
RowOfProduct.Title = Title;
RowOfProduct.Data = Data;
export default RowOfProduct;
