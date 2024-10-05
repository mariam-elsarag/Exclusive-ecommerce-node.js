import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getCarts } from "../../services/cartApi";
import Spinner from "../../ui/Spinner";
import Coupon from "../cart/Coupon";
import CartDetails from "../cart/CartDetails";
import Button from "../../ui/Button";

const PayDetails = () => {
  const [total, setTotal] = useState();
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCarts,
  });
  // set cart size to reducer
  useEffect(() => {
    let totalPrice = 0;
    if (cart && cart.length > 0) {
      // Calculate total price
      totalPrice = cart.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0,
      );
    }
    setTotal(totalPrice);
  }, [cart]);
  return (
    <div className="w-full md:w-1/2">
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <ul className="px-0">
            {cart?.map((item, index) => (
              <li
                key={index}
                className="mb-5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-x-3">
                  <img
                    className="w-[50px]"
                    src={item?.product_img}
                    alt={item?.product_name}
                  />
                  <span className="font-thing text-sm">
                    {item?.product_name}
                  </span>
                </div>
                <span>{item?.subtotal}</span>
              </li>
            ))}
          </ul>
          <CartDetails total={total} />
          <div className="my-3 flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="payment"
                id="bank"
                className="h-[18px] w-[18px] p-5 accent-black"
              />
              <label htmlFor="bank">Bank</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                className="h-[18px] w-[18px] p-5 accent-black"
                name="payment"
                id="cash"
              />
              <label htmlFor="cash">Cash on delivery</label>
            </div>
          </div>
          <Coupon />
          <div className="mt-5">
            <Button type="primarySmall"> Place Order</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayDetails;
