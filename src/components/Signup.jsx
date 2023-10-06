import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login as storeLogin } from "../store/authSlice";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";

const Signup = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const createAccount = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUSer();
        if (userData) dispatch(storeLogin(userData));
      }
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className=" flex items-center justify-center w-full">
      <div
        className={` mx-auto w-full max-w-lg  bg-gray-100  rounded-xl p-10  border  border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className=" inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className=" text-center text-2xl font-bold leading-tight">
          Sign up to Create account
        </h2>
        <p>
          Already have an account?&nbsp;
          <Link
            to="/login"
            className=" font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign in
          </Link>
        </p>
        {error && <p className=" text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit(createAccount)} className=" mt-8">
          <div className=" space-y-5">
            <Input
              label="Full Name:"
              placeholder="Enter your name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password:"
              placeholder="enter password"
              type="password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
