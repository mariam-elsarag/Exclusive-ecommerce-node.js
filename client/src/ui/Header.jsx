import { Shape } from "../assets/image";

const Header = ({ subTitle, title }) => {
  return (
    <div className="mb-10">
      <div className="mb-5 flex items-center gap-2">
        <img src={Shape} alt="shape" />
        <p className="text-base font-semibold text-primary ">{subTitle}</p>
      </div>
      <h1 className="font-header text-2xl font-semibold sm:text-3xl">
        {title}
      </h1>
    </div>
  );
};

export default Header;
