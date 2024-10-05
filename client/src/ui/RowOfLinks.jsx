import { Link } from "react-router-dom";

const RowOfLinks = ({ currentPage }) => {
  return (
    <div className="Container mt-14">
      <div className="mb-10 space-x-2">
        <Link to="/home" className="text-black/50">
          Home /
        </Link>
        <Link className="cursor-pointer capitalize" to={`/${currentPage}`}>
          {currentPage}
        </Link>
      </div>
    </div>
  );
};

export default RowOfLinks;
