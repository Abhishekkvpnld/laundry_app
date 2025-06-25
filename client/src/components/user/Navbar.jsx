import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { setAuthUser } from "@/redux/authSlice";



const Navbar = () => {

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setAuthUser(null));
                navigate("/");
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="flex items-center justify-between px-10 py-1">
            <div>
                <Link to={"/"}>
                    <h1 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-violet-400 to-red-400 bg-clip-text text-transparent cursor-pointer transition duration-300 hover:scale-105">
                        Bubble
                        <span className="bg-gradient-to-r from-violet-400 to-red-400 bg-clip-text text-transparent font-bold">
                            Drop
                        </span>
                    </h1>


                </Link>
            </div>

            <div className="flex items-center gap-11">
                <ul className="flex items-center text-sm gap-5 font-medium">

                    {
                        user && user.role === "user" && (
                            <>
                                <Link to={"/services"}> <li className="hover:underline cursor-pointer">Services</li></Link>
                                <Link to={"/bookings"}> <li className="hover:underline cursor-pointer">Bookings</li></Link>
                            </>
                        )
                    }

                      {
                        user && user.role === "admin" && (
                            <>
                                <Link to={"/manage-laundry"}> <li className="hover:underline cursor-pointer">Manage Laundry</li></Link>
                                <Link to={"/bookings"}> <li className="hover:underline cursor-pointer">Bookings</li></Link>
                            </>
                        )
                    }

                </ul>

                {
                    !user ? (
                        <div className="flex items-center justify-center gap-2">
                            <Link to={"/login"}> <Button className={"text-sm hidden md:block text-orange-600"} variant="outline">Login</Button></Link>
                            <Link to={"/signup"}> <Button className={"text-sm"} var>Signup</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger>
                                <Avatar className="w-10 h-10 rounded-full border-2 hover:border-blue-300">
                                    <AvatarImage src={user?.profile?.profilePhoto || "/profile.png"} alt="avatar" className={"cursor-pointer hover:scale-110 transition"} />
                                </Avatar>
                            </PopoverTrigger>

                            <PopoverContent className="w-72">
                                <div className="flex items-center gap-1">
                                    <Avatar className="w-7 h-7 rounded-full">
                                        <AvatarImage src={user?.profile?.profilePhoto || "/profile.png"} alt="avatar" />
                                    </Avatar>
                                    <div>
                                        <h1 className="text-sm font-medium">{user?.fullname}</h1>
                                        <p className="text-xs text-slate-500 text-muted-foreground">{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 justify-between">

                                    {
                                        user && user.role === "user" && (
                                            <div className="flex items-center gap-1">
                                                {/* <User2 size={18} className="text-slate-600" /> */}
                                                <Button className="mt-2" variant="outline"><Link to={"/profile"}>
                                                    View Profile</Link>
                                                </Button>
                                            </div>
                                        )
                                    }


                                    <div className="flex items-center gap-2">
                                        {/* <LogOut size={18} className="text-slate-600" /> */}
                                        <Button onClick={logoutHandler} className="mt-2 cursor-pointer hover:transition hover:scale-105" variant="destructive">
                                            <LogOut size={18} className="text-white" /> Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )
                }


            </div>
        </div>
    )
}

export default Navbar;