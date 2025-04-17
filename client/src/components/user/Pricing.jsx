import React, { useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { pricing } from "@/utils/Data";

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

  // Auto slide every 3.5 seconds
  useEffect(() => {
    if (!instanceRef.current) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3500);  // Slide every 3.5 seconds

    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-lime-600 bg-clip-text text-transparent">
          Pricing Plans
        </h2>
        <p className="text-slate-600 mt-2 text-base">Transparent & affordable rates.</p>
      </div>

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
    </section>
  );
};

export default Pricing;
