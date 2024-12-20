import { MoneyIcon, StoreIcon, BagIcon, DollarIcon } from "../assets/image";
import BoxWithIcon from "./BoxWithIcon";
const data = [
  { id: 0, image: StoreIcon, number: 10.5, text: "Sallers active our site" },
  { id: 1, image: DollarIcon, number: 33, text: "Mopnthly Produduct Sale" },
  { id: 2, image: BagIcon, number: 45.5, text: "Customer active in our site" },
  { id: 3, image: MoneyIcon, number: 25, text: "Anual gross sale in our site" },
];
const Number = () => {
  return (
    <div className="Container my-28">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
        {data.map((item) => (
          <BoxWithIcon
            key={item.id}
            item={item}
            hasBorder={true}
            hasHover={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Number;
