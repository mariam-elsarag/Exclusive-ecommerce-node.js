import shape from "../assets/Rectangle 18.png";
const Header = ({ subTitle, title }) => {
  return (
    <div className="mb-10">
      <div className="mb-5 flex items-center gap-2">
        <img src={shape} alt="shape" />
        <p className="text-base font-semibold text-primary ">{subTitle}</p>
      </div>
      <h1 className="font-header text-3xl font-semibold sm:text-4xl">
        {title}
      </h1>
    </div>
  );
};

export default Header;
