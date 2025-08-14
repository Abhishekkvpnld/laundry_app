import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogout } from "@/hooks/useLogout";
import { useSelector } from "react-redux";



const Navbar = () => {

    const { user } = useSelector(auth => auth.auth);

    console.log(user)

    const navigate = useNavigate();
    const { mutate: logout } = useLogout();

    const logoutHandler = () => {
        logout(undefined, {
            onSuccess: () => {
                toast.success("Logged out successfully");
                navigate("/login");
            },
            onError: (error) => {
                console.error(error);
                toast.error(error.response?.data?.message || "Logout failed");
            },
        });
    };

    return (
        <div className="flex items-center justify-between px-10 py-3 bg-white">
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
                        user?.id && user?.role === "user" && (
                            <>
                                <Link to={"/services"}> <li className="hover:underline cursor-pointer">Services</li></Link>
                                <Link to={"/bookings"}> <li className="hover:underline cursor-pointer">Bookings</li></Link>
                            </>
                        )
                    }

                    {
                        user?.id && user?.role === "shop" && (
                            <>
                                <Link to={"/manage-laundry"}> <li className="hover:underline cursor-pointer">Manage Laundry</li></Link>
                                <Link to={"/bookings"}> <li className="hover:underline cursor-pointer">Bookings</li></Link>
                            </>
                        )
                    }

                </ul>

                {
                    !user?.id ? (
                        <div className="flex items-center justify-center gap-2">
                            <Link to={"/login"}> <Button className={"text-sm cursor-pointer hidden md:block text-orange-600 hover:text-white hover:bg-red-600"} variant="outline">Login</Button></Link>
                            <Link to={"/signup"}> <Button className={"text-sm cursor-pointer hover:bg-blue-600 hover:text-white"} >Signup</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger>
                                <Avatar className="w-10 h-10 rounded-full border-2 hover:border-blue-300">
                                    <AvatarImage src={user?.profilePhoto || "/profile.png"} alt="avatar" className={"cursor-pointer hover:scale-110 transition"} />
                                </Avatar>
                            </PopoverTrigger>

                            <PopoverContent className="w-72">
                                <div className="flex items-center gap-1">
                                    <Avatar className="w-7 h-7 rounded-full">
                                        <AvatarImage src={user?.profile?.profilePhoto || "/profile.png"} alt="avatar" />
                                    </Avatar>
                                    <div className="ml-2">
                                        <h1 className="text-sm font-medium">{user?.username}</h1>
                                        <p className="text-xs text-slate-500 text-muted-foreground">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 justify-between">

                                    {
                                        user?.id && user?.role === "user" && (
                                            <div className="flex items-center gap-1">
                                                {/* <User2 size={18} className="text-slate-600" /> */}
                                                <Button className="mt-2" variant="outline"><Link to={"/"}>
                                                    View Profile</Link>
                                                </Button>
                                            </div>
                                        )
                                    }


                                    <div className="flex items-center gap-2">
                                        <LogOut size={18} className="text-slate-600" />
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