import { Shirt, Truck, Sparkles, Waves } from "lucide-react";

const CustomServiceFilter = ({ serviceFilter, setServiceFilter }) => {
  return (
    <div className="relative w-full md:w-[220px]">
      <select
        value={serviceFilter}
        onChange={(e) => setServiceFilter(e.target.value)}
        className="w-full appearance-none px-4 py-2 pr-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition bg-white text-gray-700"
      >
        <option value="">All Services</option>
        <option value="Dry Cleaning">👕 Dry Cleaning</option>
        <option value="Ironing">✨ Ironing</option>
        <option value="Pickup & Delivery">🚚 Pickup & Delivery</option>
        <option value="Wash & Fold">🌊 Wash & Fold</option>
      </select>

      {/* Dropdown arrow icon */}
      <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        ▼
      </div>
    </div>
  );
};

export default CustomServiceFilter;
