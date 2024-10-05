import React from "react";

const CartDetails = ({ total }) => {
  return (
    <ul className="mt-4 px-0">
      <li className="flex items-center justify-between gap-2 border-b border-gray-400 py-2">
        <span className="text-sm">Total:</span>
        <span className="text-sm text-gray-500">{total}</span>
      </li>
      <li className="flex items-center justify-between gap-2 border-b border-gray-400 py-2">
        <span className="text-sm">Shipping:</span>
        <span className="text-sm text-gray-500">free</span>
      </li>
      <li className="flex items-center justify-between gap-2  py-2">
        <span className="text-sm">Total:</span>
        <span className="text-sm">{total}</span>
      </li>
    </ul>
  );
};

export default CartDetails;
