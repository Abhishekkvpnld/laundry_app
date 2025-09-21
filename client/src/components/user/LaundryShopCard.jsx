import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const LaundryShopCard = ({ shop }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/details/${1}`)}
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
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
            Laundry
          </span>
        </div>

        <p className="text-sm text-slate-600">{shop?.address}</p>
        <p className="text-sm text-slate-500">📞 {shop?.phone}</p>
        <p className="text-sm text-slate-500">👤 {shop?.ownerName}</p>

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
