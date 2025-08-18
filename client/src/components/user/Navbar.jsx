import { LogOut } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link} from "react-router-dom";
import { useLogout } from "@/hooks/useLogout";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth); // access user from redux
  const { mutate: logout, isPending: isLoading } = useLogout();

  const logoutHandler = () => {
    if (!user) return;
    logout();
  };

  return (
    <div className="flex items-center justify-between px-10 py-3 bg-white">
      {/* Logo */}
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

      {/* Menu */}
      <div className="flex items-center gap-11">
        <ul className="flex items-center text-sm gap-5 font-medium">
          {user?._id && user?.role === "user" && (
            <>
              <Link to={"/services"}>
                <li className="hover:underline cursor-pointer">Services</li>
              </Link>
              <Link to={"/bookings"}>
                <li className="hover:underline cursor-pointer">Bookings</li>
              </Link>
            </>
          )}

          {user?._id && user?.role === "shop" && (
            <>
              <Link to={"/manage-laundry"}>
                <li className="hover:underline cursor-pointer">Manage Laundry</li>
              </Link>
              <Link to={"/bookings"}>
                <li className="hover:underline cursor-pointer">Bookings</li>
              </Link>
            </>
          )}
        </ul>

        {/* Auth Buttons */}
        {!user?._id ? (
          <div className="flex items-center justify-center gap-2">
            <Link to={"/login"}>
              <Button
                className="text-sm cursor-pointer hidden md:block text-orange-600 hover:text-white hover:bg-red-600"
                variant="outline"
              >
                Login
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button className="text-sm cursor-pointer hover:bg-blue-600 hover:text-white">
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger aria-label="User menu">
              <Avatar className="w-10 h-10 rounded-full border-2 hover:border-blue-300">
                <AvatarImage
                  src={user?.profilePhoto || "/profile.png"}
                  alt={`${user?.username || "User"} avatar`}
                  className="cursor-pointer hover:scale-110 transition"
                />
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="w-72">
              {/* User Info */}
              <div className="flex items-center gap-1">
                <Avatar className="w-7 h-7 rounded-full">
                  <AvatarImage
                    src={user?.profilePhoto || "/profile.png"}
                    alt="avatar"
                  />
                </Avatar>
                <div className="ml-2">
                  <h1 className="text-sm font-medium">{user?.username}</h1>
                  <p className="text-xs text-slate-500 text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 justify-between mt-3">
                {user?.role === "user" && (
                  <Button className="text-sm" variant="outline">
                    <Link to={"/"}>View Profile</Link>
                  </Button>
                )}

                <Button
                  onClick={logoutHandler}
                  disabled={isLoading}
                  className="cursor-pointer hover:scale-105 flex items-center gap-2"
                  variant="destructive"
                >
                  <LogOut size={18} />
                  {isLoading ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
