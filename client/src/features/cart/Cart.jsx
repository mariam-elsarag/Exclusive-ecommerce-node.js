import { useEffect, useState } from "react";
import RowOfLinks from "../../ui/RowOfLinks";
import Table from "../../ui/Table";
import CartRow from "./CartRow";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Coupon from "./Coupon";
import CartDetails from "./CartDetails";
import useGetData from "../../hooks/useGetData";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";
const columns = [
  "Product",
  "Color",
  "Price",
  "Quantity",
  "Stock",
  "Subtotal",
  "Size",
];

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [loadingData, setLoadingData] = useState(false);
  const { data: cart, loading: isLoading } = useGetData(`/api/cart`);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (cart && cart.products) {
      calculateTotal(cart.products);
      updateOrder(cart.products);
    }
  }, [cart]);

  const handleQuantityChange = (
    updatedProductIndex,
    updatedVariantIndex,
    newQuantity,
  ) => {
    const updatedProducts = cart.products.map((product, productIndex) =>
      productIndex === updatedProductIndex
        ? {
            ...product,
            varient: product.varient.map((variant, variantIndex) =>
              variantIndex === updatedVariantIndex
                ? { ...variant, quantity: newQuantity }
                : variant,
            ),
          }
        : product,
    );

    calculateTotal(updatedProducts);
    updateOrder(updatedProducts);
  };

  const handleSizeChange = (
    updatedProductIndex,
    updatedVariantIndex,
    newSize,
  ) => {
    const updatedProducts = cart.products.map((product, productIndex) =>
      productIndex === updatedProductIndex
        ? {
            ...product,
            varient: product.varient.map((variant, variantIndex) =>
              variantIndex === updatedVariantIndex
                ? { ...variant, size: newSize }
                : variant,
            ),
          }
        : product,
    );

    updateOrder(updatedProducts);
  };

  const calculateTotal = (products) => {
    const totalPrice = products.reduce((accumulator, product) => {
      const productTotal = product.varient.reduce((sum, variant) => {
        const price = variant.offerPrice ?? product.price;
        return sum + price * (variant.quantity || 0);
      }, 0);
      return accumulator + productTotal;
    }, 0);

    setTotal(totalPrice);
  };

  const updateOrder = (products) => {
    const newOrder = products.flatMap((product) =>
      product.varient
        .filter((variant) => variant.quantity > 0)
        .map((variant) => ({
          productId: product.id,
          varient: {
            quantity: variant.quantity,
            color: variant.color,
            size: variant.size.at(0) || null,
          },
        })),
    );

    setOrder(newOrder);
  };
  const handleCheckout = async () => {
    try {
      setLoadingData(true);
      const response = await axiosInstance.post(`/api/payment/check-out`, {
        product: order,
      });
      if (response.status === 200) {
        console.log(response.data, "kk");
        window.location.href = response.data.session.url;
      }
    } catch (err) {
      if (Array.isArray(err.response?.data?.errors)) {
        err.response.data.errors.forEach((error) => {
          Object.values(error).forEach((message) => {
            toast.error(message);
          });
        });
      } else {
        toast.error(err.response.data.errors);
      }
    } finally {
      setLoadingData(false);
    }
  };
  return (
    <div>
      <RowOfLinks currentPage="cart" />
      <div className="Container mb-10 mt-3">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : cart?.products?.length === 0 ? (
          <div className="flex h-[40vh] flex-col items-center justify-center gap-8">
            <BsCartX size={90} />
            <span className="text-xl">No cart yet</span>
          </div>
        ) : (
          <div>
            <div className="d-flex w-full items-center justify-center overflow-x-auto p-3">
              <Table className="table w-full">
                <Table.Header
                  columns={columns}
                  thClassName="text-left px-3 border-b border-gray-200 py-5 min-w-[100px]"
                  headerClassName={"shadow-lg shadow-gray-200"}
                />
                <Table.Row>
                  {cart?.products?.map((product, index) =>
                    product.varient.map((variant, varIndex) => (
                      <CartRow
                        key={`${index}-${varIndex}`}
                        cartItem={product}
                        variant={variant}
                        index={index}
                        onQuantityChange={(newQuantity) =>
                          handleQuantityChange(index, varIndex, newQuantity)
                        }
                        onSizeChange={(newSize) =>
                          handleSizeChange(index, varIndex, newSize)
                        }
                      />
                    )),
                  )}
                </Table.Row>
              </Table>
            </div>
            {console.log(order, "kjk")}
            <div className="mt-12 flex flex-col gap-5 md:flex-row">
              <div className="w-full md:w-1/2">
                <Coupon />
              </div>
              <div className="flex w-full justify-end md:w-1/2">
                <div className="w-full rounded-sm border-2 border-gray-700 bg-white p-3 lg:w-[470px]">
                  <h3 className="text-[15px] font-normal">Cart Total</h3>
                  <CartDetails total={total} order={order} />
                  {order?.length > 0 && (
                    <div className="mt-5 flex items-center justify-center">
                      <Button loading={loadingData} onClick={handleCheckout}>
                        Proceed to checkout
                      </Button>
                    </div>
                  )}
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
