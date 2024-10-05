import React from "react";
import Input from "../../ui/Input";

const BillDetails = () => {
  return (
    <div className="w-full md:w-1/2">
      <Input label="First Name" inputType="text" labelId="fName" />
      <Input label="Company Name" inputType="text" labelId="cName" />
      <Input label="Street Address" inputType="text" labelId="sAddress" />
      <Input
        label="Apartment, floor, etc. (optional)"
        inputType="text"
        labelId="apartment"
      />
      <Input label="Town/City" inputType="text" labelId="town" />
      <Input label="Phone Number" inputType="phone" labelId="phone" />
      <Input label="Email Address" inputType="email" labelId="email" />
    </div>
  );
};

export default BillDetails;
