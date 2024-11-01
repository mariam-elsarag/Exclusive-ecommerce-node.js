import {
  CustomerServiceIcon,
  DeliveryIcon,
  SecurityIcon,
} from "../assets/image";
import BoxWithIcon from "./BoxWithIcon";
const data = [
  {
    id: 0,
    image: DeliveryIcon,
    number: "FREE AND FAST DELIVERY",
    text: "Free delivery for all orders over $140",
  },
  {
    id: 1,
    image: CustomerServiceIcon,
    number: "24/7 CUSTOMER SERVICE",
    text: "Friendly 24/7 customer support",
  },
  {
    id: 2,
    image: SecurityIcon,
    number: "MONEY BACK GUARANTEE",
    text: "We reurn money within 30 days",
  },
];
const Services = () => {
  return (
    <div className="Container my-28">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3  ">
        {data.map((item) => (
          <BoxWithIcon key={item.id} item={item} size="text-base" />
        ))}
      </div>
    </div>
  );
};

export default Services;
