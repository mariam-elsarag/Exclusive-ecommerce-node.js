import { Link } from "react-router-dom";
import Button from "../ui/Button";
import RowOfLinks from "../ui/RowOfLinks";

const NotFound = () => {
  return (
    <div>
      <RowOfLinks currentPage="not found" />

      <div className=" Container my-20 flex flex-col items-center justify-center  ">
        <div className="mb-10 flex flex-col items-center justify-center">
          <h1 className="text-center font-header text-[35px] tracking-[3.3px] sm:text-[70px] lg:text-[110px] ">
            404 Not Found
          </h1>
          <p className="mt-2 text-center text-base ">
            Your visited page not found. You may go home page.
          </p>
        </div>
        <Button type="primary" to="/home">
          Back to home page
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
