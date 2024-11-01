import React from "react";

const ListItems = ({ item }) => {
  return (
    <li className="cursor-pointer text-base font-normal transition-colors duration-150 hover:text-primary">
      {item?.title}
    </li>
  );
};

export default ListItems;
