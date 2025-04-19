import {
    Shirt,
    SprayCan,
    Truck,
    Clock,
    Footprints,
    WashingMachine,
    Sparkles,
    Leaf,

} from "lucide-react";



export const services = [
    {
        icon: WashingMachine,
        title: "Wash & Fold",
        desc: "Get your clothes cleaned and neatly folded. Perfect for everyday laundry.",
    },
    {
        icon: SprayCan,
        title: "Dry Cleaning",
        desc: "Premium dry cleaning for delicate fabrics and garments that need special care.",
    },
    {
        icon: Shirt,
        title: "Ironing Service",
        desc: "Professionally pressed clothes, wrinkle-free and ready to wear.",
    },
    {
        icon: Footprints,
        title: "Shoe Cleaning",
        desc: "Make your shoes look brand new with our expert cleaning services.",
    },
    {
        icon: Truck,
        title: "Pickup & Delivery",
        desc: "Convenient door-to-door pickup and delivery of your laundry.",
    },
    {
        icon: Clock,
        title: "Express Service",
        desc: "Need clean clothes fast? Use our express 24-hour service.",
    },
];


export const serviceData = [
    {
        title: "Premium Wash",
        description: "High-quality wash with eco-friendly detergents.",
        icon: <Sparkles size={28} className="text-emerald-600" />,
    },
    {
        title: "Dry Cleaning",
        description: "Professional dry cleaning for your delicate clothes.",
        icon: <Shirt size={28} className="text-orange-500" />,
    },
    {
        title: "Eco-Wash",
        description: "Sustainable cleaning with water-saving technology.",
        icon: <Leaf size={28} className="text-green-500" />,
    },
    {
        title: "Free Pickup & Delivery",
        description: "Doorstep pickup and delivery service at your convenience.",
        icon: <Truck size={28} className="text-blue-500" />,
    },
];

export const pricing = [
    {
        icon: WashingMachine,
        title: "Wash & Fold",
        price: "₹149",
        details: "Everyday laundry – up to 5kg.",
      },
      {
        icon: SprayCan,
        title: "Dry Cleaning",
        price: "₹99/item",
        details: "Ideal for delicate or formal wear.",
      },
      {
        icon: Shirt,
        title: "Ironing Service",
        price: "₹49/item",
        details: "Pressed and wrinkle-free garments.",
      },
      {
        icon: Footprints,
        title: "Shoe Cleaning",
        price: "₹199/pair",
        details: "Deep cleaning & polishing.",
      },
      {
        icon: Truck,
        title: "Pickup & Delivery",
        price: "Free",
        details: "Available for all service orders.",
      },
      {
        icon: Clock,
        title: "Express Service",
        price: "₹249",
        details: "Get your laundry in 24 hours.",
      },
  ];



  export const laundryShopsData = [
    {
      name: "Sparkle Clean Laundry",
      address: "12 MG Road, Kochi, Kerala",
      contact: "+91 98765 43210",
      openingHours: "Mon-Sat: 9AM - 8PM",
      services: ["Wash & Fold", "Dry Cleaning", "Ironing"],
      rating: 4.5,
    },
    {
      name: "FreshWave Laundry",
      address: "21 Beach Road, Calicut, Kerala",
      contact: "+91 99988 77665",
      openingHours: "All Days: 8AM - 9PM",
      services: ["Wash & Fold", "Shoe Cleaning", "Pickup & Delivery"],
      rating: 4.2,
    },
    {
      name: "Urban Wash Point",
      address: "5 Market Street, Trivandrum, Kerala",
      contact: "+91 99887 55443",
      openingHours: "Mon-Sun: 7AM - 10PM",
      services: ["Dry Cleaning", "Ironing", "Express Service"],
      rating: 4.8,
    },
    {
      name: "QuickSpin Laundry",
      address: "Near Bus Stand, Thrissur, Kerala",
      contact: "+91 98765 12345",
      openingHours: "Tue-Sun: 9AM - 7PM",
      services: ["Wash & Fold", "Pickup & Delivery"],
      rating: 4.3,
    },
    {
      name: "Neat & Clean Hub",
      address: "88 Residency Lane, Kannur, Kerala",
      contact: "+91 91234 56789",
      openingHours: "Mon-Sat: 10AM - 6PM",
      services: ["Ironing", "Dry Cleaning"],
      rating: 4.0,
    },
  ];
  