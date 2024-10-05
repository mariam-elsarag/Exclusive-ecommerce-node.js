import { useForm } from "react-hook-form";
import Register from "./Register";
import Button from "../../ui/Button";

import { Link, useNavigate } from "react-router-dom";

import { signIn } from "./userSlice";
import { useDispatch } from "react-redux";
import { googleIcon } from "../../assets/image";
import { toast } from "react-toastify";
import ErrorMessage from "../../ui/ErrorMessage";
import axiosInstance from "../../axiosInstance";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await axiosInstance.post("/api/auth/register");
      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      console.log("Error caught:", error.code);
      toast.error("Password or email is invalid", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
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
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
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
