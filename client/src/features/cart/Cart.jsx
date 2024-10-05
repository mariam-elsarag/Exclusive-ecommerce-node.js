import { useQuery } from "@tanstack/react-query";
import RowOfLinks from "../../ui/RowOfLinks";
import Table from "../../ui/Table";
import { getCarts } from "../../services/cartApi";
import CartRow from "./CartRow";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";

import Button from "../../ui/Button";
import Coupon from "./Coupon";
import CartDetails from "./CartDetails";
const columns = ["Product", "Price", "Quantity", "Subtotal"];
const Cart = () => {
  const [total, setTotal] = useState(0);

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
    <div>
      <RowOfLinks currentPage="cart" />
      <div className="Container my-3">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div>
            <div className=" d-flex w-full items-center justify-center overflow-x-auto p-3">
              <Table className="table w-full ">
                <Table.Header
                  columns={columns}
                  thClassName="text-left px-3 border-b border-gray-200  py-5 min-w-[100px] "
                  headerClassName={"  shadow-lg shadow-gray-200"}
                />
                <Table.Row>
                  {cart?.map((cartItem, index) => (
                    <CartRow key={index} cartItem={cartItem} index={index} />
                  ))}
                </Table.Row>
              </Table>
            </div>
            <div className="mt-12 flex flex-col gap-5 md:flex-row">
              <div className="w-full md:w-1/2">
                <Coupon />
              </div>
              <div className="w-full md:w-1/2 ">
                <div className="w-full rounded-sm border-2 border-gray-700 bg-white p-3 lg:w-[470px]">
                  <h3 className="text-[15px] font-normal">Cart Total</h3>
                  <CartDetails total={total} />
                  <div className="mt-5 flex items-center justify-center">
                    <Button to="/checkout">Procees to checkout</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
