import { useState } from "react";
import { Shirt, Truck, Waves } from "lucide-react";
import { LuWashingMachine } from "react-icons/lu";
import { TbIroning3 } from "react-icons/tb";


const CustomServiceFilter = ({ serviceFilter, setServiceFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const services = [
    { value: "", label: "All Services", icon: <LuWashingMachine size={16} /> },
    { value: "Dry Cleaning", label: "Dry Cleaning", icon: <Shirt size={16} /> },
    { value: "Ironing", label: "Ironing", icon: <TbIroning3 size={16} /> },
    { value: "Pickup & Delivery", label: "Pickup & Delivery", icon: <Truck size={16} /> },
    { value: "Wash & Fold", label: "Wash & Fold", icon: <Waves size={16} /> },
  ];

  const selected = services.find((s) => s.value === serviceFilter) || services[0];

  return (
    <div className="relative w-full md:w-[240px]">
      {/* Button to open dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 rounded-xl border border-gray-200 shadow-sm 
                   bg-white text-gray-700 font-medium hover:border-red-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <span className="flex items-center gap-2">
          {selected.icon} {selected.label}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg">
          {services.map((service, idx) => (
            <div
              key={idx}
              onClick={() => {
                setServiceFilter(service.value);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-violet-50 cursor-pointer transition"
            >
              {service.icon} {service.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomServiceFilter;
