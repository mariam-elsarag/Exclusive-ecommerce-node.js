import React from "react";
import RowOfLinks from "../../ui/RowOfLinks";
import BillDetails from "./BillDetails";
import PayDetails from "./PayDetails";

const Checkout = () => {
  return (
    <div>
      <RowOfLinks currentPage="CheckOut" />
      <div className="Container">
        <h1 className="text-[25px]">Billing Details</h1>
        <div className="mt-4 flex items-start gap-16">
          <BillDetails />
          <PayDetails />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
