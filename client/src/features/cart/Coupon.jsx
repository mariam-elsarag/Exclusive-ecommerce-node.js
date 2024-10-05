import Button from "../../ui/Button";

const Coupon = () => {
  return (
    <div className="flex w-full items-start gap-2">
      <input
        type="text"
        placeholder="Coupon Code"
        className="w-1/2 border-2 border-gray-400 px-2 py-2  "
      />
      <Button type="primarySmall">Apply Coupon</Button>
    </div>
  );
};

export default Coupon;
