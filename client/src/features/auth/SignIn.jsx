import { useForm } from "react-hook-form";
import Register from "./Register";
import Button from "../../ui/Button";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { googleIcon } from "../../assets/image";
import { toast } from "react-toastify";
import ErrorMessage from "../../ui/ErrorMessage";
import axiosInstance from "../../axiosInstance";
import { useApp } from "../../Context/AppContext";
import Cookies from "js-cookie";
const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", data);
      if (response.status === 200) {
        login(response.data.token, response.data.user.full_name);
        toast.success("Login successful!");
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response.data.errors);
      console.log("Error caught:", error);
    }
  };

  return (
    <div>
      <Register>
        <h3 className="font-header text-3xl font-medium">
          Log in to Exclusive
        </h3>
        <p className="mt-6 text-base font-normal">Enter your details below</p>
        <form
          className="mt-7 max-w-[95%]  lg:max-w-[60%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email or phone number"
              className="input"
              {...register("query", {
                required: "This field is required",
              })}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", {
                required: "this is required",
              })}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>
          <div className=" mt-8 flex w-full items-center justify-between  text-base">
            <Button type="fullWidthPrimary" className="!h-[56px] !w-[140px]">
              Log In
            </Button>
            <Link className="text-sm text-primary" to="/forget-password">
              Forget Password?
            </Link>
          </div>
        </form>
      </Register>
    </div>
  );
};

export default SignIn;
