import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const Button = ({
  children,
  type = "primary",
  to,
  onClick,
  as = "submit",
  loading,
  className,
}) => {
  const base =
    "  disabled:bg-buttonHover flex items-center justify-center gap-2 text-center transition-colors duration-300 w-fit focus:outline-none rounded-[4px]  text-base capitalize";
  const colored = " hover:bg-buttonHover bg-primary text-White";
  const greenColored =
    " hover:bg-[#00FF66]/80 bg-[#00FF66] text-White px-12 py-4 ";
  const styles = {
    primary: base + colored + " px-12 py-4 ",
    outline:
      base +
      " px-12 py-4  border border-gray-500 bg-transparent text-black hover:border-[#A0BCE0] ",
    fullWidthPrimary: base + colored + " w-full mb-4 py-4 ",
    secondery: base + greenColored + " px-12",
    primarySmall: base + colored + " py-3 px-5 text-sm ",
  };
  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={as}
      onClick={onClick}
      disabled={loading}
      className={`${styles[type]} ${className}`}
    >
      {loading && <Spinner className="!h-5 !w-5" />}
      {children}
    </button>
  );
};

export default Button;
