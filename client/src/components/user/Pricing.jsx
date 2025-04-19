import React, { useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { pricing } from "@/utils/Data";

const features = [
  {
    title: "Free Pickup & Delivery",
    desc: "We pick up and deliver at no extra cost.",
  },
  {
    title: "Eco-Friendly Washing",
    desc: "We use sustainable detergents and practices.",
  },
  {
    title: "Express Service",
    desc: "Get your laundry done within 24 hours.",
  },
  {
    title: "Affordable & Transparent",
    desc: "No hidden fees, just clear pricing.",
  },
];

const Pricing = () => {
  const timerRef = useRef(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 16 },
      },
    },
  });

  useEffect(() => {
    if (!instanceRef.current) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3500);

    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      {/* Pricing Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-lime-600 bg-clip-text text-transparent">
          Pricing Plans
        </h2>
        <p className="text-slate-600 mt-2 text-base">Transparent & affordable rates <span className="underline text-red-700">Starts from</span>,</p>
      </div>

      {/* Pricing Slider */}
      <div ref={sliderRef} className="keen-slider">
        {pricing.map((item, index) => (
          <div
            key={index}
            className="keen-slider__slide bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all text-center"
          >
            <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
            <p className="text-2xl font-bold text-gray-600 my-2">{item.price}</p>
            <p className="text-sm text-gray-500 mb-4">{item.details}</p>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 text-sm">
              Get Service
            </button>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <h3 className="text-center text-3xl font-semibold text-slate-800 mb-8">
          Why Choose Us?
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className="bg-white shadow-sm border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all text-center"
            >
              <h4 className="text-lg font-semibold text-orange-600">{feat.title}</h4>
              <p className="text-sm text-slate-600 mt-2">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
