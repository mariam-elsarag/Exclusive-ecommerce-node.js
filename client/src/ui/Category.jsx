import {
  CategoryCamera,
  CategoryComputer,
  CategoryGamePad,
  CategoryHeadphone,
  CategoryPhone,
  CategoryWatch,
} from "../assets/image";
import Header from "./Header";
const category = [
  { id: 0, title: "Phone", image: CategoryPhone },
  { id: 1, title: "Computers", image: CategoryComputer },
  { id: 2, title: "SmartWatch", image: CategoryWatch },
  { id: 3, title: "Camera", image: CategoryCamera },
  { id: 4, title: "HeadPhones", image: CategoryHeadphone },
  { id: 5, title: "Gaming", image: CategoryGamePad },
];
const Category = () => {
  return (
    <div className="Container my-20">
      <div className="border-b pb-14">
        <Header title="Browse By Category" subTitle="Categories" />
        <div className="  grid grid-cols-2 gap-7 sm:grid-cols-3 lg:grid-cols-6 ">
          {category.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col items-center justify-center gap-4 rounded border border-black/30 py-6 transition-none duration-300 hover:border-primary"
            >
              <img src={item.image} alt="phone" />
              <span className="text-base font-normal transition-colors duration-300 group-hover:text-primary">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
