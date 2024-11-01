import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Button from "./Button";

import { toast } from "react-toastify";

import { useApp } from "../Context/AppContext";
import axiosInstance from "../axiosInstance";
const ContactForm = () => {
  const { user } = useApp();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      user: user,
      email: "",
      phone_number: null,
      message: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/api/contact", data);
      if (response.status === 201) {
        toast.success("Message has been submitted");
      }
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed to send a message. Please try again later.");
    }
  };
  return (
    <form
      className="flex w-full flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1  gap-4 lg:grid-cols-3">
        <div>
          <input
            type="text"
            placeholder="Your name"
            className="w-full bg-[#F5F5F5] px-2 py-3 outline-none placeholder:text-black/50  "
            {...register("user", {
              required: "Your name is required",
              minLength: {
                value: 4,
                message: "Your name must be at least 4 characters",
              },
            })}
          />
          {errors.userName && (
            <ErrorMessage message={errors.userName.message} />
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-[#F5F5F5] px-2 py-3 outline-none placeholder:text-black/50 "
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
        <div>
          <input
            type="text"
            className="w-full bg-[#F5F5F5] px-2 py-3 outline-none placeholder:text-black/50 "
            placeholder="Your phone"
            {...register("phone_number", {
              required: "Phone number is required",
              pattern: {
                value: /^(011|010|012)\d{8}$/,
                message: "You Ente invalid number",
              },
            })}
          />
          {errors.phone_number && (
            <ErrorMessage message={errors.phone_number.message} />
          )}
        </div>
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          className="h-[207px] w-full resize-none bg-[#F5F5F5] p-3 focus:outline-none"
          {...register("message", {
            required: "You must add message ",
            minLength: {
              value: 4,
              message: "Your message must be at least 4 characters",
            },
          })}
        ></textarea>
        {errors.message && <ErrorMessage message={errors.message.message} />}
      </div>
      <div className=" ml-auto mt-8">
        <Button type="primary">Send Massage</Button>
      </div>
    </form>
  );
};

export default ContactForm;
