import React, { useState } from "react";

const CartRow = ({
  cartItem,
  variant,
  index,
  onQuantityChange,
  onSizeChange,
}) => {
  const [quantity, setQuantity] = useState(variant.quantity || 0);
  const [selectedSize, setSelectedSize] = useState(
    variant.size || variant.sizes?.[0] || "",
  );

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value) || 0;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    onSizeChange(size);
  };

  const price = variant.offerPrice ?? cartItem.price ?? 0;
  const subtotal = price * quantity;

  return (
    <tr className="table-row h-[70px] bg-white text-center shadow-lg shadow-gray-200">
      <td className="flex w-max items-center gap-2 px-3 pt-3">
        <img
          src={cartItem?.thumbnail}
          alt={cartItem?.title}
          className="h-[50px] w-[50px]"
        />
        <span className="text-sm font-normal">{cartItem?.title}</span>
      </td>

      <td className="min-w-[100px] px-3 text-left">{variant.color}</td>

      <td className="min-w-[100px] px-3 text-left">{price.toFixed(2)}</td>

      <td className="min-w-[100px] px-3 text-left">
        <input
          className="w-[60px] rounded-md border-2 border-gray-300 px-1 py-2 focus:border-gray-300 focus:outline-none"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </td>

      <td className="min-w-[100px] px-3 text-left">{variant.stock}</td>

      <td className="min-w-[100px] px-3 text-left">{subtotal.toFixed(2)}</td>

      <td className="min-w-[150px] px-3 text-left">
        {variant.size && variant.size.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {variant.size.map((size, i) => (
              <label key={i} className="flex items-center gap-1">
                <input
                  type="radio"
                  name={`size-${index}`}
                  value={size}
                  checked={selectedSize === size}
                  onChange={() => handleSizeChange(size)}
                />
                {size}
              </label>
            ))}
          </div>
        ) : (
          "-"
        )}
      </td>
    </tr>
  );
};

export default CartRow;
