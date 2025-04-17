
import { RadioGroup } from "../components/ui/radio-group";
import Navbar from "../components/user/Navbar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";


const Signup = () => {

  const navigate = useNavigate();
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const onChangeValueController = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const fileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("role", input.role)
    formData.append("password", input.password)

    if (input.file) {
      formData.append("file", input.file)
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      if (res?.data?.success) {
        navigate("/login")
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-7xl p-2">
        <form onSubmit={handleSubmit} className="w-[90%] md:w-1/2 border border-gray-200 rounded-md p-4 my-8">
          <h1 className="font-bold text-2xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label className={"my-1"}>Full Name</Label>
            <Input name="fullName" value={input.fullName} onChange={onChangeValueController} type="text" placeholder="Enter Name" />
          </div>

          <div className="my-2">
            <Label className={"my-1"}>Email</Label>
            <Input value={input.email} onChange={onChangeValueController} name="email" type="email" placeholder="Enter Email" />
          </div>

          <div className="my-2">
            <Label className={"my-1"}>Phone Number</Label>
            <Input value={input.phoneNumber} onChange={onChangeValueController} name="phoneNumber" type="number" placeholder="Enter Phone Number" />
          </div>

          <div className="my-2">
            <Label className={"my-2"}>Password</Label>
            <Input value={input.password} onChange={onChangeValueController} name="password" type="password" placeholder="Enter Password" />
          </div>

          <div className="my-2">
            <Label className={"my-2"}>Confirm Password</Label>
            <Input value={input.password} onChange={onChangeValueController} name="confirmPassword" type="password" placeholder="Confirm Password" />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            <RadioGroup className="flex items-center gap-4 my-4">
              <div className="flex items-center space-x-2">
                <input checked={input.role === "user"} onChange={onChangeValueController} type="radio" name="role" id="r1" value={"user"} className="cursor-pointer" />
                <Label className={"text-orange-700"} htmlFor="r1">User</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input checked={input.role === "admin"} onChange={onChangeValueController} type="radio" name="role" id="r2" value={"admin"} className="cursor-pointer" />
                <Label className={"text-orange-700"} htmlFor="r2">Admin</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input checked={input.role === "shop"} onChange={onChangeValueController} type="radio" name="role" id="r2" value={"shop"} className="cursor-pointer" />
                <Label className={"text-orange-700"} htmlFor="r2">Shop</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-1">
              <Label className={"my-1"}>Profile</Label>
              <input onChange={fileHandler} type="file" accept="image/*" className="p-1 rounded-md px-3 bg-slate-50 border-dashed border-blue-500 cursor-pointer text-xs border" />
            </div>

          </div>


          {
            loading ? <Button className="w-full my-4 "><Loader2 className="animate-spin" /> Please wait...</Button> :
              <Button type="submit" className="w-full my-4">Signup</Button>
          }
          <span className="text-sm">Already have an account? <Link to={"/login"} className="hover:underline font-semibold text-blue-700 ">Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Signup;