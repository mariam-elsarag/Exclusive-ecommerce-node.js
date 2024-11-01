const Register = ({ children }) => {
  return (
    <div className="flex items-center justify-center gap-x-10  py-11 md:items-start md:justify-normal lg:items-center lg:gap-x-20">
      <div className="hidden w-1/2 md:inline-flex xl:w-[600px]">
        <img
          className="w-full object-cover"
          src={Register}
          alt="register picture"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 md:px-0">
        {children}
      </div>
    </div>
  );
};

export default Register;
