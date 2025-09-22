import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// 🔹 Helper function to format HH:mm into AM/PM
const formatTime = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12; // 0 -> 12
  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

// 🔹 Helper to check if shop is open
const isShopOpen = (openingTime, closingTime) => {
  if (!openingTime || !closingTime) return false;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [openH, openM] = openingTime.split(":").map(Number);
  const [closeH, closeM] = closingTime.split(":").map(Number);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
};

const LaundryShopCard = ({ shop }) => {
  const navigate = useNavigate();

  const open = isShopOpen(shop?.openingTime, shop?.closingTime);

  return (
    <Card
      onClick={() => navigate(`/details/${shop?._id}`)}
      className="group cursor-pointer flex flex-col md:flex-row items-center gap-5 p-5 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Shop Image */}
      <div className="w-full flex flex-col md:w-[150px] h-[120px] overflow-hidden rounded-lg bg-slate-100">
        <img
          src={shop?.image || "/shop_img.jpg"}
          alt={shop?.shopName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Shop Details */}
      <CardContent className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-slate-800">
            {shop?.shopName}
          </h4>

          {/* ✅ Open / Closed Badge */}
          <span
            className={`${
              open
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            } text-xs px-2 py-1 rounded-full font-medium`}
          >
            {open ? "Open Now" : "Closed"}
          </span>
        </div>

        <p className="text-sm text-slate-600">{shop?.address}</p>
        <p className="text-sm text-slate-500">📞 {shop?.phone}</p>
        <p className="text-sm text-slate-500">👤 {shop?.ownerName}</p>

        {/* Opening & Closing Times */}
        {shop?.openingTime && shop?.closingTime && (
          <p className="text-sm text-slate-500">
            🕒 {formatTime(shop.openingTime)} – {formatTime(shop.closingTime)}
          </p>
        )}

        {/* Services */}
        <div className="flex flex-wrap gap-2 pt-2">
          {shop?.services?.map((service, index) => (
            <span
              key={index}
              className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full"
            >
              {service?.name || "Service"}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LaundryShopCard;
