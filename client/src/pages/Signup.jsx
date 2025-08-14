import { RadioGroup } from "../components/ui/radio-group";
import Navbar from "../components/user/Navbar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSignup } from "@/hooks/useSignup";


const Signup = () => {


  const navigate = useNavigate();
  const { signup, isLoading } = useSignup();


  const [input, setInput] = useState({
    username: "",
    email: "",
    phone: null,
    password: "",
    confirmPassword: "",
    role: "",
    file: null,
  });

  const onChangeValueController = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fileHandler = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.password !== input.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    signup(
      {
        username: input.username,
        email: input.email,
        phone: input.phone,
        role: input.role,
        password: input.password,
        file: input.file,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Signup successful");
          navigate("/login");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "Signup failed");
        },
      }
    );
  };



  return (
    <div>
      <Navbar />
      <div className="flex items-center bg-slate-200 justify-center mx-auto max-w-7xl p-2">
        <form
          onSubmit={handleSubmit}
          className="w-[90%] md:w-1/2 bg-white border border-gray-200 rounded-md p-4 my-8"
        >
          <h1 className="font-bold text-2xl mb-5">Sign Up</h1>

          <div className="my-2">
            <Label className="my-1">Full Name</Label>
            <Input
              name="username"
              value={input?.username}
              onChange={onChangeValueController}
              type="text"
              placeholder="Enter Name"
              required
            />
          </div>

          <div className="my-2">
            <Label className="my-1">Email</Label>
            <Input
              value={input.email}
              onChange={onChangeValueController}
              name="email"
              type="email"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="my-2">
            <Label className="my-1">Phone Number</Label>
            <Input
              value={input.phone}
              onChange={onChangeValueController}
              name="phone"
              type="number"
              placeholder="Enter Phone Number"
              required
            />
          </div>

          <div className="my-2">
            <Label className="my-2">Password</Label>
            <Input
              value={input.password}
              onChange={onChangeValueController}
              name="password"
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="my-2">
            <Label className="my-2">Confirm Password</Label>
            <Input
              value={input.confirmPassword}
              onChange={onChangeValueController}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            <RadioGroup className="flex items-center gap-4 my-4">
              {["user", "shop"].map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <input
                    checked={input.role === role}
                    onChange={onChangeValueController}
                    type="radio"
                    name="role"
                    id={role}
                    value={role}
                    className="cursor-pointer"
                    required
                  />
                  <Label className="text-orange-700" htmlFor={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex items-center gap-1">
              <Label className="my-1">Profile</Label>
              <input
                onChange={fileHandler}
                type="file"
                accept="image/*"
                className="p-1 rounded-md px-3 bg-slate-50 border-dashed border-blue-500 cursor-pointer text-xs border"
              />
            </div>
          </div>

          {isLoading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="animate-spin mr-2" /> Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}

          <span className="text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:underline font-semibold text-blue-700"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
