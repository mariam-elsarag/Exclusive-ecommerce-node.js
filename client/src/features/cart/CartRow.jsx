import React, { useState } from "react";
import { CiGlass } from "react-icons/ci";
import { updateCart } from "../../services/cartApi";

const CartRow = ({ cartItem, subTotal, index }) => {
  const [quantity, setQuantaty] = useState(cartItem?.quantity);

  return (
    <tr className=" table-row h-[70px] bg-white text-center shadow-lg shadow-gray-200">
      <td className="flex w-max items-center gap-2 px-3 pt-3">
        <img
          src={cartItem?.product_img}
          alt={cartItem?.product_name}
          className="h-[50px] w-[50px]"
        />
        <span className="text-sm font-normal">{cartItem?.product_name}</span>
      </td>
      <td className="min-w-[100px] px-3 text-left">{cartItem?.price}</td>
      <td className="min-w-[100px] px-3 text-left">
        <input
          className="w-[60px] rounded-md border-2 border-gray-300 px-1 py-2 focus:border-gray-300 focus:outline-none"
          type="number"
          value={quantity}
          onChange={(e) => {
            setQuantaty(e.target.value);
            updateCart(
              cartItem?.userId,
              cartItem?.productId,
              e.target.value,
              cartItem?.price,
            );
          }}
        />
      </td>

      <td className="min-w-[100px] px-3 text-left">
        {quantity * cartItem?.price}
      </td>
    </tr>
  );
};

export default CartRow;
