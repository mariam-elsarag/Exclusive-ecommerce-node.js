import { Link } from "react-router-dom";
import { CiHeart, AiOutlineEye } from "../../icon";
import { IoIosHeart } from "react-icons/io";
import { useApp } from "../../Context/AppContext";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";
const ProductItem = ({ product, fav }) => {
  const { token } = useApp();
  console.log(product, "kjkj");
  const {
    productId,
    thumbnail,
    title,
    price,
    offer_percentage,
    offer_price,
    is_new,
    favorite,
  } = product;
  const [like, setLike] = useState(fav ? fav : favorite);
  const addToCart = async (id) => {
    if (token) {
      try {
        const response = await axiosInstance.put(`/api/cart/${id}`);

        if (response.status === 200) {
          toast.success(response.data.message);
        }
      } catch (err) {
        console.log("error", err);
      }
    } else {
      toast.info("Sign in first to add product to cart");
    }
  };
  const addToFavorite = async (id) => {
    if (token) {
      setLike((pre) => !pre);
      try {
        const response = await axiosInstance.patch(
          `/api/product/${id}/favorite`,
        );

        if (response.status === 200) {
          toast.success(response.data.message);
        }
      } catch (err) {
        console.log("error", err);
      }
    } else {
      toast.info("Sign in first to add product to cart");
    }
  };

  return (
    <div className="felx flex-col">
      <figure className="group relative ">
        <figure className=" relative flex h-[250px] flex-col items-center justify-center bg-[#F5F5F5]">
          <img
            src={thumbnail}
            alt={title}
            className="h-[250px] w-full object-cover object-center"
          />

          <button
            onClick={() => addToCart(productId)}
            className="invisible absolute bottom-0 w-full bg-black py-2 text-center text-White transition-all duration-200 ease-in-out group-hover:visible"
          >
            Add to cart
          </button>
        </figure>
        {is_new && (
          <span className="absolute left-4 top-4 rounded-sm bg-primary px-2 py-1 text-White">
            New
          </span>
        )}
        <ul className="invisible absolute right-4 top-4 flex flex-col gap-3 transition-all duration-200 ease-in-out group-hover:visible">
          <li
            onClick={() => addToFavorite(productId)}
            className="cursor-pointer rounded-full bg-white p-[5px]"
          >
            {like ? (
              <IoIosHeart size={20} color="#d30909" />
            ) : (
              <CiHeart size={20} />
            )}
          </li>
          <li className="cursor-pointer rounded-full bg-white p-[5px] ">
            <AiOutlineEye size={20} />
          </li>
        </ul>
      </figure>
      <div className="mt-4 flex flex-col gap-2">
        <h3>{title}</h3>
        <div className="flex items-center gap-3">
          <span className="text-primary">
            ${offer_price ? offer_price : price}
          </span>
          {offer_percentage > 0 && (
            <span className="text-black/50 line-through  ">${price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
