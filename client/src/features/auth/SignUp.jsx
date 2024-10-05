import { useForm } from "react-hook-form";
import Register from "./Register";
import Button from "../../ui/Button";
import { Link, useNavigate } from "react-router-dom";

import { googleIcon } from "../../assets/image";

import { signIn } from "./userSlice";
import { useDispatch } from "react-redux";
import ErrorMessage from "../../ui/ErrorMessage";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosInstance";
import { useState } from "react";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const reponse = await axiosInstance.post("/api/auth/register", data);
      if (reponse.status === 201) {
        navigate("/signIn");
        toast.success("Sign up successful!");
      }
    } catch (error) {
      console.error(error?.response?.data?.errors?.email);
      if (error?.response?.data?.errors?.phone_number) {
        setError("phone_number", {
          message: error?.response?.data?.errors?.phone_number,
        });
      }

      if (error?.response?.data?.errors?.email) {
        setError("email", {
          message: error?.response?.data?.errors?.email,
        });
      }
      if (error?.response?.data?.errors?.password) {
        setError("password", {
          message: error?.response?.data?.errors?.password,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Register>
        <h3 className="font-header text-3xl font-medium">Create an account</h3>
        <p className="mt-6 text-base font-normal">Enter your details below</p>
        <form
          className="mt-7 max-w-[95%]  lg:max-w-[60%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div>
              <input
                type="text"
                placeholder="First name"
                className="input"
                {...register("first_name", {
                  required: "First name is required",
                  maxLength: {
                    value: 50,
                    message: "first name must be less than 50 character",
                  },
                })}
              />
              {errors.first_name?.message && (
                <ErrorMessage message={errors.first_name.message} />
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last name"
                className="input"
                {...register("last_name", {
                  required: "Last name is required",
                  maxLength: {
                    value: 50,
                    message: "last name must be less than 50 character",
                  },
                })}
              />
              {errors.last_name && (
                <ErrorMessage message={errors.last_name.message} />
              )}
            </div>
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="phone number"
              className="input"
              {...register("phone_number", {
                required: "Phone number is required",
              })}
            />
            {errors?.phone_number?.message && (
              <ErrorMessage message={errors.phone_number.message} />
            )}
          </div>
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
            {errors?.email?.message && (
              <ErrorMessage message={errors.email.message} />
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{8,}$/,
                  message:
                    "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                },
              })}
            />

            {errors?.password?.message && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>
          <div className="mt-8">
            <Button loading={loading} type="fullWidthPrimary">
              Create Account
            </Button>

            <div className=" mt-8 flex items-center justify-center gap-2 text-base">
              <p className="text-black/70">Already have account?</p>
              <Link to="/signIn">Log in</Link>
            </div>
          </div>
        </form>
      </Register>
    </div>
  );
};

export default SignUp;
