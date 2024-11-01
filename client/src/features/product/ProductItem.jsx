import { Link } from "react-router-dom";
import { CiHeart, AiOutlineEye } from "../../icon";

import { addToCart } from "../../services/cartApi";

import { v4 as uuidv4 } from "uuid";
import { useApp } from "../../Context/AppContext";
const ProductItem = ({ product }) => {
  console.log(product, "kjkj");
  const { image, title, price, discount, isNew } = product;
  const discountPrice = discount > 0 ? price - (price * discount) / 100 : 0;
  const { user } = useApp();
  return (
    <div className="felx flex-col">
      <figure className="group relative ">
        <figure className=" relative flex h-[250px] flex-col items-center justify-center bg-[#F5F5F5]">
          <img src={image} alt={title} />
          {!user ? (
            <Link
              className="invisible absolute bottom-0 w-full bg-black py-2 text-center text-White transition-all duration-200 ease-in-out group-hover:visible"
              to="/signup"
            >
              Add to cart
            </Link>
          ) : (
            <button
              onClick={() =>
                addToCart({
                  price: price,
                  product_img: image,
                  product_name: title,
                  quantity: 1,
                  subtotal: price * 1,
                  userId: auth?.currentUser?.uid,
                  productId: uuidv4(),
                })
              }
              className="invisible absolute bottom-0 w-full bg-black py-2 text-center text-White transition-all duration-200 ease-in-out group-hover:visible"
            >
              Add to cart
            </button>
          )}
        </figure>
        {isNew && (
          <span className="absolute left-4 top-4 rounded-sm bg-primary px-2 py-1 text-White">
            New
          </span>
        )}
        <ul className="invisible absolute right-4 top-4 flex flex-col gap-3 transition-all duration-200 ease-in-out group-hover:visible">
          <li className="cursor-pointer rounded-full bg-white p-[5px]">
            <CiHeart size={20} />
          </li>
          <li className="cursor-pointer rounded-full bg-white p-[5px] ">
            <AiOutlineEye size={20} />
          </li>
        </ul>
      </figure>
      <div className="mt-4 flex flex-col gap-2">
        <h3>{title}</h3>
        <div className="flex items-center gap-3">
          <span className="text-primary">${price}</span>
          {discount > 0 && (
            <span className="text-black/50 line-through  ">
              ${discountPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
