import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/user/Navbar";
import { Button } from "../components/ui/button";
import { RadioGroup } from "../components/ui/radio-group";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useLogin } from "@/hooks/UseLogin";

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, isError, error } = useLogin();


  const [input, setInput] = useState({
    email: "shop@gmail.com",
    password: "Shop@123",
    role: "",
  });

  const onChangeValueController = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(input, {
      onSuccess: (res) => {
        toast.success("Login successful");

        if (res?.user?.role === "user") {
          navigate("/");
        } else {
          navigate("/shop")
        }

      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Login failed");
      },
    });
  };


  return (
    <div>
      <Navbar />
      <div className="flex items-center bg-gray-200 justify-center mx-auto max-w-7xl h-[100vh]">
        <form
          onSubmit={handleSubmit}
          className="w-[90%] md:w-1/2 border bg-white border-gray-200 rounded-md p-4 my-8"
        >
          <h1 className="font-bold text-xl mb-2">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              value={input.email}
              onChange={onChangeValueController}
              name="email"
              type="email"
              placeholder="Enter Email"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              value={input?.password}
              onChange={onChangeValueController}
              name="password"
              type="password"
              placeholder="Enter Password"
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <RadioGroup className="flex items-center gap-4 my-4">
              {["user", "admin", "shop"].map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <input
                    checked={input.role === role}
                    onChange={onChangeValueController}
                    type="radio"
                    name="role"
                    id={role}
                    value={role}
                    className="cursor-pointer"
                  />
                  <Label className="text-orange-700" htmlFor={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {isLoading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          {isError && (
            <p className="text-red-600 text-xs">
              {error?.response?.data?.message || "Something went wrong"}
            </p>
          )}

          <span className="text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="hover:underline font-semibold text-blue-700"
            >
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
